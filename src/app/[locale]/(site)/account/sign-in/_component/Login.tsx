'use client'

import { useApplicationType } from '@/app/_context/AppContext'
import LoginContextProvider from '@/app/_context/LoginContext'
import LoginForm from './LoginForm'
import LoginFormAcademy from './LoginFormAcademy'
import LoginFormBetaService from './LoginFormBetaService'
import LoginFormIntegrated from './LoginFormIntegrated'
import LoginFormPrivate from './LoginFormPrivate'
import LoginFormSchool from './LoginFormSchool'
import LoginFormIntro from './LoginFormIntro'

export default function Login({
  isBetaLogin = false,
}: {
  isBetaLogin?: boolean
}) {
  const appType = useApplicationType()

  return (
    <LoginContextProvider>
      {(appType === 'private' || 'school' || 'academy' || 'app') && 
        <LoginForm>
          {appType === 'private' && <LoginFormPrivate />}
          {appType === 'school' && <LoginFormSchool />}
          {appType === 'academy' && <LoginFormAcademy />}
          {appType === 'app' &&
            (!isBetaLogin ? <LoginFormIntegrated /> : <LoginFormBetaService />)}
        </LoginForm> 
      }
    </LoginContextProvider>
  )
}
