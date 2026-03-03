import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = 'https://themecrafter.classikh.me'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'ThemeCrafter — Design. Tweak. Export.',
  description:
    'A visual theme editor for developers. Create, tweak with live preview, and export to Neovim, VSCode, tmux, Ghostty, Kitty, Alacritty and WezTerm in one click.',
  keywords: [
    'neovim theme', 'vscode theme', 'tmux theme', 'ghostty theme',
    'color scheme editor', 'terminal theme', 'developer tools',
  ],
  authors: [{ name: 'Charan Kamal Singh', url: BASE_URL }],
  creator: 'Charan Kamal Singh',

  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'ThemeCrafter',
    title: 'ThemeCrafter — Design. Tweak. Export.',
    description:
      'Visual theme editor with live code preview. Export to Neovim, VSCode, tmux, Ghostty, Kitty, Alacritty and WezTerm.',
    images: [
      {
        url: './og.png',
        width: 1200,
        height: 630,
        alt: 'ThemeCrafter — Code Editor Theme Creator',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ThemeCrafter — Design. Tweak. Export.',
    description:
      'Visual theme editor with live code preview. Export to Neovim, VSCode, tmux, Ghostty, Kitty, Alacritty and WezTerm.',
    images: ['/og.png'],
    creator: '@classikh',
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  alternates: {
    canonical: BASE_URL,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
