import Image from "next/image";
import { MarkerType } from "./_types/home.type";

type Props = {
  mode: MarkerType;
};

const HomeHeader = ({ mode }: Props) => {
  const title =
    mode == MarkerType.Toilet ? "Toilet Near Me 🚽" : "Seat Near Me 🪑";
  const style =
    mode == MarkerType.Toilet ? "bg-custom-blue" : "bg-custom-yellow";
  return (
    <div
      className={`${style} w-full h-28 rounded-b-2xl font-bold text-white font-mono text-3xl flex justify-center items-end pb-4 shadow-md shadow-slate-400 z-[1000] absolute`}
    >
      {title}
    </div>
  );
};

export default HomeHeader;
