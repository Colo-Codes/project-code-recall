import { Tooltip } from "@nextui-org/react";
// Tailwind doesn't parse dynamic styles within template literals.
// The framework needs the classes to be explicitly defined at build time,
// and it won’t recognize styles like w-[${easy * 10}px].

export default function CompoundedProgressBar({
  icon,
  easy,
  medium,
  hard,
  tooltip,
}) {
  return (
    <>
      <div className="flex items-center">
        <div className="w-7">{icon}</div>
        <Tooltip
          content={tooltip}
          delay={0}
          closeDelay={0}
          className="bg-gray-600 text-white"
        >
          <div
            // w-40 = 10rem
            className="flex w-40 rounded-md overflow-auto border-1 border-gray-400"
          >
            <div
              className="bg-green-200 h-5"
              style={{ width: `${easy * 10}rem` }}
            ></div>
            <div
              className="bg-orange-200 h-5"
              style={{ width: `${medium * 10}rem` }}
            ></div>
            <div
              className="bg-red-200 h-5"
              style={{ width: `${hard * 10}rem` }}
            ></div>
          </div>
        </Tooltip>
      </div>
    </>
  );
}
