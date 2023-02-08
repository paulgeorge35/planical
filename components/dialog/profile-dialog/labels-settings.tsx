import Button from "@/components/button"
import LabelColorBubble from "@/components/task/label-color-bubble"
import { cn } from "@/lib/utils"
import {
  MagnifyingGlassIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons"
import { useCallback, useEffect, useState } from "react"
import { LabelNoIDType, PickAndFlatten } from "types"
import { GithubPicker } from "react-color"
import { Label } from "@prisma/client"
import { Spinnaker } from "@next/font/google"

interface LabelProps extends LabelNoIDType {
  id?: number
  disabled: boolean
  editing: boolean
  editedLabel?: Label
  toggleEdit: () => void
  onLabelChange: (value: string) => void
  onLabelColorChange: (value: string) => void
  onLabelDelete?: () => void
  onLabelSave: () => void
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
  onLabelSave,
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
            onClick={onLabelDelete}
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
            onClick={onLabelSave}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  )
}

async function getLabels() {
  const res = await (
    await fetch("/api/labels/labels", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "default",
    })
  ).json()
  return res
}

type LabelsSettingsProps = {}

const LabelsSettings = ({}: LabelsSettingsProps) => {
  const [labels, setLabels] = useState<Label[]>([])
  const [search, setSearch] = useState<string>("")
  const [editing, setEditing] = useState<boolean[]>([])
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [newLabel, setNewLabel] =
    useState<
      PickAndFlatten<Omit<Label, "id" | "createdAt" | "userId" | "updatedAt">>
    >()
  const [editedLabel, setEditedLabel] = useState<Label>()

  const fetchData = async () => {
    setIsFetching(true)
    const { labels } = await getLabels()
    setLabels(labels)
    setIsFetching(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const createLabel = async (
    data: PickAndFlatten<
      Omit<Label, "id" | "createdAt" | "updatedAt" | "userId">
    >
  ) => {
    const res = await (
      await fetch("/api/labels/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          name: data.name,
          color: data.color,
        }),
      })
    ).json()
    if (res) setLabels([...labels, res.label])
    return res
  }

  const updateLabel = async (data?: Label) => {
    if (!data) return
    const res = await (
      await fetch("/api/labels/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache",
        body: JSON.stringify({
          ...data,
        }),
      })
    ).json()
    if (res)
      setLabels([...labels.filter((l) => l.id !== res.label.id), res.label])
    return res
  }

  const deleteLabel = async (id: number) => {
    const res = await (
      await fetch(`/api/labels/delete?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })
    ).json()
    console.log(res)
    if (res) setLabels(labels.filter((l) => l.id !== res.id))
    return res
  }

  const toggleEdit = useCallback(
    (index: number, value: boolean, label: Label) => {
      if (!value) setEditedLabel(label)
      if (labels)
        setEditing(
          [...Array.from({ length: labels.length }, () => false)].map((_, i) =>
            index === i ? !value : false
          )
        )
    },
    [labels]
  )

  const updateLabelNewFields = useCallback(
    (field: "color" | "name", value: string) => {
      if (typeof newLabel === "undefined") return
      setNewLabel({ ...newLabel, [field]: value })
    },
    [newLabel]
  )

  const updateLabelFields = useCallback(
    (field: "color" | "name", value: string) => {
      if (typeof editedLabel === "undefined") return
      setEditedLabel({ ...editedLabel, [field]: value })
    },
    [editedLabel]
  )

  useEffect(() => {
    if (labels) setEditing(Array.from({ length: labels.length }, () => false))
  }, [labels])

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
              disabled={isFetching}
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
            onLabelChange={(name) => updateLabelNewFields("name", name)}
            onLabelColorChange={(color) => updateLabelNewFields("color", color)}
            onLabelSave={async () => {
              await createLabel(newLabel)
              setNewLabel(undefined)
              setEditing(
                [...Array.from({ length: labels.length }, () => false)].splice(
                  -1
                )
              )
            }}
          />
        )}

        {isFetching ? (
          <div className={cn("flex grow flex-col items-center justify-center")}>
            <span className={cn("text-sm text-neutral-600")}>
              Loading labels...
            </span>
          </div>
        ) : (
          labels
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
                onLabelChange={(name) => updateLabelFields("name", name)}
                onLabelColorChange={(color) =>
                  updateLabelFields("color", color)
                }
                onLabelSave={async () => {
                  await updateLabel(editedLabel)
                  toggleEdit(index, editing[index], label)
                }}
                onLabelDelete={() => deleteLabel(label.id)}
              />
            ))
        )}
      </div>
    </div>
  )
}

export default LabelsSettings
