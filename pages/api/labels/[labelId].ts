import {
  createLabel,
  updateLabel,
  deleteLabel,
  getLabelById,
} from "@/lib/prisma/task"
import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { NextkitError } from "nextkit"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

const getParamsSchema = z.number()
const postBodySchema = z.object({
  name: z.string(),
  color: z.string(),
})
const patchBodySchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
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
      const labelId = getParamsSchema.parse(req.query.id)
      const { label, error } = await getLabelById(labelId)
      if (error) throw new NextkitError(400, JSON.stringify(error))
      return res.status(200).json({ label })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }
      return res.status(500).json({ error })
    }
  }

  if (req.method === "POST") {
    try {
      const data = postBodySchema.parse(req.body)
      const { label, error } = await createLabel({
        ...data,
        userId: session.user.id,
      })
      if (error) throw new NextkitError(400, JSON.stringify(error))

      return res.status(200).json({ label })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }
      return res.status(500).json({ error })
    }
  }

  if (req.method === "PATCH") {
    try {
      const data = patchBodySchema.parse(req.body)
      const { label, error } = await updateLabel(data, session.user.id)
      if (error) throw new NextkitError(400, JSON.stringify(error))
      return res.status(200).json({ label })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }
      return res.status(500).json({ error })
    }
  }

  if (req.method === "DELETE") {
    try {
      const labelId = deleteParamsSchema.parse(parseInt(req.query.id as string))
      const { id, error } = await deleteLabel(labelId, session.user.id)
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
