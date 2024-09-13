'use client'

import { useStyle } from '@/ui/context/StyleContext'
import Image from 'next/image'
import React, { useState } from 'react'
import SubPageNavBar from '../_cpnt/SubPageNavBar'
import { Margin } from '@/ui/common/common-components'
import SubPageMainBanner from '../_cpnt/SubPageMainBanner'
import SubPageContain from '../_cpnt/SubPageContain'
import SubPageHeader from '../_cpnt/SubPageHeader'
import Student from '@/repository/server/student'

const STYLE_ID = 'page_catalog'

export default function Page() {
  const style = useStyle(STYLE_ID)

  const subPageContainData = [
    {
      imgSrc: '/src/images/@about/@dodo-abc/row1_alphabet.gif',
      title: '알파벳',
      exp: '도도와 다락방의 친구들 애니메이션을 보며, 알파벳 26개 대소문자를 구분하고 음가와 단어를 배웁니다. 재미있는 에피소드 영상과 함께 게임 형식을 단계별 액티비티를 통한 알파벳을 학습해 보세요.',
    },
    {
      imgSrc: '/src/images/@about/@dodo-abc/row2_phonics.gif',
      title: '파닉스',
      exp: '도도와 별의별 잡화점, 숲 속 친구들 애니메이션을 통해 50개의 음가를 배웁니다. 게임 형식의 단계별 액티비티를 통해 파닉스를 학습해 보세요.',
    },
    {
      imgSrc: '/src/images/@about/@dodo-abc/row3_sight_words.gif',
      title: '사이트 워드',
      exp: '도도와 친구들 애니메이션을 보며, 사이트워드와 패턴 문장을 배웁니다. 재미있는 에피소드 영상과 함께 사이트워드를 이용한 초등 교과 과정의 패턴 문장을 학습해 보세요.',
    },
    {
      imgSrc: '/src/images/@about/@dodo-abc/row4_song_n_chant.gif',
      title: '송 & 챈트',
      exp: '도도와 친구들이 부르는 신나는 노래도 듣고, 직접 녹음도 해보는 흥미 유발 콘텐츠입니다.',
    },
    {
      imgSrc: '/src/images/@about/@dodo-abc/row5_game.gif',
      title: '게임',
      exp: '재미있는 게임도 하고, 단어도 외우는 일석이조의 효과를 경험할 수 있습니다.',
    },
  ]

  return (
    <div className={style.catalog}>
      <div className={style.global_header_bg} style={{zIndex: 1}}></div>
      <div className={style.sub_page_bg}>
        <div className={`${style.sub_page}`}>
          <SubPageNavBar />
          <SubPageHeader titleCol1='레벨 마스터' titleCol2='시스템' exp={`리딩게이트를 이용하는 수많은 학습자가 방대한 학습 도서 중에서 헤매지 않고 체계적으로 학습할 수 있는 비결은 바로 ‘레벨 마스터 시스템’에 있습니다. 레벨 테스트를 통해 또는 직접 학습 레벨을 선택하면 자동으로 ‘레벨 마스터 목표’가 설정되며, 목표 달성을 위해 추천된 학습 도서를 읽고 문제를 풀기만 하면 됩니다.`} />
          <div>
            <SubPageMainBanner imgSrc='/src/images/@about/@level-master/level_master_main_banner.svg' />
            <div className={`${style.sub_page_contain} ${style.compact}`}>
              <div className={style.level_master_row1}>
                <div className={style.title}>레벨 체계</div>
                <div className={style.exp}>리딩게이트의 레벨은 미국 Pre-K부터 6th Grade 수준의 영어 실력을 기준으로 설정되었습니다.</div>
                <div className={style.table_image}>
                  <Image src={'/src/images/@about/@level-master/roadmap.svg'} width={1024} height={200} alt='' />
                </div>
              </div>
              <div className={style.level_master_row2}>
                <div className={style.level_master_col}>
                  <div className={style.thumbnail}><Image src={'/src/images/@about/@level-master/point.png'} width={480} height={305} alt='' /></div>
                  <div className={style.text_group}>
                    <div className={style.title}>편의 기능: 레벨 마스터 진행율 확인</div>
                    <div className={style.exp}>각 레벨별 레벨 마스터 목표 달성을 위한 학습 진행률을 실시간으로 확인하며 학습할 수 있습니다.</div>
                  </div>
                </div>
                <div className={style.level_master_col}>
                  <div className={style.thumbnail}><Image src={'/src/images/@about/@level-master/certificate.png'} width={480} height={305} alt='' /></div>
                  <div className={style.text_group}>
                    <div className={style.title}>보상 및 관리: 레벨 마스터 인증서 출력</div>
                    <div className={style.exp}>레벨 마스터를 달성하면 인증서(상장)를 출력할 수 있습니다.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Margin height={50} />
      </div>
    </div>
  )
}