"use client";

import { useStore } from "@/store/useStore";
import Logo from "./logo";
import { FaGear } from "react-icons/fa6";

export default function Header() {
  const toggleOpenConfigModal = useStore(
    (state) => state.toggleOpenConfigModal
  );

  return (
    <header className="top-0 right-0 left-0 absolute">
      <nav className="flex justify-between items-center border-white p-5 border-b-2">
        <Logo />
        <button className="text-2xl" onClick={toggleOpenConfigModal}>
          <FaGear />
        </button>
      </nav>
    </header>
  );
}
