'use client'

import { useStyle } from '@/ui/context/StyleContext'
import Image from 'next/image'
import React, { useState } from 'react'
import SubPageNavBar from '../_cpnt/SubPageNavBar'
import { Margin } from '@/ui/common/common-components'
import SubPageMainBanner from '../_cpnt/SubPageMainBanner'
import SubPageContain from '../_cpnt/SubPageContain'
import SubPageHeader from '../_cpnt/SubPageHeader'
import SubPageContainPbookQuiz from '../_cpnt/SubPageContainPbookQuiz'

const STYLE_ID = 'page_catalog'

export default function Page() {
  const style = useStyle(STYLE_ID)

  const subPageContainData = [
    {
      title: 'Level K',
      step: [
        {
          name: 'STEP01 듣기 평가',
          imgSrc: '/src/images/@about/@pbook-quiz/row1_k_step01.png',
          exp1: 'Listening Activity',
          exp2: '(소리를 듣고 알맞은 그림을 고르기)',
        },
        {
          name: 'STEP02 단어 평가',
          imgSrc: '/src/images/@about/@pbook-quiz/row1_k_step02.png',
          exp1: 'Vocabulray Test',
          exp2: '(그림을 보고 올바른 단어를 고르기)',
        },
        {
          name: 'STEP03 이해력 평가',
          imgSrc: '/src/images/@about/@pbook-quiz/row1_k_step03.png',
          exp1: 'Reading Comprehension',
          exp2: '(질문에 맞는 알맞은 그림을 고르기)',
        },
        {
          name: 'STEP04 문장 만들기',
          imgSrc: '/src/images/@about/@pbook-quiz/row1_k_step04.png',
          exp1: 'Writing Activity',
          exp2: '(카드를 보고 순서대로 나열하기)',
        },
      ],
    },
    {
      title: 'Level 1',
      step: [
        {
          name: 'STEP01 듣기 평가',
          imgSrc: '/src/images/@about/@pbook-quiz/row2_1_step01.png',
          exp1: 'Listening Activity',
          exp2: '(그림을 보고 올바른 답을 고르기)',
        },
        {
          name: 'STEP02 단어 평가',
          imgSrc: '/src/images/@about/@pbook-quiz/row2_1_step02.png',
          exp1: 'Vocabulray Test',
          exp2: '(그림과 문장을 보고 올바른 단어를 고르기)',
        },
        {
          name: 'STEP03 이해력 평가',
          imgSrc: '/src/images/@about/@pbook-quiz/row2_1_step03.png',
          exp1: 'Reading Comprehension',
          exp2: '(질문에 맞는 알맞은 답을 고르기)',
        },
        {
          name: 'STEP04 서머리 평가',
          imgSrc: '/src/images/@about/@pbook-quiz/row2_1_step04.png',
          exp1: 'Summary Test',
          exp2: '(책 내용의 흐름에 맞게 문장을 나열하기)',
        },
        {
          name: 'STEP05 문장 만들기',
          imgSrc: '/src/images/@about/@pbook-quiz/row2_1_step05.png',
          exp1: 'Writing Activity',
          exp2: '(카드를 보고 올바른 순서대로 나열하기)',
        },
      ],
    },
    {
      title: 'Level 2~6',
      step: [
        {
          name: 'STEP01 이해력 평가',
          imgSrc: '/src/images/@about/@pbook-quiz/row3_2_step01.png',
          exp1: 'Reading Comprehension',
          exp2: '(질문에 맞는 알맞은 답을 고르기)',
        },
        {
          name: 'STEP02 단어 평가',
          imgSrc: '/src/images/@about/@pbook-quiz/row3_2_step02.png',
          exp1: 'Vocabulray Test',
          exp2: '(단어의 뜻을 보고 단어를 입력하기)',
        },
        {
          name: 'STEP03 서머리 평가',
          imgSrc: '/src/images/@about/@pbook-quiz/row3_2_step03_1.png',
          exp1: 'Summary Test',
          exp2: '(책 내용의 흐름에 맞춰 문장을 나열하기)',
        },
        {
          name: 'STEP05 빈칸 채우기',
          imgSrc: '/src/images/@about/@pbook-quiz/row3_2_step04.png',
          exp1: 'Cloze Test',
          exp2: '(문장을 보고 빈칸에 알맞은 답을 채우기)',
        },
      ],
    },
  ]

  return (
    <div className={style.catalog}>
      <div className={style.global_header_bg} style={{zIndex: 1}}></div>
      <div className={style.sub_page_bg}>
        <div className={`${style.sub_page}`}>
          <SubPageNavBar />
          <SubPageHeader titleCol1='영어 원서' titleCol2='북퀴즈' exp='학습 도서를 읽고 책의 내용을 제대로 이해했는지 셀프 테스트할 수 있는 독서 이해도 평가 퀴즈를 제공합니다. 이북 퀴즈 3,000여 세트와 종이책 퀴즈(해외 유명 원서) 3,000여 세트를 포함하고 있습니다.' />
          <div>
            <SubPageMainBanner imgSrc='/src/images/@about/@pbook-quiz/pbook_quiz_main_banner.svg' />
            <SubPageContainPbookQuiz subPageContainData={subPageContainData} />
          </div>
        </div>
        <Margin height={50} />
      </div>
    </div>
  )
}