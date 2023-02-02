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
      <h1 className="font-satoshi font-medium text-2xl mt-4">
        Welcome to <span className="font-bold font-satoshi ">Planical</span>!
      </h1>
      <p className="text-sm text-neutral-400 mt-2 max-w-[60%] text-center">
        We're glad to have you here. Let's get started by setting up your
        profile.
      </p>
      <Button
        className={cn(
          "m-0 border-0 px-4 py-2 text-lg font-bold bg-purple-600 rounded-full shadow-2xl text-white hover:bg-purple-700"
        )}
        onClick={() => setPage(1)}
      >
        Set up your profile <ChevronRightIcon className="ml-2 w-6 h-6" />
      </Button>
    </span>
  ) : (
    <span className="flex flex-col items-center justify-center space-y-8">
      <span className="flex flex-col items-center space-y-8 rounded-md border-dashed p-4 w-[50%] border-[1px] border-neutral-400 dark:border-neutral-700">
        <Avatar
          className="w-32 h-32"
          avatarUrl={avatarUrl ? avatarUrl : undefined}
        />
        <span className="flex items-center justify-between w-full">
          <label
            className={cn(
              "text-xs ml-0 py-2 px-2 border-[1px] rounded cursor-pointer flex",
              "border-neutral-200 text-neutral-600",
              "hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50",
              "dark:border-neutral-700 dark:text-neutral-400",
              "dark:hover:text-purple-600 dark:hover:border-purple-600 dark:hover:bg-transparent",
              loading &&
                "cursor-not-allowed !text-opacity-20 pointer-events-none"
            )}
          >
            <UploadIcon className="mr-2" /> Upload
            <input type="file" className="hidden" onChange={uploadPhoto} />
          </label>
          <Button
            disabled={avatarUrl === null}
            className={cn(
              "text-xs ml-0 py-2 px-2",
              "border-neutral-200 text-neutral-600",
              "hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50",
              "dark:border-neutral-700 dark:text-neutral-400",
              "dark:hover:text-purple-600 dark:hover:border-purple-600 dark:hover:bg-transparent"
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
            "px-3 py-2 rounded-lg font-satoshi font-medium text-md w-full border-[1px]",
            "bg-transparent text-neutral-900",
            "hover:border-neutral-900",
            "dark:bg-neutral-800 dark:text-white dark:border-neutral-700",
            "dark:hover:border-neutral-500"
          )}
        />
      </span>
      <Button
        className={cn(
          "m-0 w-full border-0 px-4 py-2 text-lg font-bold bg-purple-600 rounded-full shadow-2xl text-white hover:bg-purple-700"
        )}
        onClick={() => setPage(1)}
      >
        Get started <CheckIcon className="ml-2 w-6 h-6" />
      </Button>
    </span>
  )
}

export default WelcomeDialogContent
