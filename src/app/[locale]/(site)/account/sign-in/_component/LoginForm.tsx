'use client'

import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { ReactNode } from 'react'
import { useStyle } from '@/ui/context/StyleContext'
import { ChooseLanguage, Margin } from '@/ui/common/common-components'

const STYLE_ID = 'page_sign_in'

export default function LoginForm({ children }: { children?: ReactNode }) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  return (
    <main className={style.sign_in}>
      <ChooseLanguage langguage={'eng'} />
      <Margin height={20} />
      <div className={style.catchphrase}>
        <div className={style.brand_name}>{t('t206')}</div>
        <div className={style.sentence}>{t('t207')}</div>
      </div>
      {/* <div className={style.log_in_box}>{children}</div> */}
      {children}
      <div className={style.link}>
        <Link href="/account/account-list">{t('t256')}</Link>
      </div>
    </main>
  )
}
