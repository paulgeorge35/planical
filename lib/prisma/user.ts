import { Profile, UserSettings } from "@prisma/client"
import { PickAndFlatten } from "types"
import { prisma } from "../db"

export const getAllUsers = async () => {
  try {
    const users = await prisma.profile.findMany()
    return { users }
  } catch (error) {
    return { error }
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.profile.findUnique({
      where: {
        id,
      },
      include: {
        settings: true,
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

export const updateSettings = async (
  authId: string,
  settings: PickAndFlatten<Omit<Partial<UserSettings>, "id" | "userId">>
) => {
  try {
    await prisma.userSettings.upsert({
      create: {
        user: {
          connect: {
            id: authId,
          },
        },
        ...settings,
      },
      update: {
        ...settings,
      },
      where: {
        userId: authId,
      },
    })
    return { settings }
  } catch (error) {
    return { error }
  }
}
