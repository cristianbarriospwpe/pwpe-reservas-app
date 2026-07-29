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
    <div className="w-full min-w-0 overflow-hidden rounded-[1.5rem] border border-slate-700 bg-slate-900 p-2 sm:rounded-[1.75rem] sm:p-4">
      <DayPicker
        mode="range"
        selected={selectedRange}
        onSelect={handleSelect}
        locale={ptBR}
        weekStartsOn={0}
        className="w-full min-w-0"
        classNames={{
          months: "flex w-full min-w-0 flex-col",
          month: "w-full min-w-0 space-y-4",
          month_caption: "relative flex items-center justify-center pt-1",
          caption_label: "text-base font-black text-sky-300 capitalize sm:text-lg",
          nav: "flex items-center",
          button_previous:
            "absolute left-0 top-0 h-9 w-9 rounded-full border border-slate-600 bg-slate-800 text-white transition outline-none ring-0 hover:bg-slate-700 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 sm:h-10 sm:w-10",
          button_next:
            "absolute right-0 top-0 h-9 w-9 rounded-full border border-slate-600 bg-slate-800 text-white transition outline-none ring-0 hover:bg-slate-700 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 sm:h-10 sm:w-10",
          month_grid: "w-full table-fixed border-collapse",
          weekdays: "grid grid-cols-7",
          weekday:
            "text-center text-[10px] font-black uppercase text-slate-400 sm:text-xs",
          week: "grid grid-cols-7",
          day: "flex h-10 min-w-0 items-center justify-center text-center text-sm outline-none ring-0 sm:h-12",
          day_button:
            "h-9 w-9 rounded-full text-sm font-bold text-slate-100 transition outline-none ring-0 hover:bg-sky-400 hover:text-slate-950 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 sm:h-11 sm:w-11",
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