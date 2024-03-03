export const metadata = {
  title: 'Motic',
  description: 'Bítacora Emocional',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
