import { Label, Recurrence, Subtask, Task } from "@prisma/client"
import { NextkitError } from "nextkit"
import { PickAndFlatten } from "types"
import { prisma } from "../db"

/* -------------------------------------------------------------------------- */
/*                                    Task                                    */
/* -------------------------------------------------------------------------- */

export const getTaskById = async (id: number) => {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
      include: {
        label: true,
        subtasks: true,
        recurrences: true,
      },
    })
    return { task }
  } catch (error) {
    return { error }
  }
}

export const getTasksByUserId = async (
  authId: string,
  archived: boolean = false,
  onlyUndone: boolean = false
) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: authId,
        archived,
        ...(onlyUndone && { done: false }),
      },
      include: {
        label: true,
        subtasks: true,
        recurrences: true,
      },
      orderBy: {
        date: "asc",
      },
    })
    return {
      tasks: tasks.sort((a, b) => a.index - b.index),
    }
  } catch (error) {
    return { error }
  }
}

export const createTask = async (
  task: Omit<Task, "id" | "createdAt" | "updatedAt">
) => {
  try {
    const existingColumn = await prisma.column.findFirst({
      where: {
        identity: task.dump ? "dump" : task.date.toISOString().split("T")[0],
      },
    })
    let taskIndex = !existingColumn
      ? 0
      : task.index === 0
      ? 0
      : existingColumn.index.length
    const taskCreated = await prisma.task.create({
      data: { ...task, index: taskIndex },
    })
    if (existingColumn) {
      let newIndexes = existingColumn.index.splice(taskIndex, 0, taskCreated.id)
      await prisma.column.update({
        where: {
          identity: task.dump ? "dump" : task.date.toISOString().split("T")[0],
        },
        data: {
          index: newIndexes,
        },
      })
    } else {
      await prisma.column.create({
        data: {
          identity: task.dump
            ? "dump"
            : new Date(task.date).toISOString().split("T")[0],
          index: [taskCreated.id],
          userId: task.userId,
        },
      })
    }
    return {
      task: taskCreated,
    }
  } catch (error) {
    return { error }
  }
}

export const updateTask = async (
  task: PickAndFlatten<Omit<Task, "createdAt" | "updatedAt">>,
  authId: string
) => {
  try {
    const taskToUpdate = await prisma.task.findUnique({
      where: {
        id: task.id,
      },
    })
    if (taskToUpdate?.userId !== authId)
      throw new NextkitError(405, "You can only update your own tasks.")

    // Update task
    const taskUpdated = await prisma.task.update({
      where: {
        id: task.id,
      },
      data: task,
    })
    console.log("Task Updated: ", JSON.stringify(taskUpdated, null, 2))

    // Find source column
    const sourceColumn = await prisma.column.findFirst({
      where: {
        identity: taskToUpdate?.dump
          ? "dump"
          : taskToUpdate?.date.toISOString().split("T")[0],
      },
    })
    console.log("Source column: ", JSON.stringify(sourceColumn, null, 2))

    // Update source column
    const sourceColumnUpdated = await prisma.column.update({
      where: {
        identity: taskToUpdate?.dump
          ? "dump"
          : taskToUpdate?.date.toISOString().split("T")[0],
      },
      data: {
        index: sourceColumn?.index.filter((index) => index !== task.id),
      },
    })
    console.log(
      "Source column updated: ",
      JSON.stringify(sourceColumnUpdated, null, 2)
    )

    // Find destination column
    const destinationColumn = await prisma.column.findFirst({
      where: {
        identity: task.dump ? "dump" : task.date.toISOString().split("T")[0],
      },
    })
    console.log(
      "Destination column: ",
      JSON.stringify(destinationColumn, null, 2)
    )

    // Update or Create destination column
    if (destinationColumn) {
      const destinationColumnUpdated = await prisma.column.update({
        where: {
          identity: taskUpdated.dump
            ? "dump"
            : taskUpdated.date.toISOString().split("T")[0],
        },
        data: {
          index: [
            ...destinationColumn.index.slice(0, task.index),
            task.id,
            ...destinationColumn.index.slice(task.index),
          ],
        },
      })
      console.log(
        "Destination column updated: ",
        JSON.stringify(destinationColumnUpdated, null, 2)
      )
    } else {
      const destinationColumnCreated = await prisma.column.create({
        data: {
          identity: task.dump
            ? "dump"
            : new Date(task.date).toISOString().split("T")[0],
          index: [taskUpdated.id],
          userId: task.userId,
        },
      })
      console.log(
        "Destination column created: ",
        JSON.stringify(destinationColumnCreated, null, 2)
      )
    }
    return {
      task: taskUpdated,
    }
  } catch (error) {
    return { error }
  }
}

export const deleteTask = async (id: number, authId: string) => {
  try {
    const taskToDelete = await prisma.task.findUnique({
      where: {
        id: id,
      },
    })
    const existingColumn = await prisma.column.findFirst({
      where: {
        identity: taskToDelete.dump
          ? "dump"
          : taskToDelete.date.toISOString().split("T")[0],
      },
    })
    if (existingColumn) {
      let newIndexes = existingColumn.index.filter((index) => index !== id)
      await prisma.column.update({
        where: {
          identity: taskToDelete.dump
            ? "dump"
            : taskToDelete.date.toISOString().split("T")[0],
        },
        data: {
          index: newIndexes,
        },
      })
    }
    if (taskToDelete?.userId !== authId)
      throw new NextkitError(405, "You can only delete your own tasks.")
    await prisma.task.delete({
      where: {
        id,
      },
    })
    return {
      id,
    }
  } catch (error) {
    return { error }
  }
}

/* -------------------------------------------------------------------------- */
/*                                    Label                                   */
/* -------------------------------------------------------------------------- */

export const getLabelById = async (id: number) => {
  try {
    const label = await prisma.label.findUnique({
      where: {
        id,
      },
    })
    return { label }
  } catch (error) {
    return { error }
  }
}

export const getLabelsByUserId = async (userId: string) => {
  try {
    const labels = await prisma.label.findMany({
      where: {
        userId,
      },
    })
    return { labels }
  } catch (error) {
    return { error }
  }
}

export const createLabel = async (
  label: PickAndFlatten<Omit<Label, "id" | "createdAt" | "updatedAt">>
) => {
  try {
    const labelCreated = await prisma.label.create({
      data: {
        ...label,
      },
    })
    return {
      label: labelCreated,
    }
  } catch (error) {
    return { error }
  }
}

export const updateLabel = async (
  label: PickAndFlatten<Omit<Label, "createdAt" | "updatedAt">>,
  authId: string
) => {
  try {
    const labelToUpdate = await prisma.label.findUnique({
      where: {
        id: label.id,
      },
    })
    if (labelToUpdate?.userId !== authId)
      throw new NextkitError(405, "You can only update your own labels.")
    const labelUpdated = await prisma.label.update({
      where: {
        id: label.id,
      },
      data: label,
    })
    return {
      label: labelUpdated,
    }
  } catch (error) {
    return { error }
  }
}

export const deleteLabel = async (id: number, authId: string) => {
  try {
    const labelToDelete = await prisma.label.findUnique({
      where: {
        id,
      },
    })
    if (labelToDelete?.userId !== authId)
      throw new NextkitError(405, "You can only delete your own labels.")
    await prisma.label.delete({
      where: {
        id,
      },
    })
    return {
      id,
    }
  } catch (error) {
    return { error }
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Subtask                                  */
/* -------------------------------------------------------------------------- */

export const getSubtaskById = async (id: number) => {
  try {
    return await prisma.subtask.findUnique({
      where: {
        id,
      },
    })
  } catch (error) {
    return { error }
  }
}

export const getSubtasksByTaskId = async (taskId: number) => {
  try {
    return await prisma.subtask.findMany({
      where: {
        taskId,
      },
    })
  } catch (error) {
    return { error }
  }
}

export const createSubtask = async (subtask: Omit<Subtask, "id">) => {
  try {
    const subtaskCreated = await prisma.subtask.create({
      data: subtask,
    })
    return {
      subtask: subtaskCreated,
    }
  } catch (error) {
    return { error }
  }
}

export const updateSubtask = async (subtask: Subtask) => {
  try {
    const subtaskUpdated = await prisma.subtask.update({
      where: {
        id: subtask.id,
      },
      data: subtask,
    })
    return {
      subtask: subtaskUpdated,
    }
  } catch (error) {
    return { error }
  }
}

export const deleteSubtask = async (id: number) => {
  try {
    await prisma.subtask.delete({
      where: {
        id,
      },
    })
    return {
      id,
    }
  } catch (error) {
    return { error }
  }
}

/* -------------------------------------------------------------------------- */
/*                                  Recurrence                                */
/* -------------------------------------------------------------------------- */

export const getRecurrenceById = async (id: number) => {
  try {
    return await prisma.recurrence.findUnique({
      where: {
        id,
      },
    })
  } catch (error) {
    return { error }
  }
}

export const getRecurrencesByTaskId = async (taskId: number) => {
  try {
    return await prisma.recurrence.findMany({
      where: {
        taskId,
      },
    })
  } catch (error) {
    return { error }
  }
}

export const createRecurrence = async (recurrence: Omit<Recurrence, "id">) => {
  try {
    const recurrenceCreated = await prisma.recurrence.create({
      data: recurrence,
    })
    return {
      recurrence: recurrenceCreated,
    }
  } catch (error) {
    return { error }
  }
}

export const updateRecurrence = async (recurrence: Recurrence) => {
  try {
    const recurrenceUpdated = await prisma.recurrence.update({
      where: {
        id: recurrence.id,
      },
      data: recurrence,
    })
    return {
      recurrence: recurrenceUpdated,
    }
  } catch (error) {
    return { error }
  }
}

export const deleteRecurrence = async (id: number) => {
  try {
    await prisma.recurrence.delete({
      where: {
        id,
      },
    })
    return {
      id,
    }
  } catch (error) {
    return { error }
  }
}
