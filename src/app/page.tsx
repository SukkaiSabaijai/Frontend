import dynamic from "next/dynamic";

const HomePage = dynamic(() => import("@/modules/home/home-page"), {
  ssr: false,
});

export default function Home() {
  return <HomePage/>;
}
