import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  onClick?: () => void;
  className?: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  type?:"button" | "reset" | "submit";
};

const ButtonIcon = ({ onClick, className, src, width, height, alt,type }: Props) => {
  return (
    <button
      className={cn(
        " bg-custom-light-blue shadow-md shadow-slate-400 w-16 h-16 text-white text-2xl font-semibold rounded-2xl hover:bg-custom-yellow transition ease-in-out duration-300 flex justify-center items-center",
        className
      )}
      onClick={onClick}
      style={{ pointerEvents: "auto" }}
      type={type}
    >
      <Image src={src} width={width} height={height} alt={alt} />
    </button>
  );
};

export default ButtonIcon;
