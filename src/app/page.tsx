import { CenterContainer } from "@/components/center-container";
import Config from "@/components/config";
import Header from "@/components/header";
import { Timer } from "@/components/timer";

export default function Home() {
  return (
    <main className="bg-zinc-800 w-full min-h-screen" id="main">
      <div className="relative flex flex-col mx-auto max-w-[452px] h-screen">
        <Header />
        <Config />
        <div className="flex flex-col flex-1 justify-center items-center p-5 bordecoration-purple-50">
          <CenterContainer>
            <Timer />
          </CenterContainer>
        </div>
      </div>
    </main>
  );
}
