import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Grid Perfect",
  description:
    "Upload a large mural image and automatically slice it into perfectly aligned Instagram posts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} scroll-smooth`}
    >
      <body className={GeistSans.className + "min-h-screen flex flex-col"}>
        <div className="min-h-screen bg-white flex-grow">{children}</div>
      </body>
    </html>
  );
}
