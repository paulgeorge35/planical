import { cn } from "@/lib/utils"
import * as RadixAvatar from "@radix-ui/react-avatar"

const Avatar = () => {
  return (
    <RadixAvatar.Root
      className={cn(
        "flex items-center justify-center align-middle overflow-hidden w-8 h-8 rounded-[100%] bg-red-500 bg-gradient-to-r from-purple-500 to-pink-500"
      )}
    >
      <RadixAvatar.Image
        className={cn("w-7 h-7 object-cover rounded-[100%]")}
        src="https://i.pravatar.cc/300"
      />
      <RadixAvatar.Fallback className="AvatarFallback" delayMs={600}>
        CT
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}

export default Avatar
