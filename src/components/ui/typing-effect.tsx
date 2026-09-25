"use client";
import { useEffect, useState } from "react";

const words = ["REST APIs", "dashboards", "auth systems", "full-stack apps", "scalable products"];

export function TypingEffect() {
  const [currentWord, setCurrentWord] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const word = words[currentWord];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => {
          setDisplayed(word.slice(0, displayed.length + 1));
        }, 80 + Math.random() * 40);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setCurrentWord((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, currentWord, mounted]);

  if (!mounted) return <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">{words[0]}</span>;

  return (
    <span className="relative">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-300 to-violet-400">
        {displayed}
      </span>
      <span className="inline-block w-[3px] h-[0.85em] bg-indigo-400 ml-0.5 align-middle animate-pulse" />
    </span>
  );
}
