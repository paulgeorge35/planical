import { cn, compareDates } from "@/lib/utils"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { format } from "date-fns"
import { createRef, useState } from "react"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

type DatePickerProps = {
  selected: Date
  onChange: (date: Date) => void
  showTimeInput?: boolean
  customTimeInput?: React.ReactNode
}

const DatePicker = ({ ...props }: DatePickerProps) => {
  const inputEl = createRef<HTMLInputElement>()

  return (
    // <ReactDatePicker
    //   {...props}
    //   dateFormat="LLL d, h:mmaaa"
    //   showPopperArrow={false}
    //   popperPlacement="top-start"
    //   timeCaption=""
    //   timeInputLabel={""}
    // />
    <ReactDatePicker
      renderCustomHeader={({
        date,
        monthDate,
        decreaseYear,
        increaseYear,
        prevYearButtonDisabled,
        nextYearButtonDisabled,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <button onClick={decreaseYear} disabled={prevYearButtonDisabled}>
            <DoubleArrowLeftIcon />
          </button>
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            <ChevronLeftIcon />
          </button>
          {format(monthDate, "MMM yyyy")}
          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            <ChevronRightIcon />
          </button>
          <button onClick={increaseYear} disabled={nextYearButtonDisabled}>
            <DoubleArrowRightIcon />
          </button>
        </div>
      )}
      timeInputLabel={""}
      dateFormat="LLL d, h:mmaaa"
      showPopperArrow={false}
      popperPlacement="top-start"
      //   popperClassName="shadow-lg rounded-2xl"
      //   wrapperClassName="shadow-lg rounded-2xl"
      calendarClassName="shadow-lg rounded-2xl bg-red-500"
      className="font-satoshi text-sm font-light text-neutral-700"
      customTimeInput={<input style={{ border: "solid 1px pink" }} />}
      {...props}
    />
  )
}

export default DatePicker
