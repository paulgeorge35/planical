import { cn } from "@/lib/utils"
import * as RadixAvatar from "@radix-ui/react-avatar"
import Image from "next/image"
import defaultAvatar from "@/assets/images/default-avatar.webp"

type AvatarProps = {
  className?: string
  onClick?: () => void
  avatarUrl?: string
}

const Avatar = ({ onClick, className, avatarUrl }: AvatarProps) => {
  return (
    <RadixAvatar.Root
      onClick={onClick}
      className={cn(
        "aspect-square bg-transparent flex items-center justify-center align-middle overflow-hidden h-8 rounded-[100%]",
        onClick &&
          "cursor-pointer hover:p-1 transition-all duration-300 ease-in-out hover:bg-red-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500",
        className
      )}
    >
      <Image
        alt="Avatar Image"
        className={cn("w-full h-full object-cover rounded-[100%]")}
        src={avatarUrl ? avatarUrl : defaultAvatar}
        width={100}
        height={100}
      />
    </RadixAvatar.Root>
  )
}

export default Avatar
