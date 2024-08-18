import Login from './_component/Login'

const BETA_SERVICE_LOGIN = process.env.BETA_SERVICE_LOGIN

export default function Page() {
  const isBetaLogin = BETA_SERVICE_LOGIN === 'Y'
  return <Login isBetaLogin={isBetaLogin} />
}
