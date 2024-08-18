'use client'

import { useSiteBlueprint } from '@/app/_context/CustomerContext'
import SITE_PATH from '@/app/site-path'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const { PreK, DodoABC } = useSiteBlueprint().studyOpen

  if (DodoABC) {
    return <Redirect to={SITE_PATH.BASIC.DODO_ABC} />
  } else if (PreK) {
    return <Redirect to={SITE_PATH.BASIC.PRE_K} />
  }
  return <>Not support is this customer Kinder StudyMenu.</>
}

function Redirect({ to }: { to?: string }) {
  const router = useRouter()

  useEffect(() => {
    if (!!to) {
      router.replace(to)
    }
  }, [to, router])

  return <></>
}
