import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-2xl group/bento hover:-translate-y-1 transition duration-300 shadow-none p-0 bg-white/5 backdrop-blur-xl border border-white/10 justify-between flex flex-col space-y-4 overflow-hidden relative",
        className
      )}
    >
      {/* Inner Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 h-full">
        {header}
        {(title || description || icon) && (
          <div className="group-hover/bento:translate-x-2 transition duration-200 p-4">
            {icon}
            <div className="font-sans font-bold text-white mb-2 mt-2 text-lg tracking-tight">
              {title}
            </div>
            <div className="font-sans font-normal text-neutral-400 text-sm leading-relaxed">
              {description}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
