'use client'

import { useSearchParams } from 'next/navigation'

export default function Client() {
  const searchParams = useSearchParams()
  const tid = searchParams?.get('tid')
  console.log('tid', tid)
  return <>{tid || ''}</>
}
