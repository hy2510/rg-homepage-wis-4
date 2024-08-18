'use client'

import { useSiteBlueprint } from '@/app/_context/CustomerContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_kids_prek'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const { PreK, DodoABC } = useSiteBlueprint().studyOpen

  const style = useStyle(STYLE_ID)
  const pathname = usePathname()

  const dodoAbc = pathname.indexOf('dodo-abc') != -1
  const preK = pathname.indexOf('pre-k') != -1

  return (
    <>
      <div className={style.kids_top}>
        {PreK && DodoABC && (
          <div className={style.kids_top_nav}>
            <Link href={'/basic/dodo-abc'}>
              <div className={`${style.nav_item} ${dodoAbc && style.active}`}>
                DODO ABC
              </div>
            </Link>
            <Link href={'/basic/pre-k'}>
              <div className={`${style.nav_item} ${preK && style.active}`}>
                PRE K
              </div>
            </Link>
          </div>
        )}
      </div>
      {children}
    </>
  )
}
