import { CenterContainer } from "@/components/center-container";
import { Timer } from "@/components/timer";

export default function Home() {
  return (
    <main className="bg-zinc-800 w-full min-h-screen">
      <div className="flex justify-center items-center p-10 w-full h-screen">
        <CenterContainer>
          <Timer />
        </CenterContainer>
      </div>
    </main>
  );
}
