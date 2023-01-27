import { cn } from "@/lib/utils"
import * as RadixAvatar from "@radix-ui/react-avatar"
import Image from "next/image"
import defaultAvatar from "@/assets/images/default-avatar.webp"

type AvatarProps = {
  onClick?: () => void
}

const Avatar = ({ onClick }: AvatarProps) => {
  return (
    <RadixAvatar.Root
      onClick={onClick}
      className={cn(
        "group cursor-pointer flex items-center justify-center align-middle overflow-hidden w-8 h-8 rounded-[100%] bg-red-500 bg-gradient-to-r from-purple-500 to-pink-500"
      )}
    >
      {/* <RadixAvatar.Image
        className={cn(
          "w-8 h-8 object-cover rounded-[100%] transition-all duration-300 ease-in-out",
          "group-hover:h-6  group-hover:w-6"
        )}
        src="https://i.pravatar.cc/1"
      /> */}
      <Image
        alt="Avatar Image"
        className={cn(
          "w-8 h-8 object-cover rounded-[100%] transition-all duration-300 ease-in-out",
          "group-hover:h-6  group-hover:w-6"
        )}
        src={defaultAvatar}
      />
    </RadixAvatar.Root>
  )
}

export default Avatar
