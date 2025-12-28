import type { Metadata } from "next";
import "@/app/globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Shirel Malka",
  description: "Created with v0",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
