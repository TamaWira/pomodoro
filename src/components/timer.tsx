"use client";

import { useEffect, useState } from "react";
import { MdSkipNext } from "react-icons/md";
import { RiResetLeftFill } from "react-icons/ri";
import { FaPause, FaPlay } from "react-icons/fa6";
import { formatTime } from "@/utils/formatTime";
import { useStore } from "@/store/useStore";

// const focusDuration = 60 * 25; // 25 minutes
const breakDuration = 60 * 5; // 5 minutes
const longBreakDuration = 60 * 15; // 15 minutes

export function Timer() {
  const focusDuration = useStore((state) => state.focusDuration);
  const [isPlay, setIsPlay] = useState(false);
  const [timeLeft, setTimeLeft] = useState(focusDuration);
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [currentSessionNumber, setCurrentSessionNumber] = useState(1);
  const [currentSession, setCurrentSession] = useState({
    title: "Focus!",
    description: "Obliterate those pesky tasks!",
  });

  useEffect(() => {
    console.log("LOG :: focusDuration:", focusDuration);
    setTimeLeft(focusDuration);
  }, [focusDuration]);

  useEffect(() => {
    let timer: any;
    if (isPlay && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setCurrentSessionIndex((prev) => prev + 1);
    }

    // Cleanup interval on unmount or when timer stops
    return () => clearInterval(timer);
  }, [isPlay, timeLeft]);

  useEffect(() => {
    if (currentSessionIndex > 0) {
      const audio = new Audio("pomodoro-times-up.mp3");
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }

    if (currentSessionIndex % 2 === 0) {
      setSessionToFocus();
      if (currentSessionIndex !== 0) {
        setCurrentSessionNumber((prev) => prev + 1);
      }
      return;
    } else if (
      currentSessionIndex % 2 !== 0 &&
      currentSessionNumber % 4 === 0
    ) {
      setSessionToLongBreak();
      return;
    } else if (currentSessionIndex % 2 !== 0) {
      setSessionToBreak();
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSessionIndex]);

  const onClickPlay = () => {
    setIsPlay(!isPlay);
  };

  const onClickReset = () => {
    setIsPlay(false);
    setCurrentSessionIndex(0);
    setCurrentSessionNumber(1);
  };

  const onClickNextSession = () => {
    setCurrentSessionIndex((prev) => prev + 1);
  };

  const setSessionToFocus = () => {
    setTimeLeft(focusDuration);
    setCurrentSession({
      title: "Focus!",
      description: "Obliterate those pesky tasks!",
    });
  };

  const setSessionToBreak = () => {
    setTimeLeft(breakDuration);
    setCurrentSession({
      title: "Break!",
      description: "Take a step back and relax a bit",
    });
  };

  const setSessionToLongBreak = () => {
    setTimeLeft(longBreakDuration);
    setCurrentSession({
      title: "Long Break!",
      description: "Try to take a walk and let your mind of your work",
    });
  };

  return (
    <>
      <p className="top-5 right-5 absolute">#{currentSessionNumber}</p>
      <audio id="audio" className="audio">
        <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3" />
      </audio>
      <div className="flex flex-col items-center gap-y-10">
        <div className="text-center">
          <h2 className="text-3xl">{currentSession.title}</h2>
          <p className="text-sm">{currentSession.description}</p>
        </div>
        <p className="text-6xl">{formatTime(timeLeft)}</p>
        <div className="flex items-center space-x-5">
          <button
            onClick={onClickPlay}
            className="flex justify-center items-center border-zinc-500 border rounded-full w-10 h-10"
          >
            {!isPlay ? <FaPlay /> : <FaPause />}
          </button>
          <button
            onClick={onClickReset}
            className="flex justify-center items-center border-zinc-500 border rounded-full w-10 h-10"
          >
            <RiResetLeftFill />
          </button>
          <button
            onClick={onClickNextSession}
            className="flex justify-center items-center border-zinc-500 border rounded-full w-10 h-10"
          >
            <MdSkipNext />
          </button>
        </div>
      </div>
    </>
  );
}
