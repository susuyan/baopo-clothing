"use client";

interface Props {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}

export default function Stepper({ value, onChange, min = 1, max = 99, size = "md" }: Props) {
  const btnClass = size === "sm"
    ? "w-6 h-6 text-xs"
    : "w-8 h-8 text-sm";

  return (
    <div className="inline-flex items-center border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`${btnClass} bg-white text-gray-600 active:bg-gray-100 flex items-center justify-center`}
        aria-label="减"
      >
        -
      </button>
      <span className={`${size === "sm" ? "w-8 text-xs" : "w-10 text-sm"} text-center font-medium text-gray-900 tabular-nums`}>
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className={`${btnClass} bg-white text-gray-600 active:bg-gray-100 flex items-center justify-center`}
        aria-label="加"
      >
        +
      </button>
    </div>
  );
}
