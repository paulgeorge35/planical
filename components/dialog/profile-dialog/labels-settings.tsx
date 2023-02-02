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
  const { theme } = useTheme()
  return (
    <div
      className={cn(
        "px-4 py-2 rounded-lg font-satoshi font-medium w-full text-md border-[1px] flex flex-row items-center justify-between",
        "text-neutral-900",
        "dark:bg-neutral-800 dark:text-white dark:border-neutral-700"
      )}
    >
      <div
        className={cn("flex flex-row items-stretch space-x-2 grow max-w-[50%]")}
      >
        <a
          className={cn(
            "rounded-lg flex items-center justify-center relative",
            editing && "cursor-pointer"
          )}
          onClick={() => editing && setShowColorPicker(!showColorPicker)}
        >
          <LabelColorBubble
            color={editing && editedLabel ? editedLabel.color : color}
            className={cn("w-4 h-4")}
            rootClassName={cn(
              editing &&
                "p-2 border-[1px] border-neutral dark:border-neutral-700 rounded-lg z-10"
            )}
          />
          <span
            className={cn(
              "absolute bottom-full left-0 translate-y-[150%] z-50 transition-all duration-200 ease-in-out bg-white dark:bg-neutral-900",
              showColorPicker ? "flex" : "hidden"
            )}
          >
            <GithubPicker
              //TODO: - replace this color picker with a custom one
              className={cn("z-50 shadow-md w-full")}
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
            "text-sm flex items-center grow bg-transparent",
            "text-neutral-900",
            "dark:text-neutral-300",
            editing &&
              "p-2 py-1 border-[1px] border-neutral dark:border-neutral-700 rounded-lg"
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
            className={cn("p-1 mx-1 border-0", "", "dark:hover:bg-neutral-700")}
            icon={Pencil1Icon}
            disabled={disabled}
            onClick={toggleEdit}
          ></Button>
          <Button
            className={cn("p-1 mx-1 border-0", "", "dark:hover:bg-neutral-700")}
            disabled={disabled}
            icon={TrashIcon}
          ></Button>
        </div>
      ) : (
        <div className={cn("flex flex-row items-center")}>
          <Button
            className={cn(
              "text-xs py-2",
              "border-neutral-200 text-neutral-600",
              "hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50",
              "dark:border-neutral-700 dark:text-neutral-400",
              "dark:hover:text-purple-600 dark:hover:border-purple-600 dark:hover:bg-transparent"
            )}
            onClick={toggleEdit}
          >
            Cancel
          </Button>
          <Button
            className={cn(
              "text-xs py-2 border-0",
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
  }, [])

  return (
    <div className="flex flex-col h-full grow ">
      <div
        className={cn(
          "p-4 w-full border-b-[1px]",
          "border-neutral-300",
          "dark:border-neutral-700"
        )}
      >
        <h1 className={cn("font-sans font-medium")}>Labels</h1>
      </div>
      <div className={cn("p-6 pb-0 w-full flex flex-col space-y-4")}>
        {typeof newLabel === "undefined" ? (
          <span className={cn("flex items-center justify-between")}>
            <span
              className={cn(
                "relative overflow-hidden p-2 pl-8 rounded-lg font-satoshi font-medium w-full max-w-[50%] text-md border-[1px] flex flex-row items-center justify-between",
                "text-neutral-900",
                "dark:bg-neutral-800 dark:text-white dark:border-neutral-700"
              )}
            >
              <input
                className={cn(
                  "text-sm flex items-center grow bg-transparent",
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
                "text-xs py-2",
                "border-neutral-200 text-neutral-600",
                "hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50",
                "dark:border-neutral-700 dark:text-neutral-400",
                "dark:hover:text-purple-600 dark:hover:border-purple-600 dark:hover:bg-transparent"
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
