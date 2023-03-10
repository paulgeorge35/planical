import { getAllUsers } from "@/lib/prisma/user"
import type { NextApiRequest, NextApiResponse } from "next"
import { NextkitError } from "nextkit"
import { z } from "zod"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { users, error } = await getAllUsers()
      if (error) throw new NextkitError(400, JSON.stringify(error))
      return res.status(200).json({ users })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }
      return res.status(500).json({ error })
    }
  }

  res.setHeader("Allow", ["GET"])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
