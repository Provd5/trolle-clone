import { Poppins } from "next/font/google";
import clsx from "clsx";

import ModeSwitcher from "components/ModeSwitcher/ModeSwitcher";

import "./globals.css";

import DefaultHeadTags from "./DefaultHeadTags";

const poppinsFont = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const modeInitializerScript = `(function () {document.documentElement.className = window.localStorage.getItem("mode") || window.matchMedia("(prefers-color-scheme: dark)").matches && "dark" || "light";})();`;

export const metadata = {
  title: {
    default: "Projekt T.U.T.E.L",
    template: "%s | T.U.T.E.L",
  },
  description: "Projekt T.U.T.E.L",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <head>
        <DefaultHeadTags />
      </head>
      <body
        className={clsx(
          poppinsFont.className,
          "bg-white text-black dark:bg-black dark:text-white"
        )}
      >
        <script dangerouslySetInnerHTML={{ __html: modeInitializerScript }} />
        {children}
        <ModeSwitcher />
      </body>
    </html>
  );
}
