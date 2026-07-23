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
    <div className="w-full min-w-0 rounded-[1.5rem] border border-[#3A3326] bg-[#1F1A17] p-4 text-white">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#4A4134] bg-[#121212] p-4">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#F26B4F]">
            Entrada
          </p>

          <p className="mt-2 text-xl font-black">
            {formatDisplayDate(startDate)}
          </p>
        </div>

        <div className="rounded-2xl border border-[#4A4134] bg-[#121212] p-4">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8BE0A4]">
            Saída
          </p>

          <p className="mt-2 text-xl font-black">
            {formatDisplayDate(endDate)}
          </p>
        </div>
      </div>

      {/* Mobile: campos nativos, más seguro y limpio */}
      <div className="mt-4 grid gap-3 md:hidden">
        <div>
          <label className="text-sm font-black text-white">
            Data de entrada
          </label>

          <input
            type="date"
            value={startDate}
            onChange={(event) =>
              onChange({ startDate: event.target.value, endDate })
            }
            className="mt-2 w-full rounded-2xl border border-[#4A4134] bg-[#121212] px-4 py-3 text-white outline-none focus:border-[#F6D77A]"
          />
        </div>

        <div>
          <label className="text-sm font-black text-white">Data de saída</label>

          <input
            type="date"
            value={endDate}
            onChange={(event) =>
              onChange({ startDate, endDate: event.target.value })
            }
            className="mt-2 w-full rounded-2xl border border-[#4A4134] bg-[#121212] px-4 py-3 text-white outline-none focus:border-[#F6D77A]"
          />
        </div>
      </div>

      {/* Desktop/tablet: calendario visual */}
      <div className="mt-4 hidden overflow-hidden rounded-[1.5rem] border border-[#4A4134] bg-[#121212] p-4 md:block">
        <DayPicker
          mode="range"
          selected={selectedRange}
          onSelect={handleSelect}
          locale={ptBR}
          numberOfMonths={1}
          disabled={{ before: new Date() }}
          weekStartsOn={0}
          showOutsideDays
          classNames={{
            root: "w-full",
            months: "w-full",
            month: "w-full",
            month_caption: "mb-5 flex items-center justify-center",
            caption_label: "text-lg font-black capitalize text-[#F26B4F]",
            nav: "mb-4 flex items-center justify-between",
            button_previous:
              "rounded-full border border-[#4A4134] bg-[#2A251B] px-3 py-2 text-sm font-black text-white transition hover:bg-[#3A3326]",
            button_next:
              "rounded-full border border-[#4A4134] bg-[#2A251B] px-3 py-2 text-sm font-black text-white transition hover:bg-[#3A3326]",
            month_grid: "w-full border-separate border-spacing-1",
            weekday:
              "pb-3 text-center text-xs font-black uppercase text-[#D8C9B4]",
            day: "h-10 w-10 text-center align-middle",
            day_button:
              "mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-black text-white transition hover:bg-[#F6D77A] hover:text-[#4A0606]",
            selected:
              "rounded-full bg-[#7A0909] text-white hover:bg-[#7A0909] hover:text-white",
            range_start:
              "rounded-full bg-[#7A0909] text-white hover:bg-[#7A0909] hover:text-white",
            range_end:
              "rounded-full bg-[#7A0909] text-white hover:bg-[#7A0909] hover:text-white",
            range_middle:
              "rounded-full bg-[#F6D77A] text-[#4A0606] hover:bg-[#F6D77A]",
            today: "rounded-full border-2 border-[#0B5D2A] text-[#8BE0A4]",
            disabled: "cursor-not-allowed opacity-25 hover:bg-transparent",
            outside: "opacity-25",
          }}
        />
      </div>

      <p className="mt-3 text-xs leading-5 text-[#D8C9B4]">
        No celular, selecione as datas nos campos acima. No computador, você
        também pode usar o calendário visual.
      </p>
    </div>
  );
}