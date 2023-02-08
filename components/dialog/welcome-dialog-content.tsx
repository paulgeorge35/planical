import { useContext, useState } from "react"
import Image from "next/image"
import {
  CheckIcon,
  ChevronRightIcon,
  TrashIcon,
  UploadIcon,
} from "@radix-ui/react-icons"
import Avatar from "../avatar"
import Button from "../button"
import Separator from "../separator"
import supabase from "@/lib/supabase"
import { cn } from "@/lib/utils"
import rocket from "../../assets/images/rocket.svg"
import { SessionContext } from "@/contexts/SessionContext"

type WelcomeDialogContentProps = {
  onClose: () => void
}

const WelcomeDialogContent = ({ onClose }: WelcomeDialogContentProps) => {
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const { session } = useContext(SessionContext)

  const uploadPhoto = async (e: any) => {
    setLoading(true)
    await supabase.storage
      .from("avatars")
      .upload(`public/${session?.id}.png`, e.target.files[0], {
        cacheControl: "3600",
        upsert: true,
      })
    const { data: fetch } = await supabase.storage
      .from("avatars")
      .createSignedUrl(`public/${session?.id}.png`, 60, {
        transform: {
          width: 100,
          height: 100,
        },
      })
    setLoading(false)
    setAvatarUrl(fetch ? `${fetch.signedUrl}` : null)
  }

  return page === 0 ? (
    <span className="flex flex-col items-center space-y-8">
      <Image alt="Welcome" width={200} height={200} src={rocket} />
      <h1 className="mt-4 font-satoshi text-2xl font-medium">
        Welcome to <span className="font-satoshi font-bold ">Planical</span>!
      </h1>
      <p className="mt-2 max-w-[60%] text-center text-sm text-neutral-400">
        We&apos;re glad to have you here. Let&apos;s get started by setting up
        your profile.
      </p>
      <Button
        className={cn(
          "m-0 rounded-full border-0 bg-purple-600 px-4 py-2 text-lg font-bold text-white shadow-2xl hover:bg-purple-700"
        )}
        onClick={() => setPage(1)}
      >
        Set up your profile <ChevronRightIcon className="ml-2 h-6 w-6" />
      </Button>
    </span>
  ) : (
    <span className="flex flex-col items-center justify-center space-y-8">
      <span className="flex w-[50%] flex-col items-center space-y-8 rounded-md border-[1px] border-dashed border-neutral-400 p-4 dark:border-neutral-700">
        <Avatar
          className="h-32 w-32"
          avatarUrl={avatarUrl ? avatarUrl : undefined}
        />
        <span className="flex w-full items-center justify-between">
          <label
            className={cn(
              "ml-0 flex cursor-pointer rounded border-[1px] p-2 text-xs",
              "border-neutral-200 text-neutral-600",
              "hover:border-purple-600 hover:bg-purple-50 hover:text-purple-600",
              "dark:border-neutral-700 dark:text-neutral-400",
              "dark:hover:border-purple-600 dark:hover:bg-transparent dark:hover:text-purple-600",
              loading &&
                "pointer-events-none cursor-not-allowed !text-opacity-20"
            )}
          >
            <UploadIcon className="mr-2" /> Upload
            <input type="file" className="hidden" onChange={uploadPhoto} />
          </label>
          <Button
            disabled={avatarUrl === null}
            className={cn(
              "ml-0 p-2 text-xs",
              "border-neutral-200 text-neutral-600",
              "hover:border-purple-600 hover:bg-purple-50 hover:text-purple-600",
              "dark:border-neutral-700 dark:text-neutral-400",
              "dark:hover:border-purple-600 dark:hover:bg-transparent dark:hover:text-purple-600"
            )}
            onClick={() => setAvatarUrl(null)}
          >
            <TrashIcon className="mr-2" /> Remove
          </Button>
        </span>
        <Separator rootClassName="p-0 m-0" />
        <input
          type={"text"}
          placeholder={"Full name"}
          className={cn(
            "text-md w-full rounded-lg border-[1px] px-3 py-2 font-satoshi font-medium",
            "bg-transparent text-neutral-900",
            "hover:border-neutral-900",
            "dark:border-neutral-700 dark:bg-neutral-800 dark:text-white",
            "dark:hover:border-neutral-500"
          )}
        />
      </span>
      <Button
        className={cn(
          "m-0 w-full rounded-full border-0 bg-purple-600 px-4 py-2 text-lg font-bold text-white shadow-2xl hover:bg-purple-700"
        )}
        onClick={() => setPage(1)}
      >
        Get started <CheckIcon className="ml-2 h-6 w-6" />
      </Button>
    </span>
  )
}

export default WelcomeDialogContent
