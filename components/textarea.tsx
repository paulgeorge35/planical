import useResizeTextArea from "@/hooks/use-resize-textarea"
import { cn } from "@/lib/utils"
import { useRef, useState } from "react"

type TextAreaProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  id?: string
  placeholder?: string
  onFocus?: () => void
  onBlur?: () => void
  onMouseOver?: () => void
  onMouseOut?: () => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  className?: string
}

const TextArea = ({
  value,
  onChange,
  id,
  placeholder,
  className,
  ...props
}: TextAreaProps) => {
  const [textAreaValue, setTextAreaValue] = useState(value)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [inputRef, setInputRef] = useState<HTMLLabelElement | null>(null)

  useResizeTextArea(textAreaRef.current, textAreaValue)
  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value

    setTextAreaValue(val)
  }
  return (
    <>
      <label
        htmlFor={id}
        className="hidden"
        ref={(label) => setInputRef(label)}
      >
        Task name
      </label>
      <textarea
        rows={1}
        ref={textAreaRef}
        className={cn(
          "resize-none overflow-y-hidden break-words outline-none",
          className
        )}
        id={id}
        name={id}
        value={value}
        onChange={(e) => {
          handleChange(e)
          onChange(e)
        }}
        onClick={() => inputRef?.click()}
        placeholder={placeholder}
        {...props}
      />
    </>
  )
}

export default TextArea
