'use client'

import Gfooter from '@/ui/common/global-footer/global-footer'
import { useThemeColor } from '@/ui/context/StyleContext'
import Gheader from './_header/Gheader'
import useConnectRefreshToken from './useConnectRefreshToken'

export default function SiteLayoutComponent({
  children,
}: {
  children?: React.ReactNode
}) {
  useConnectRefreshToken()

  const themeColor = useThemeColor()

  return (
    <>
      <meta name="theme-color" content={themeColor} />
      <Gheader />
      {children}
      <Gfooter />
    </>
  )
}
