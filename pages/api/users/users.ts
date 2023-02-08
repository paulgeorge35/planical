import { deleteUser, getUserById, updateUser } from "@/lib/prisma/user"
import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { NextkitError } from "nextkit"

const getParamsSchema = z.string()
const postBodySchema = z.object({
  email: z.string().email(),
  username: z.string().nullable(),
  full_name: z.string().nullable(),
  avatar_url: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
const postParamsSchema = z.string()
const deleteParamsSchema = z.string()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const id = getParamsSchema.parse(req.query.id)
      const { user, error } = await getUserById(id)
      if (error) throw new NextkitError(400, JSON.stringify(error))
      return res.status(200).json({ user })
    } catch (error) {
      throw new NextkitError(500, JSON.stringify(error))
    }
  }

  if (req.method === "POST") {
    try {
      const data = postBodySchema.parse(req.body)
      const id = postParamsSchema.parse(req.query.id)
      const { user, error } = await updateUser(id, data)
      if (error) throw new NextkitError(400, JSON.stringify(error))
      return res.status(200).json({ user })
    } catch (error) {
      throw new NextkitError(500, JSON.stringify(error))
    }
  }

  if (req.method === "DELETE") {
    try {
      const data = deleteParamsSchema.parse(req.query.id)
      const { id, error } = await deleteUser(data)
      if (error) throw new NextkitError(400, JSON.stringify(error))
      return res.status(200).json({ id })
    } catch (error) {
      throw new NextkitError(500, JSON.stringify(error))
    }
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE"])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
