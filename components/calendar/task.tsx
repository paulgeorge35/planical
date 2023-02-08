type TaskType = {
  minutes: number
}

const Task = ({ minutes }: TaskType) => {
  return (
    <div
      className={`absolute z-10 w-full h-[${
        (minutes / 5) * 8
      }px] top-0 left-0 rounded bg-red-400`}
    ></div>
  )
}

export default Task
