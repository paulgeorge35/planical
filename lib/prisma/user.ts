import { User } from "@prisma/client"
import { prisma } from "../db"

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return { user }
  } catch (error) {
    return { error }
  }
}

export const createUser = async (user: Omit<User, "id">) => {
  try {
    const userCreated = await prisma.user.create({
      data: user,
    })
    return {
      user: userCreated,
    }
  } catch (error) {
    return { error }
  }
}
