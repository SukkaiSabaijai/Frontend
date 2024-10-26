import Image from "next/image";

const HomeHeader = () => {
  return (
    <div className="w-full bg-custom-blue h-28 rounded-b-2xl font-bold text-white font-mono text-3xl flex justify-center items-end pb-4 shadow-md shadow-slate-400 z-[1000] absolute">
      Toilet Near Me
      <Image
        src="/assets/image/toilet.png"
        alt="toilet"
        width={40}
        height={40}
      />
    </div>
  );
};

export default HomeHeader;
