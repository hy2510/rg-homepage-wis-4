'use client'

import useTranslation from '@/localization/client/useTranslations'
import React from 'react'
import { useStyle } from '@/ui/context/StyleContext'
import Image from 'next/image'

const STYLE_ID = 'page_about_to_school'

export default function Page() {
  // @Language 'common'
  const { t } = useTranslation()

  const style = useStyle(STYLE_ID)

  return (
    <main className={`container ${style.about_to_school}`}>
      <div className={style.contents_box}>
        소개
        <Section01 />
        <Section02 />
        <Section03 />
        <Section04 />
        <Section05 />
        <Section06 />
        <Section07 />
      </div>
    </main>
  )
}

const Section01 = () => {
  return (
    <></>
  )
}

const Section02 = () => {
  return (
    <></>
  )
}

const Section03 = () => {
  return (
    <></>
  )
}

const Section04 = () => {
  return (
    <></>
  )
}

const Section05 = () => {
  return (
    <></>
  )
}

const Section06 = () => {
  return (
    <></>
  )
}

const Section07 = () => {
  return (
    <></>
  )
}