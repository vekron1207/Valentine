"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import NameGate from "@/components/NameGate";
import RejectScreen from "@/components/RejectScreen";
import ValentinePrompt from "@/components/ValentinePrompt";
import Confirmation from "@/components/Confirmation";
import FloatingHearts from "@/components/FloatingHearts";
import BackgroundMusic from "@/components/BackgroundMusic";

type Screen =
  | "NAME_INPUT"
  | "REJECT_SCREEN"
  | "VALENTINE_SCREEN"
  | "CONFIRMATION_SCREEN";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("NAME_INPUT");
  const [name, setName] = useState("");

  return (
    <main className="mesh-bg relative min-h-dvh overflow-hidden">
      <FloatingHearts />
      <BackgroundMusic />
      <div className="relative z-10 flex min-h-dvh items-center justify-center px-5 py-8">
        <AnimatePresence mode="wait">
          {screen === "NAME_INPUT" && (
            <NameGate
              key="name"
              onValid={(n) => {
                setName(n);
                setScreen("VALENTINE_SCREEN");
              }}
              onInvalid={() => setScreen("REJECT_SCREEN")}
            />
          )}
          {screen === "REJECT_SCREEN" && (
            <RejectScreen
              key="reject"
              onDone={() => setScreen("NAME_INPUT")}
            />
          )}
          {screen === "VALENTINE_SCREEN" && (
            <ValentinePrompt
              key="valentine"
              name={name}
              onYes={() => setScreen("CONFIRMATION_SCREEN")}
            />
          )}
          {screen === "CONFIRMATION_SCREEN" && (
            <Confirmation key="confirm" name={name} />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
