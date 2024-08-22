'use client'

import { useSiteBlueprint } from '@/app/_context/CustomerContext'
import SITE_PATH from '@/app/site-path'
import { useRouter } from 'next/navigation'
import { useOnLoadMain } from '@/client/store/home/hook'
import { useStudentIsLogin } from '@/client/store/student/info/selector'
import { Margin } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import {
  RgNewsCardBasic,
  RgNewsCardCampaign,
  RgNewsCardInfographic,
  RgNewsCardNewsLetter,
  RgNewsContainer,
} from '@/ui/modules/home-main-components/HomeMainRgNews'
import {
  AdBannerType1,
  AdBannerType2,
  AdBannersGroup,
} from '@/ui/modules/home-main-components/home-main-ad-banners'
import LogIn from '@/ui/modules/home-main-components/home-main-log-in'
import MainBanner from '@/ui/modules/home-main-components/home-main-main-banner'
import {
  RgPostContainer,
  RgPostItem,
} from '@/ui/modules/home-main-components/home-main-rg-post'
import { useEffect, useState } from 'react'

const STYLE_ID = 'page_main'

export default function Main() {
  const style = useStyle(STYLE_ID)

  // PWA 설치 메세지 띄우기 -->
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    };
  }, []);

  useEffect(() => {
    const handleAppInstalled = () => {
      console.log('PWA installed');
      setIsInstallable(false);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      const promptEvent = deferredPrompt as WindowEventMap['beforeinstallprompt'];
      promptEvent.prompt();
      const choiceResult = await promptEvent.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }

      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };
  // <-- PWA 설치 메세지 띄우기

  const { payload: mainData } = useOnLoadMain()
  const { main } = useSiteBlueprint()

  const router = useRouter()

  const isLogin = useStudentIsLogin()
  const onClickMainLoginButton = () => {
    if (isLogin) {
      router.push(SITE_PATH.LIBRARY.HOME)
    } else {
      router.push(SITE_PATH.ACCOUNT.MAIN)
    }
  }
  if (!mainData) {
    return <div></div>
  }
  return (
    <main className={`${style.home_news} container`}>
      {mainData.slide.length > 0 && (
        <div className={style.item1}>
          <MainBanner banner={mainData.slide} />
        </div>
      )}
      <div className={style.item2}>
        {mainData.board.length > 0 && (
          <RgNewsContainer>
            {mainData.board.map((banner) => {
              if (banner.template === 'infographic') {
                return (
                  <RgNewsCardInfographic
                    key={banner.link}
                    title={banner.title}
                    summary={banner.summary}
                    date={banner.date}
                    href={banner.link}
                    target={banner.self ? '' : '_blank'}
                  />
                )
              } else if (banner.template === 'newsletter') {
                return (
                  <RgNewsCardNewsLetter
                    key={banner.link}
                    title={banner.title}
                    summary={banner.summary}
                    date={banner.date}
                    href={banner.link}
                    target={banner.self ? '' : '_blank'}
                  />
                )
              } else if (banner.template === 'campaign') {
                return (
                  <RgNewsCardCampaign
                    key={banner.link}
                    title={banner.title}
                    summary={banner.summary}
                    date={banner.date}
                    href={banner.link}
                    target={banner.self ? '' : '_blank'}
                  />
                )
              } else {
                return (
                  <RgNewsCardBasic
                    key={banner.link}
                    title={banner.title}
                    summary={banner.summary}
                    date={banner.date}
                    href={banner.link}
                    target={banner.self ? '' : '_blank'}
                  />
                )
              }
            })}
          </RgNewsContainer>
        )}
      </div>
      <div className={style.item3}>
        <LogIn isLogin={isLogin} onClick={onClickMainLoginButton} />
      </div>
      <div className={style.item4}>
        <AdBannersGroup>
          {/* 하이도도 베너 */}
          {main.isHidodoBanner && mainData.adImageBanner.length > 0 && (
            <>
              <Margin height={10} />
              {isInstallable && (
                <>
                  <div onClick={() => {handleInstallClick()}}>
                    <AdBannerType1
                      title={''}
                      href={""}
                      imgSrc={"/src/images/@home/img_pwa_install.png"}
                      width={640}
                      height={640}
                    />
                  </div>
                </>
              )}
              {mainData.adImageBanner.map((banner) => {
                return (
                  <AdBannerType1
                    key={banner.image}
                    title={banner.title}
                    href={banner.link}
                    bgColor={banner.backgroundColor}
                    target={banner.self ? '' : '_blank'}
                    imgSrc={banner.image}
                    width={banner.width}
                    height={banner.height}
                  />
                )
              })}
            </>
          )}
          {mainData.adBanner.length > 0 && (
            <>
              <Margin height={10} />
              {mainData.adBanner.map((banner) => {
                return (
                  <AdBannerType2
                    key={banner.link}
                    bgColor={banner.backgroundColor}
                    txt1={banner.title}
                    txt2={banner.subtitle}
                    imgSrc={banner.image}
                    href={banner.link}
                    target={banner.self ? '' : '_blank'}
                  />
                )
              })}
            </>
          )}
        </AdBannersGroup>
      </div>
      {main.isSotialRgPost && mainData.social.length > 0 && (
        <div className={style.item5}>
          <RgPostContainer>
            {mainData.social.map((banner) => {
              return (
                <RgPostItem
                  key={banner.image}
                  imgSrc={banner.image}
                  href={banner.link}
                />
              )
            })}
          </RgPostContainer>
        </div>
      )}
    </main>
  )
}
