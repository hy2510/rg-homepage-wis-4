'use client'

import React, { useContext, useState } from 'react'

type Platform = 'unknown' | 'web' | 'android' | 'ios'

type DeviceContextProps = {
  platform: Platform
}

const DeviceContext = React.createContext<DeviceContextProps>({
  platform: 'unknown',
})

export default function DeviceContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  //FIXME : 실제 Device 연동 필요
  const [device, setDevice] = useState<DeviceContextProps>({
    platform: 'web',
  })
  return (
    <DeviceContext.Provider value={device}>{children}</DeviceContext.Provider>
  )
}

export function useDevicePlatform(): Platform {
  const context = useContext(DeviceContext)
  if (!context) {
    throw new Error('ContextComponent is not binded.')
  }
  return context.platform
}
