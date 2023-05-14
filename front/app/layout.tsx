import { Suspense } from "react";
import { Poppins } from "next/font/google";
import clsx from "clsx";

import Navbar from "components/Navbar/Navbar";

import "./styles/tailwind.css";
import "./styles/globals.css";
import "./styles/colors.css";
import "./styles/scrollbars.css";

import DefaultHeadTags from "./DefaultHeadTags";
import Loading from "./loading";

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

export default async function RootLayout({
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
            <Suspense fallback={<Loading />}>
              <section className="h-full w-full overflow-hidden">
                <div className="bg-current-gradient relative flex h-full flex-col">
                  {children}
                </div>
              </section>
            </Suspense>
          </Navbar>
        </div>
      </body>
    </html>
  );
}
