"use client";

import { DayPicker, type DateRange } from "react-day-picker";
import { ptBR } from "date-fns/locale";

type BookingDateRangePickerProps = {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
};

function formatDateToInputValue(date?: Date) {
  if (!date) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseInputValueToDate(value: string) {
  if (!value) {
    return undefined;
  }

  return new Date(`${value}T12:00:00`);
}

function formatDateLabel(value: string) {
  if (!value) {
    return "Selecionar";
  }

  const date = new Date(`${value}T12:00:00`);

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function BookingDateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: BookingDateRangePickerProps) {
  const selectedRange: DateRange | undefined =
    startDate || endDate
      ? {
          from: parseInputValueToDate(startDate),
          to: parseInputValueToDate(endDate),
        }
      : undefined;

  function handleRangeSelect(range: DateRange | undefined) {
    onStartDateChange(formatDateToInputValue(range?.from));
    onEndDateChange(formatDateToInputValue(range?.to));
  }

  return (
    <div className="w-full min-w-0 rounded-[1.5rem] border border-slate-700 bg-slate-950 p-4 text-white">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-sky-300">
            Entrada
          </p>

          <p className="mt-2 text-xl font-black text-white">
            {formatDateLabel(startDate)}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-sky-300">
            Saída
          </p>

          <p className="mt-2 text-xl font-black text-white">
            {formatDateLabel(endDate)}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:hidden">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-200">
            Data de entrada
          </span>

          <input
            type="date"
            value={startDate}
            onChange={(event) => onStartDateChange(event.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-400"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-200">
            Data de saída
          </span>

          <input
            type="date"
            value={endDate}
            min={startDate || undefined}
            onChange={(event) => onEndDateChange(event.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-400"
          />
        </label>
      </div>

      <div className="mt-4 hidden overflow-hidden rounded-[1.5rem] border border-slate-700 bg-slate-900 p-4 md:block">
        <DayPicker
          mode="range"
          selected={selectedRange}
          onSelect={handleRangeSelect}
          locale={ptBR}
          numberOfMonths={1}
          weekStartsOn={0}
          disabled={{ before: new Date() }}
          classNames={{
            months: "flex flex-col",
            month: "space-y-4",
            month_caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-lg font-black text-sky-300 capitalize",
            nav: "space-x-1 flex items-center",
            button_previous:
              "absolute left-1 h-10 w-10 rounded-full border border-slate-600 bg-slate-800 text-white transition hover:bg-slate-700",
            button_next:
              "absolute right-1 h-10 w-10 rounded-full border border-slate-600 bg-slate-800 text-white transition hover:bg-slate-700",
            month_grid: "w-full border-collapse space-y-1",
            weekdays: "flex",
            weekday:
              "w-12 flex-1 rounded-md text-xs font-black uppercase text-slate-400",
            week: "mt-2 flex w-full",
            day: "relative h-12 flex-1 text-center text-sm",
            day_button:
              "h-11 w-11 rounded-full text-sm font-bold text-slate-100 transition hover:bg-sky-400 hover:text-slate-950",
            selected:
              "bg-sky-400 text-slate-950 hover:bg-sky-300 hover:text-slate-950",
            today: "border border-sky-400 text-sky-300",
            outside: "text-slate-600 opacity-50",
            disabled: "text-slate-700 opacity-40",
            range_middle:
              "rounded-none bg-sky-400/20 text-sky-100 hover:bg-sky-400/30",
            range_start:
              "rounded-full bg-sky-400 text-slate-950 hover:bg-sky-300",
            range_end:
              "rounded-full bg-sky-400 text-slate-950 hover:bg-sky-300",
          }}
        />
      </div>
    </div>
  );
}