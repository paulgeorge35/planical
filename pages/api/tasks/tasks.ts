import { getTasksByUserId } from "@/lib/prisma/task"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import type { NextApiRequest, NextApiResponse } from "next"
import { NextkitError } from "nextkit"
import { z } from "zod"

const getParamsSchema = z.object({
  archived: z.boolean().optional().default(false),
  onlyUndone: z.boolean().optional().default(false),
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
      const { archived, onlyUndone } = getParamsSchema.parse(req.query)
      const { tasks, error } = await getTasksByUserId(
        session.user.id,
        archived,
        onlyUndone
      )
      if (error) throw new NextkitError(400, JSON.stringify(error))
      return res.status(200).json({ tasks })
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
