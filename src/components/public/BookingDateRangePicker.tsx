"use client";

import { DayPicker, type DateRange } from "react-day-picker";
import { ptBR } from "date-fns/locale";

type BookingDateRangePickerProps = {
  startDate: string;
  endDate: string;
  onChange: (range: { startDate: string; endDate: string }) => void;
};

function dateToInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function inputValueToDate(value: string) {
  if (!value) {
    return undefined;
  }

  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function formatDisplayDate(value: string) {
  if (!value) {
    return "Selecionar";
  }

  const [year, month, day] = value.split("-");

  return `${day}/${month}/${year}`;
}

export function BookingDateRangePicker({
  startDate,
  endDate,
  onChange,
}: BookingDateRangePickerProps) {
  const selectedRange: DateRange | undefined = startDate
    ? {
        from: inputValueToDate(startDate),
        to: inputValueToDate(endDate),
      }
    : undefined;

  function handleSelect(range: DateRange | undefined) {
    onChange({
      startDate: range?.from ? dateToInputValue(range.from) : "",
      endDate: range?.to ? dateToInputValue(range.to) : "",
    });
  }

  return (
    <div className="rounded-[1.5rem] border border-[#E8D8BD] bg-[#FFF7E8] p-4 text-[#1F1A17]">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#E8D8BD] bg-white p-4 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C90000]">
            Entrada
          </p>

          <p className="mt-2 text-lg font-black text-[#1F1A17]">
            {formatDisplayDate(startDate)}
          </p>
        </div>

        <div className="rounded-2xl border border-[#E8D8BD] bg-white p-4 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0B5D2A]">
            Saída
          </p>

          <p className="mt-2 text-lg font-black text-[#1F1A17]">
            {formatDisplayDate(endDate)}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-[1.5rem] border border-[#E8D8BD] bg-white p-4 shadow-sm">
        <DayPicker
          mode="range"
          selected={selectedRange}
          onSelect={handleSelect}
          locale={ptBR}
          numberOfMonths={1}
          disabled={{ before: new Date() }}
          weekStartsOn={0}
          showOutsideDays
          className="w-full"
          classNames={{
            root: "w-full",
            months: "w-full",
            month: "w-full",
            month_caption: "mb-5 flex items-center justify-center",
            caption_label:
              "text-lg font-black capitalize text-[#7A0909]",
            nav: "mb-4 flex items-center justify-between",
            button_previous:
              "rounded-full border border-[#E8D8BD] bg-[#FFF7E8] px-3 py-2 text-sm font-black text-[#7A0909] transition hover:bg-[#F6D77A]",
            button_next:
              "rounded-full border border-[#E8D8BD] bg-[#FFF7E8] px-3 py-2 text-sm font-black text-[#7A0909] transition hover:bg-[#F6D77A]",
            month_grid: "w-full border-separate border-spacing-1",
            weekdays: "",
            weekday:
              "pb-3 text-center text-xs font-black uppercase text-[#7A0909]/70",
            week: "",
            day: "h-10 w-10 text-center align-middle",
            day_button:
              "mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-black text-[#1F1A17] transition hover:bg-[#F6D77A] hover:text-[#4A0606]",
            selected:
              "rounded-full bg-[#7A0909] text-white hover:bg-[#7A0909] hover:text-white",
            range_start:
              "rounded-full bg-[#7A0909] text-white hover:bg-[#7A0909] hover:text-white",
            range_end:
              "rounded-full bg-[#7A0909] text-white hover:bg-[#7A0909] hover:text-white",
            range_middle:
              "rounded-full bg-[#F6D77A] text-[#4A0606] hover:bg-[#F6D77A]",
            today:
              "rounded-full border-2 border-[#0B5D2A] text-[#0B5D2A]",
            disabled:
              "cursor-not-allowed opacity-25 hover:bg-transparent",
            outside: "opacity-25",
          }}
        />
      </div>

      <p className="mt-3 text-xs leading-5 text-[#4D4038]">
        Selecione primeiro a data de entrada e depois a data de saída.
      </p>
    </div>
  );
}