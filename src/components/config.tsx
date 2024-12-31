"use client";

import { useStore } from "@/store/useStore";
import { useState } from "react";
import ReactDOM from "react-dom";
import { IoIosClose } from "react-icons/io";

export default function Config() {
  // Stores
  const focusDuration = useStore((state) => state.focusDuration);
  const setFocusDuration = useStore((state) => state.setFocusDuration);

  const breakDuration = useStore((state) => state.breakDuration);
  const setBreakDuration = useStore((state) => state.setBreakDuration);

  const longBreakDuration = useStore((state) => state.longBreakDuration);
  const setLongBreakDuration = useStore((state) => state.setLongBreakDuration);

  const longBreakInterval = useStore((state) => state.longBreakInterval);
  const setLongBreakInterval = useStore((state) => state.setLongBreakInterval);

  const isOpenConfigModal = useStore((state) => state.isOpenConfigModal);
  const toggleOpenConfigModal = useStore(
    (state) => state.toggleOpenConfigModal
  );

  // States
  const [focusDurationConfig, setFocusDurationConfig] = useState(
    focusDuration / 60
  );
  const [breakDurationConfig, setBreakDurationConfig] = useState(
    breakDuration / 60
  );
  const [longBreakDurationConfig, setLongBreakDurationConfig] = useState(
    longBreakDuration / 60
  );
  const [longBreakIntervalConfig, setLongBreakIntervalConfig] =
    useState(longBreakInterval);

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
          className="bg-black mx-auto p-5 border w-[425px]"
          onClick={onModalContentClick}
        >
          <button onClick={toggleOpenConfigModal}>
            <IoIosClose />
          </button>
          <form onSubmit={onSubmit} className="flex flex-col gap-y-3">
            <div className="flex items-center">
              <label htmlFor="focus" className="basis-3/4">
                Focus
              </label>
              <input
                className="bg-transparent p-2 border rounded-lg w-full text-white"
                id="focus"
                type="number"
                value={focusDurationConfig}
                onChange={(e) => setFocusDurationConfig(+e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="focus" className="basis-3/4">
                Break
              </label>
              <input
                className="bg-transparent p-2 border rounded-lg w-full text-white"
                id="focus"
                type="number"
                value={breakDurationConfig}
                onChange={(e) => setBreakDurationConfig(+e.target.value)}
              />
            </div>
            <div className="flex items-center text-nowrap">
              <label htmlFor="focus" className="basis-3/4">
                Long Break
              </label>
              <input
                className="bg-transparent p-2 border rounded-lg w-full text-white"
                id="focus"
                type="number"
                value={longBreakDurationConfig}
                onChange={(e) => setLongBreakDurationConfig(+e.target.value)}
              />
            </div>
            <div className="flex items-center text-nowrap">
              <label htmlFor="focus" className="basis-3/4">
                Long Break Interval
              </label>
              <input
                className="bg-transparent p-2 border rounded-lg w-full text-white"
                id="focus"
                type="number"
                value={longBreakIntervalConfig}
                onChange={(e) => setLongBreakDurationConfig(+e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center mt-10">
              <button
                type="submit"
                className="hover:bg-white border rounded-lg w-1/2 h-10 hover:text-black transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.getElementById("main")!
  );
}
