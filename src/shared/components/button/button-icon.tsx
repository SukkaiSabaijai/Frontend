import { cn } from "@/lib/utils";
import { MarkerType } from "@/modules/home/_types/home.type";
import Image from "next/image";

type Props = {
  onClick?: () => void;
  className?: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  type?: "button" | "reset" | "submit";
  mode?: MarkerType;
};

const ButtonIcon = ({
  onClick,
  className,
  src,
  width,
  height,
  alt,
  type,
  mode,
}: Props) => {
  const style =
    mode == MarkerType.Toilet
      ? "bg-custom-light-blue "
      : "bg-custom-light-yellow ";
  return (
    <button
      className={cn(
        `${style} shadow-md shadow-slate-400 w-16 h-16 text-white text-2xl font-semibold rounded-2xl  transition ease-in-out duration-300 flex justify-center items-center`,
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
