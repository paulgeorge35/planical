import { updateSettings } from "@/lib/prisma/user"
import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { NextkitError } from "nextkit"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

const patchBodySchema = z.object({
  theme: z.enum(["light", "dark", "system"]).optional(),
  USER_PREF_NEW_TASK_POSITION: z.enum(["TOP", "BOTTOM"]).optional(),
  USER_PREF_ROLL_OVER_TASKS: z.boolean().optional(),
  USER_PREF_ROLL_OVER_TASKS_POSITION: z.enum(["TOP", "BOTTOM"]).optional(),
  USER_PREF_MOVE_COMPLETED_TASKS_TO_THE_BOTTOM: z.boolean().optional(),
  USER_PREF_COMPLETE_TASKS_AUTO: z.boolean().optional(),
  USER_PREF_FIRST_DAY_OF_WEEK: z
    .number()
    .min(0, "Day out of range")
    .max(6, "Day out of range")
    .optional(),
  USER_PREF_SHOW_WEEKENDS: z.boolean().optional(),
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

  if (req.method === "PATCH") {
    try {
      const data = patchBodySchema.parse(req.body)
      const { settings, error } = await updateSettings(session.user.id, data)
      console.log(error)
      if (error) throw new NextkitError(400, JSON.stringify(error))
      return res.status(200).json({ settings })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }
      return res.status(500).json({ error })
    }
  }

  res.setHeader("Allow", ["PATCH"])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
