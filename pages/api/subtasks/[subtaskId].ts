import {
  createSubtask,
  deleteSubtask,
  updateSubtask,
} from "./../../../lib/prisma/task"
import { PickAndFlatten } from "types"
import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { NextkitError } from "nextkit"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { Subtask } from "@prisma/client"

const postBodySchema = z.object({
  title: z.string(),
  done: z.boolean().default(false),
  taskId: z.number(),
  index: z.number().optional().default(0),
})
const patchBodySchema = z.object({
  id: z.number(),
  title: z.string(),
  done: z.boolean().default(false),
  taskId: z.number(),
  index: z.number().optional().default(0),
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

  if (req.method === "POST") {
    try {
      const data = postBodySchema.parse(req.body) as PickAndFlatten<
        Omit<Subtask, "id" | "createdAt" | "updatedAt">
      >
      const { subtask, error } = await createSubtask(data, session.user.id)
      console.log(error)
      if (error) throw new NextkitError(400, JSON.stringify(error))
      return res.status(200).json({ subtask })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }
      return res.status(500).json({ error })
    }
  }

  if (req.method === "PATCH") {
    try {
      const data = patchBodySchema.parse(req.body) as Subtask
      const { subtask, error } = await updateSubtask(data, session.user.id)
      if (error) throw new NextkitError(400, JSON.stringify(error))
      return res.status(200).json({ subtask })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }
      return res.status(500).json({ error })
    }
  }

  if (req.method === "DELETE") {
    try {
      const subtaskId = deleteParamsSchema.parse(req.query.id)
      const { id, taskId, error } = await deleteSubtask(
        subtaskId,
        session.user.id
      )
      if (error) throw new NextkitError(400, JSON.stringify(error))
      return res.status(200).json({ id, taskId })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }
      return res.status(500).json({ error })
    }
  }

  res.setHeader("Allow", ["POST", "PATCH", "DELETE"])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
