import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: "Guess the Camera",
  description: "Can you identify the camera from its parts?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}