import { cn } from "@/lib/utils"
import * as RadixAvatar from "@radix-ui/react-avatar"
import Image from "next/image"
import defaultAvatar from "@/assets/images/default-avatar.webp"

type AvatarProps = {
  className?: string
  onClick?: () => void
}

const Avatar = ({ onClick, className }: AvatarProps) => {
  return (
    <RadixAvatar.Root
      onClick={onClick}
      className={cn(
        "aspect-square cursor-pointer flex items-center justify-center align-middle overflow-hidden h-8 rounded-[100%] bg-red-500 bg-gradient-to-r from-purple-500 to-pink-500 hover:p-1  transition-all duration-300 ease-in-out",
        className
      )}
    >
      <Image
        alt="Avatar Image"
        className={cn("w-full h-full object-cover rounded-[100%]")}
        src={defaultAvatar}
      />
    </RadixAvatar.Root>
  )
}

export default Avatar
