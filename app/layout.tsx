import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "./theme-provider";
export const metadata: Metadata = {
  title: "Task Manager App",
  description: "A powerful task management application.", 
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

