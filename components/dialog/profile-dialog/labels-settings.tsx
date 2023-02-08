import Button from "@/components/button"
import LabelColorBubble from "@/components/task/label-color-bubble"
import { cn } from "@/lib/utils"
import {
  MagnifyingGlassIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons"
import { useCallback, useEffect, useState } from "react"
import { LabelNoIDType, LabelType } from "types"
import { GithubPicker } from "react-color"
import { useTheme } from "next-themes"

interface LabelProps extends LabelNoIDType {
  id?: string
  disabled: boolean
  editing: boolean
  editedLabel?: LabelType
  toggleEdit: () => void
  onLabelChange: (value: string) => void
  onLabelColorChange: (value: string) => void
  onLabelDelete?: () => void
}

const Label = ({
  name,
  color,
  disabled,
  editing,
  editedLabel,
  toggleEdit,
  onLabelChange,
  onLabelColorChange,
  onLabelDelete,
}: LabelProps) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  return (
    <div
      className={cn(
        "text-md flex w-full flex-row items-center justify-between rounded-lg border-[1px] px-4 py-2 font-satoshi font-medium",
        "text-neutral-900",
        "dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
      )}
    >
      <div
        className={cn("flex max-w-[50%] grow flex-row items-stretch space-x-2")}
      >
        <a
          className={cn(
            "relative flex items-center justify-center rounded-lg",
            editing && "cursor-pointer"
          )}
          onClick={() => editing && setShowColorPicker(!showColorPicker)}
        >
          <LabelColorBubble
            color={editing && editedLabel ? editedLabel.color : color}
            className={cn("h-4 w-4")}
            rootClassName={cn(
              editing &&
                "z-10 rounded-lg border-[1px] border-neutral-200 p-2 dark:border-neutral-700"
            )}
          />
          <span
            className={cn(
              "absolute bottom-full left-0 z-50 translate-y-[150%] bg-white transition-all duration-200 ease-in-out dark:bg-neutral-900",
              showColorPicker ? "flex" : "hidden"
            )}
          >
            <GithubPicker
              //TODO: - replace this color picker with a custom one
              className={cn("z-50 w-full shadow-md")}
              triangle={"hide"}
              color={editing && editedLabel ? editedLabel.color : color}
              onChangeComplete={(color) => onLabelColorChange(color.hex)}
              styles={{
                default: {
                  card: {
                    width: "212px",
                    display: "flex",
                    height: "min-content",
                  },
                },
              }}
            />
          </span>
        </a>
        <input
          type={"text"}
          className={cn(
            "flex grow items-center bg-transparent text-sm",
            "text-neutral-900",
            "dark:text-neutral-300",
            editing &&
              "rounded-lg border-[1px] border-neutral-200 p-2 py-1 dark:border-neutral-700"
          )}
          disabled={!editing}
          value={editing && editedLabel ? editedLabel.name : name}
          onChange={(e) => onLabelChange(e.target.value)}
          placeholder="Label name"
        />
      </div>
      {!editing ? (
        <div className={cn("flex flex-row items-center")}>
          <Button
            className={cn("mx-1 border-0 p-1", "", "dark:hover:bg-neutral-700")}
            icon={Pencil1Icon}
            disabled={disabled}
            onClick={toggleEdit}
          ></Button>
          <Button
            className={cn("mx-1 border-0 p-1", "", "dark:hover:bg-neutral-700")}
            disabled={disabled}
            icon={TrashIcon}
          ></Button>
        </div>
      ) : (
        <div className={cn("flex flex-row items-center")}>
          <Button
            className={cn(
              "py-2 text-xs",
              "border-neutral-200 text-neutral-600",
              "hover:border-purple-600 hover:bg-purple-50 hover:text-purple-600",
              "dark:border-neutral-700 dark:text-neutral-400",
              "dark:hover:border-purple-600 dark:hover:bg-transparent dark:hover:text-purple-600"
            )}
            onClick={toggleEdit}
          >
            Cancel
          </Button>
          <Button
            className={cn(
              "border-0 py-2 text-xs",
              "bg-purple-500 text-white",
              "dark:bg-purple-500 dark:text-white",
              "hover:bg-purple-600",
              "dark:hover:bg-purple-600"
            )}
            onClick={toggleEdit}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  )
}

type LabelsSettingsProps = {}

const LabelsSettings = ({}: LabelsSettingsProps) => {
  const labels = [
    {
      id: "1",
      name: "Label 1",
      color: "#fff000",
    },
    {
      id: "2",
      name: "Label 2",
      color: "#fff000",
    },
  ]
  const [search, setSearch] = useState<string>("")
  const [editing, setEditing] = useState<boolean[]>([])
  const [newLabel, setNewLabel] = useState<LabelNoIDType>()
  const [editedLabel, setEditedLabel] = useState<LabelType>()

  const toggleEdit = useCallback(
    (index: number, value: boolean, label: LabelType) => {
      if (!value) setEditedLabel(label)
      setEditing(
        [...Array.from({ length: labels.length }, () => false)].map((_, i) =>
          index === i ? !value : false
        )
      )
    },
    [labels]
  )

  const updateLabelNew = useCallback(
    (field: "color" | "name", value: string) => {
      if (typeof newLabel === "undefined") return
      setNewLabel({ ...newLabel, [field]: value })
    },
    [newLabel]
  )

  const updateLabel = useCallback(
    (field: "color" | "name", value: string) => {
      if (typeof editedLabel === "undefined") return
      setEditedLabel({ ...editedLabel, [field]: value })
    },
    [editedLabel]
  )

  useEffect(() => {
    setEditing(Array.from({ length: labels.length }, () => false))
  }, [labels.length])

  return (
    <div className="flex h-full grow flex-col ">
      <div
        className={cn(
          "w-full border-b-[1px] p-4",
          "border-neutral-300",
          "dark:border-neutral-700"
        )}
      >
        <h1 className={cn("font-sans font-medium")}>Labels</h1>
      </div>
      <div className={cn("flex w-full flex-col space-y-4 p-6 pb-0")}>
        {typeof newLabel === "undefined" ? (
          <span className={cn("flex items-center justify-between")}>
            <span
              className={cn(
                "text-md relative flex w-full max-w-[50%] flex-row items-center justify-between overflow-hidden rounded-lg border-[1px] p-2 pl-8 font-satoshi font-medium",
                "text-neutral-900",
                "dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              )}
            >
              <input
                className={cn(
                  "flex grow items-center bg-transparent text-sm",
                  "text-neutral-900",
                  "dark:text-neutral-300"
                )}
                placeholder={"Search labels"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <MagnifyingGlassIcon className={cn("absolute left-2")} />
            </span>
            <Button
              className={cn(
                "py-2 text-xs",
                "border-neutral-200 text-neutral-600",
                "hover:border-purple-600 hover:bg-purple-50 hover:text-purple-600",
                "dark:border-neutral-700 dark:text-neutral-400",
                "dark:hover:border-purple-600 dark:hover:bg-transparent dark:hover:text-purple-600"
              )}
              onClick={() => {
                setEditing([
                  ...Array.from({ length: labels.length }, () => false),
                  true,
                ])
                setNewLabel({
                  color: "#fff000",
                  name: "",
                })
              }}
            >
              Create Label
            </Button>
          </span>
        ) : (
          <Label
            editing={true}
            disabled={false}
            {...newLabel}
            toggleEdit={() => {
              setNewLabel(undefined)
              setEditing(
                [...Array.from({ length: labels.length }, () => false)].splice(
                  -1
                )
              )
            }}
            onLabelChange={(name) => updateLabelNew("name", name)}
            onLabelColorChange={(color) => updateLabelNew("color", color)}
          />
        )}
        {labels
          .filter((label) =>
            search
              .toLowerCase()
              .split(/[\s,.-_]+/)
              .some((word) => label.name.toLowerCase().includes(word))
          )
          .map((label, index) => (
            <Label
              key={index}
              {...label}
              editedLabel={editedLabel}
              editing={editing[index]}
              disabled={
                editing.reduce((acc, curr) => acc || curr, false) ||
                typeof newLabel !== "undefined"
              }
              toggleEdit={() => toggleEdit(index, editing[index], label)}
              onLabelChange={(name) => updateLabel("name", name)}
              onLabelColorChange={(color) => updateLabel("color", color)}
            />
          ))}
      </div>
    </div>
  )
}

export default LabelsSettings
