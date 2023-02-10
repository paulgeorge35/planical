import { Column } from "@prisma/client"
import { PickAndFlatten } from "types"
import { prisma } from "../db"

export const getColumnsByUserId = async (authId: string) => {
  try {
    const columns = await prisma.column.findMany({
      where: {
        userId: authId,
      },
    })
    return { columns }
  } catch (error) {
    return { error }
  }
}

export const createColumn = async (
  data: PickAndFlatten<Omit<Column, "id">>
) => {
  try {
    const column = await prisma.column.create({
      data,
    })
    return { column }
  } catch (error) {
    return { error }
  }
}

export const updateColumn = async (data: Column) => {
  try {
    const column = await prisma.column.update({
      where: {
        id: data.id,
      },
      data,
    })
    return { column }
  } catch (error) {
    return { error }
  }
}
