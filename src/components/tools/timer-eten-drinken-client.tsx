"use client";

import { useEffect, useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ConversionBlock } from "@/components/conversion-block";
import { SmartAffiliateBlock } from "@/components/smart-affiliate-block";
import { trackEvent } from "@/lib/analytics";

export function TimerEtenDrinkenClient() {
  const [minutes, setMinutes] = useState(30);
  const [secondsLeft, setSecondsLeft] = useState(30 * 60);
  const [running, setRunning] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    trackEvent("tool_use", { tool: "timer-eten-drinken" });
  }, []);

  useEffect(() => {
    if (!running) {
      return;
    }
    const interval = setInterval(() => {
      setSecondsLeft((value) => {
        if (value <= 1) {
          setRunning(false);
          if (audioEnabled && typeof window !== "undefined") {
            const ctx = new window.AudioContext();
            const osc = ctx.createOscillator();
            osc.connect(ctx.destination);
            osc.start();
            setTimeout(() => osc.stop(), 180);
          }
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [audioEnabled, running]);

  const timeLabel = useMemo(() => {
    const min = Math.floor(secondsLeft / 60)
      .toString()
      .padStart(2, "0");
    const sec = (secondsLeft % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  }, [secondsLeft]);

  function reset(nextMinutes: number) {
    setMinutes(nextMinutes);
    setSecondsLeft(nextMinutes * 60);
    setRunning(false);
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Start", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Timer eten drinken" }
        ]}
      />
      <h1 className="text-3xl font-bold text-gooseNavy">Eten drinken timer</h1>
      <section className="card text-center">
        <div className="mb-4 flex justify-center gap-2">
          {[20, 30, 45].map((value) => (
            <button
              key={value}
              aria-label={`Stel ${value} minuten in`}
              onClick={() => reset(value)}
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                minutes === value ? "bg-gooseNavy text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              {value} min
            </button>
          ))}
        </div>
        <p className="text-5xl font-bold text-gooseNavy">{timeLabel}</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button
            aria-label={running ? "Stop timer" : "Start timer"}
            className="btn-primary min-w-40"
            onClick={() => {
              setRunning((value) => !value);
              trackEvent("tool_use", { tool: "timer-eten-drinken", action: running ? "stop" : "start" });
            }}
          >
            {running ? "Stop" : "Start"}
          </button>
          <button aria-label="Reset timer" className="btn-secondary" onClick={() => reset(minutes)}>
            Reset
          </button>
        </div>
        <label className="mt-4 inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={audioEnabled}
            onChange={(event) => setAudioEnabled(event.target.checked)}
            aria-label="Audio signaal"
          />
          Audio signaal
        </label>
      </section>
      <SmartAffiliateBlock contextKey="timer-eten-drinken" />
      <ConversionBlock variant="community" context="tool-timer-eten-drinken" />
    </div>
  );
}
