"use client";

import { useStore } from "@/store/useStore";
import { useState } from "react";
import ReactDOM from "react-dom";

export default function Config() {
  const focusDuration = useStore((state) => state.focusDuration);
  const [focusDurationConfig, setFocusDurationConfig] = useState(
    focusDuration / 60
  );
  const setFocusDuration = useStore((state) => state.setFocusDuration);
  const isOpenConfigModal = useStore((state) => state.isOpenConfigModal);
  const toggleOpenConfigModal = useStore(
    (state) => state.toggleOpenConfigModal
  );

  if (!isOpenConfigModal) return null;

  const onModalContentClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFocusDuration(focusDurationConfig * 60);
    toggleOpenConfigModal();
  };

  return ReactDOM.createPortal(
    <>
      <div
        className="top-0 left-0 fixed flex justify-center items-center bg-black/50 w-full h-screen"
        onClick={toggleOpenConfigModal}
      >
        <div
          className="bg-black mx-auto p-5 border max-w-[425px]"
          onClick={onModalContentClick}
        >
          <form onSubmit={onSubmit} className="flex flex-col">
            <label htmlFor="focus">Focus</label>
            <input
              className="text-black"
              id="focus"
              type="number"
              value={focusDurationConfig}
              onChange={(e) => setFocusDurationConfig(+e.target.value)}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </>,
    document.getElementById("main")!
  );
}
