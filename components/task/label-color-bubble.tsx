import { cn } from "@/lib/utils"

const LabelColorBubble = ({ color }: { color: string }) => {
  return (
    <div
      className={cn("rounded-full w-2 h-2")}
      style={{ backgroundColor: color }}
    />
  )
}

export default LabelColorBubble
