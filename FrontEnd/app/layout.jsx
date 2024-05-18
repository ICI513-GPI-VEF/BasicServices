import { Inter } from 'next/font/google'
import "@/styles/globals.css"
import Nav from "@/components/Nav"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GPI Page',
  description: 'Pagina para Gestion de Proyectos Informaticos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
          <Nav/>
        {children}
      </body>
    </html>
  )
}