import "styles/global.scss";
import { Poppins } from "next/font/google";
import DefaultHeadTags from "./DefaultHeadTags";

const poppinsFont = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});
const modeInitializerScript = `(function () {document.documentElement.className = window.localStorage.getItem("mode") || window.matchMedia("(prefers-color-scheme: dark)").matches && "dark" || "light";})();`;

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
      <body className={poppinsFont.className}>
        <script dangerouslySetInnerHTML={{ __html: modeInitializerScript }} />
        {children}
      </body>
    </html>
  );
}
