import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "TripDiorama — Plan, Experience, Remember",
  description:
    "Plan your trips on a 2D map, log your journey, and get a stunning 3D isometric diorama of your adventure.",
  openGraph: {
    title: "TripDiorama",
    description: "Turn your trips into beautiful 3D diorama keepsakes",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
