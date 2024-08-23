'use client'

import { useSiteBlueprint } from '@/app/_context/CustomerContext'
import SITE_PATH, { CUSTOMER_CENTER_URL } from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import {
  useStudentInfo,
  useStudentIsLogin,
  useStudentStudyable,
} from '@/client/store/student/info/selector'
import { AlertBar } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_home'

export default function Layout({ children }: { children?: ReactNode }) {
  // @Language 'common'
  const { t } = useTranslation()

  const style = useStyle(STYLE_ID)

  const pathname = usePathname()
  const connectMainRgNews = pathname.indexOf('/rg-news') != -1

  const HomeNavItem = ({
    name,
    href,
    target,
    active,
    onClick,
  }: {
    name: string
    href: string
    target?: string
    active?: boolean
    onClick?: () => void
  }) => {
    return (
      <Link href={href} target={target ? target : '_self'} onClick={onClick}>
        <div className={`${style.home_nav_item} ${active ? style.active : ''}`}>
          {name}
        </div>
      </Link>
    )
  }

  const HomeNavBar = ({
    isDisableMembership,
  }: {
    isDisableMembership?: boolean
  }) => {
    return (
      <div className={`${style.home_nav_bar}`}>
        {/* 공통 */}
        <HomeNavItem
          name={t('t317')}
          href={SITE_PATH.HOME.MAIN}
          active={pathname.indexOf(SITE_PATH.HOME.MAIN) !== -1}
        />

        {/* 학교, 학원 - 소개 */}
        <HomeNavItem
          name={'소개'}
          href={SITE_PATH.HOME.ABOUT_TO_SCHOOL}
          active={pathname.indexOf(SITE_PATH.HOME.ABOUT_TO_SCHOOL) !== -1}
        />

        {/* 개인, 학교 - 활용수기 */}
        <HomeNavItem
          name={t('t319')}
          href={SITE_PATH.HOME.CUSTOMER_INTERVIEW}
          active={pathname.indexOf(SITE_PATH.HOME.CUSTOMER_INTERVIEW) !== -1}
        />

        {/* 개인, 학교 - 명예의전당 게시판 */}
        {/* <HomeNavItem
          name={t('t318')}
          href={'hall-of-fame'}
          active={connectHallOfFame}
        /> */}

        {/* 개인 - RG멤버십 */}
        {!isDisableMembership && (
          <HomeNavItem
            name={t('t320')}
            href={SITE_PATH.HOME.MEMBERSHIP_INTRODUCE}
            active={pathname.indexOf('/rg-membership') !== -1}
          />
        )}

        {/* 개인 - 이용안내 */}
        <HomeNavItem
          name={'이용안내'}
          href={SITE_PATH.HOME.USER_GUIDE_PERSONAL}
          active={pathname.indexOf(SITE_PATH.HOME.USER_GUIDE_PERSONAL) !== -1}
        />

        {/* 학교, 학원 - 이용안내 */}
        <HomeNavItem
          name={'이용안내'}
          href={SITE_PATH.HOME.USER_GUIDE_GROUP}
          active={pathname.indexOf(SITE_PATH.HOME.USER_GUIDE_GROUP) !== -1}
        />

        {/* 공통 - 고객지원 */}
        <HomeNavItem
          name={t('t321')}
          href={CUSTOMER_CENTER_URL}
          active={false}
          target={'_blank'}
        />
      </div>
    )
  }

  const isLogin = useStudentIsLogin()
  const { studyEndDay } = useStudentInfo()
  const {
    isStudyEnd,
    studyEndMessage,
    value: studyState,
  } = useStudentStudyable()
  const { isShowStudyEndInform: isOnStudyEndInform, isPaymentable } =
    useSiteBlueprint()

  let paymentMessage = ''
  if (isStudyEnd) {
    if (studyState === 'NEED_PAYMENT' || studyState === 'PAUSED') {
      paymentMessage = studyEndMessage
    } else {
      paymentMessage = t('t322')
    }
  } else if (isOnStudyEndInform && studyEndDay <= 7) {
    paymentMessage = t('t323', { num: studyEndDay })
  }

  return (
    <>
      <div className={style.home}>
        <div className="container" style={{ paddingBottom: 0, paddingTop: 0 }}>
          {isLogin && paymentMessage && (
            <>
              <div style={{paddingTop: '15px',}}></div>
              <AlertBar>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    color: 'red',
                  }}>
                  <div>{paymentMessage}</div>
                  {studyState === 'NEED_PAYMENT' && isPaymentable && (
                    <div>
                      <Link href={SITE_PATH.HOME.MEMBERSHIP_PAYMENT}>
                        <b>{t('t193')}</b>
                      </Link>
                    </div>
                  )}
                  {studyState === 'PAUSED' && (
                    <div>
                      <Link href={SITE_PATH.ACCOUNT.INFO}>
                        <b>{'일시중지 해제'}</b>
                      </Link>
                    </div>
                  )}
                </div>
              </AlertBar>
            </>
          )}
        </div>
        {connectMainRgNews ? (
          <></>
        ) : (
          <HomeNavBar isDisableMembership={!isPaymentable} />
        )}
        {children}
      </div>
      <div className={style.chatbot_area}>
        <div className={style.chat_icon} style={{backgroundImage: `url('/src/images/@chatbot-icon/kakao_channer_talk_icon.png')`}}></div>
        <div className={style.chat_icon} style={{backgroundImage: `url('/src/images/@chatbot-icon/chatbot_icon_pri3.png')`}}></div>
        <div className={style.chat_icon} style={{backgroundImage: `url('/src/images/@chatbot-icon/chatbot_icon_pri.png')`}}></div>
      </div>
    </>
  )
}
