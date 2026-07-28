"use client";

import { DayPicker, type DateRange } from "react-day-picker";
import { ptBR } from "date-fns/locale";

type BookingDateRangePickerProps = {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
};

function formatDateToInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseInputValueToDate(value: string) {
  if (!value) {
    return undefined;
  }

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return undefined;
  }

  return new Date(year, month - 1, day);
}

export function BookingDateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: BookingDateRangePickerProps) {
  const selectedRange: DateRange | undefined = {
    from: parseInputValueToDate(startDate),
    to: parseInputValueToDate(endDate),
  };

  function handleSelect(range: DateRange | undefined) {
    if (!range?.from) {
      onStartDateChange("");
      onEndDateChange("");
      return;
    }

    onStartDateChange(formatDateToInputValue(range.from));

    if (range.to) {
      onEndDateChange(formatDateToInputValue(range.to));
    } else {
      onEndDateChange("");
    }
  }

  return (
    <div className="rounded-[1.75rem] border border-slate-700 bg-slate-900 p-4">
      <DayPicker
        mode="range"
        selected={selectedRange}
        onSelect={handleSelect}
        locale={ptBR}
        weekStartsOn={0}
        className="w-full"
        classNames={{
          months: "flex flex-col",
          month: "space-y-4",
          month_caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-lg font-black text-sky-300 capitalize",
          nav: "space-x-1 flex items-center",
          button_previous:
            "absolute left-1 h-10 w-10 rounded-full border border-slate-600 bg-slate-800 text-white transition outline-none ring-0 hover:bg-slate-700 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
          button_next:
            "absolute right-1 h-10 w-10 rounded-full border border-slate-600 bg-slate-800 text-white transition outline-none ring-0 hover:bg-slate-700 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
          month_grid: "w-full border-collapse space-y-1",
          weekdays: "flex",
          weekday:
            "w-12 flex-1 rounded-md text-xs font-black uppercase text-slate-400",
          week: "mt-2 flex w-full",
          day: "relative h-12 flex-1 text-center text-sm outline-none ring-0",
          day_button:
            "h-11 w-11 rounded-full text-sm font-bold text-slate-100 transition outline-none ring-0 hover:bg-sky-400 hover:text-slate-950 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
          selected:
            "rounded-full bg-sky-400 text-slate-950 outline-none ring-0 hover:bg-sky-300 hover:text-slate-950",
          today:
            "rounded-full border border-sky-400 text-sky-300 outline-none ring-0",
          outside: "text-slate-600 opacity-50",
          disabled: "text-slate-700 opacity-40",
          range_middle:
            "rounded-none bg-sky-400/20 text-sky-100 outline-none ring-0 hover:bg-sky-400/30",
          range_start:
            "rounded-full bg-sky-400 text-slate-950 outline-none ring-0 hover:bg-sky-300",
          range_end:
            "rounded-full bg-sky-400 text-slate-950 outline-none ring-0 hover:bg-sky-300",
        }}
      />
    </div>
  );
}