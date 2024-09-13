'use client'

import { useStyle } from '@/ui/context/StyleContext'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import SITE_PATH from '@/app/site-path'

const STYLE_ID = 'page_catalog'

export default function SubPageNavBar() {
  const style = useStyle(STYLE_ID)

  const pathname = usePathname()

  return (
    <div className={style.sub_page_nav_bar}>
        <a href={SITE_PATH.CATALOG.BASIC}>
          <div className={`${style.nav_item} ${pathname.indexOf(SITE_PATH.CATALOG.BASIC) != -1 && style.active}`}>기초 영어</div>
        </a>
        <a href={SITE_PATH.CATALOG.EBOOK}>
          <div className={`${style.nav_item} ${pathname.indexOf(SITE_PATH.CATALOG.EBOOK) != -1 && style.active}`}>오디오 스토리북</div>
        </a>
        {/* <a href={SITE_PATH.CATALOG.EBOOK}>
          <div className={`${style.nav_item}`}>AI 스피크</div>
        </a> */}
        <a href={SITE_PATH.CATALOG.PBOOK_QUIZ}>
            <div className={`${style.nav_item} ${pathname.indexOf(SITE_PATH.CATALOG.PBOOK_QUIZ) != -1 && style.active}`}>영어 원서 북퀴즈</div>    
        </a>
        <a href={SITE_PATH.CATALOG.LEVEL_MASTER}>
            <div className={`${style.nav_item} ${pathname.indexOf(SITE_PATH.CATALOG.LEVEL_MASTER) != -1 && style.active}`}>레벨 마스터</div>
        </a>
    </div>
  )
}