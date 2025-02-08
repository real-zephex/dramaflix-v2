import "./globals.css";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { GoogleAnalytics } from "@next/third-parties/google";

import Navbar from "@/components/ui/navbar";
import { font_lexend } from "@/components/fonts";
import Donate from "@/components/ui/donate";

const APP_NAME = "Dramaflix";
const APP_DEFAULT_TITLE = "Dramaflix";
const APP_TITLE_TEMPLATE = "%s - Dramaflix";
const APP_DESCRIPTION = "Your one stop solution for all your media needs.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  keywords: [
    "streaming",
    "movies",
    "TV shows",
    "media",
    "piracy",
    "free streamig",
    "free movies",
    "free anime",
    "free kdramas",
    "watch online",
  ],
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <GoogleAnalytics gaId="G-64S37Q7YY4" />
        <script
          type="text/javascript"
          src="//pl25806056.effectiveratecpm.com/07/e6/31/07e6311772411d8ec4ded0982962182c.js"
        ></script>
      </head>
      <body className={font_lexend.className} data-theme="dark">
        <NextTopLoader showSpinner={false} />
        <Navbar />
        <section data-theme="dark">
          {children}
          <div className="fixed bottom-0 left-0 z-[99] p-4">
            <Donate />
          </div>
        </section>
      </body>
    </html>
  );
}
