import Client from './Client'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <html>
      <body>
        <div>
          <Client />
        </div>
      </body>
    </html>
  )
}
