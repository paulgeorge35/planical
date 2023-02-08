import { Profile } from "@prisma/client"
import { PickAndFlatten } from "types"
import { prisma } from "../db"

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.profile.findUnique({
      where: {
        id,
      },
    })
    return { user }
  } catch (error) {
    return { error }
  }
}

export const updateUser = async (
  id: string,
  user: PickAndFlatten<Omit<Profile, "id" | "createdAt" | "updatedAt">>
) => {
  try {
    const userUpdated = await prisma.profile.update({
      where: {
        id,
      },
      data: user,
    })
    return {
      user: userUpdated,
    }
  } catch (error) {
    return { error }
  }
}

export const deleteUser = async (id: string) => {
  try {
    await prisma.profile.delete({
      where: {
        id,
      },
    })
    return {
      id,
    }
  } catch (error) {
    return { error }
  }
}
