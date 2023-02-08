import {
  deleteTask,
  getTaskById,
  updateTask,
  createTask,
} from "@/lib/prisma/task"
import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { NextkitError } from "nextkit"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

const getParamsSchema = z.number()
const postBodySchema = z.object({
  title: z.string(),
  notes: z.string().nullable(),
  recurrent: z.boolean(),
  done: z.boolean(),
  dump: z.boolean(),
  date: z.date().nullable(),
  archived: z.boolean(),
  estimate: z.number().nullable(),
  actual: z.number().nullable(),
  labelId: z.number().nullable(),
})
const patchBodySchema = z.object({
  id: z.number(),
  title: z.string(),
  notes: z.string().nullable(),
  recurrent: z.boolean(),
  done: z.boolean(),
  dump: z.boolean(),
  date: z.date().nullable(),
  archived: z.boolean(),
  estimate: z.number().nullable(),
  actual: z.number().nullable(),
  labelId: z.number().nullable(),
  userId: z.string(),
})
const deleteParamsSchema = z.number()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  })
  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession()

  if (!session) {
    return res.status(403).end()
  }

  if (req.method === "GET") {
    try {
      const taskId = getParamsSchema.parse(req.query.id)
      const { task, error } = await getTaskById(taskId)
      if (error) throw new NextkitError(400, JSON.stringify(error))
      return res.status(200).json({ task })
    } catch (error) {
      throw new NextkitError(500, JSON.stringify(error))
    }
  }

  if (req.method === "POST") {
    try {
      const data = postBodySchema.parse(req.body)
      const { task, error } = await createTask({
        ...data,
        userId: session.user.id,
      })
      if (error) throw new NextkitError(400, JSON.stringify(error))
      return res.status(200).json({ task })
    } catch (error) {
      throw new NextkitError(500, JSON.stringify(error))
    }
  }

  if (req.method === "PATCH") {
    try {
      const data = patchBodySchema.parse(req.body)
      const { task, error } = await updateTask(data, session.user.id)
      if (error) throw new NextkitError(400, JSON.stringify(error))
      return res.status(200).json({ task })
    } catch (error) {
      throw new NextkitError(500, JSON.stringify(error))
    }
  }

  if (req.method === "DELETE") {
    try {
      const taskId = deleteParamsSchema.parse(req.query.id)
      const { id, error } = await deleteTask(taskId, session.user.id)
      if (error) throw new NextkitError(400, JSON.stringify(error))
      return res.status(200).json({ id })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }
      return res.status(500).json({ error })
    }
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE"])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
