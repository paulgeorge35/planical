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
        "flex aspect-square h-8 items-center justify-center overflow-hidden rounded-[100%] bg-transparent align-middle",
        onClick &&
          "cursor-pointer transition-all duration-300 ease-in-out hover:bg-red-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:p-1",
        className
      )}
    >
      <Image
        alt="Avatar Image"
        className={cn("h-full w-full rounded-[100%] object-cover")}
        src={avatarUrl ? avatarUrl : defaultAvatar}
        width={100}
        height={100}
      />
    </RadixAvatar.Root>
  )
}

export default Avatar
