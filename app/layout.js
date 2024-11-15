import localFont from "next/font/local";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import DefaultLayout from "@/components/Layout";

export const metadata = {
  title: "CMS",
  description: "CMS",
};
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // Include weights you're using
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto} antialiased`}>
        {/* <DefaultLayout> */}

        {children}
        {/* </DefaultLayout> */}
      </body>
    </html>
  );
}
