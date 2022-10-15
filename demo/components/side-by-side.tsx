import { FC, ReactNode } from "react";

type Props = {
  title: string;
  className?: string;
  oldClasses: string;
  newClasses: string;
  trimStart?: string;
  children?: ReactNode;
};

const SideBySide: FC<Props> = ({
  title,
  className = "",
  oldClasses,
  newClasses,
  trimStart,
  children,
}) => {
  const display = (className: string) =>
    className
      .split(" ")
      .map((x) => x.substring((trimStart ?? "").length))
      .join(" ");
  return (
    <section>
      <h2 className="mb-9">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-9">
        <div className="flex flex-col gap-6">
          <div className="text-sm font-mono">{display(oldClasses)}</div>
          <div>
            <div className={[className, oldClasses].join(" ")}>{children}</div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="text-sm font-mono">{display(newClasses)}</div>
          <div>
            <div className={[className, newClasses].join(" ")}>{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideBySide;
