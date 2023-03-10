import { deleteUser, getUserById, updateUser } from "@/lib/prisma/user"
import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { NextkitError } from "nextkit"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

const postBodySchema = z.object({
  email: z.string().email(),
  username: z.string().nullable(),
  full_name: z.string().nullable(),
  avatar_url: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

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
      const { user, error } = await getUserById(session.user.id)
      if (error) throw new NextkitError(400, JSON.stringify(error))
      return res.status(200).json({ user })
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
      const { user, error } = await updateUser(session.user.id, data)
      if (error) throw new NextkitError(400, JSON.stringify(error))
      return res.status(200).json({ user })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }
      return res.status(500).json({ error })
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id, error } = await deleteUser(session.user.id)
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
