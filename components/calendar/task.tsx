type TaskType = {
  minutes: number
}

const Task = ({ minutes }: TaskType) => {
  return (
    <div
      className={`}px] absolute top-0 left-0 z-10 w-full rounded bg-red-400`}
      style={{ height: `${(minutes / 5) * 8}px` }}
    ></div>
  )
}

export default Task
