"use client";
import { useEffect, useState } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string | null>(null); // Start with null to avoid SSR mismatch

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
    document.documentElement.style.colorScheme = storedTheme;
  }, []);

  // Prevent rendering until theme is set to avoid hydration mismatch
  if (theme === null) return null;

  return <div>{children}</div>;
}
