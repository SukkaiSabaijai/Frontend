import { cn } from "@/lib/utils";

type Props = {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
};

const Button = ({ onClick, className, children }: Props) => {
  return (
    <button
      className={cn(
        "bg-custom-blue py-4 px-20 shadow-md shadow-slate-400 text-white text-2xl font-semibold rounded-full hover:bg-custom-yellow transition ease-in-out duration-300",
        className
      )}
      onClick={onClick}
      style={{ pointerEvents: "auto" }}
    >
      {children}
    </button>
  );
};

export default Button;
