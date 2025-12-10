import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "FORZA Power Technologies - Tienda Online",
  description: "Soluciones de energía inteligentes: UPS, reguladores, inversores solares y más.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="es" data-mode="light">
      <body className="font-sans antialiased">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
