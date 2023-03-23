import { Poppins } from "next/font/google";
import clsx from "clsx";

import Navbar from "components/Navbars/Navbar";
import Sidebar from "components/Navbars/Sidebar";

import "./styles/tailwind.css";
import "./styles/globals.css";
import "./styles/colors.css";
import "./styles/scrollbars.css";

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
          "bg-white text-base text-white dark:bg-black"
        )}
      >
        <script dangerouslySetInnerHTML={{ __html: modeInitializerScript }} />
        <div className="relative flex h-full flex-col">
          <Navbar>
            <Sidebar />
            {children}
          </Navbar>
        </div>
      </body>
    </html>
  );
}
