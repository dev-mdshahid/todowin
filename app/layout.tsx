import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TodoWin | Your Ultimate Todo App!",
  description:
    "Todowin is a simple and fun web app that helps you get things done. Whether you need to organize your personal or professional projects, Todowin lets you create, prioritize, and track your tasks with ease. You can also collaborate with others, set reminders, and sync your data across devices. Todowin is the ultimate tool for winning at life!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>{children}</div>
      </body>
    </html>
  );
}
