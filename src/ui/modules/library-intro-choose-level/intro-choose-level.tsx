'use client'

import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import { goToLevelTest } from '@/app/_function/study-start'

const STYLE_ID = 'intro_choose_level'

// 단계선택 콘테이너
export function IntroChooseLevel({
  onChooseLevel,
}: {
  onChooseLevel?: (level: string) => void
}) {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const [selectedLevel, setSelectedLevel] = useState<
    'PK' | 'KA' | '1A' | '2A' | undefined
  >(undefined)

  const onToggleCard = (level: 'PK' | 'KA' | '1A' | '2A') => {
    if (selectedLevel !== level) {
      setSelectedLevel(level)
    } else {
      setSelectedLevel(undefined)
    }
  }

  const onStartLevelTest = () => {
    goToLevelTest()
  }

  return (
    <div className={style.intro_choose_level}>
      <div
        className={`container compact ${style.intro_choose_level_container}`}>
        <div className={style.header}>
          <div className={style.txt_h}>🎯 학습 레벨을 선택하세요.</div>
          {/* <div className={style.txt_h}>{t('t517')}</div> */}
          {/* <div className={style.txt_p}>{t('t518')}</div> */}
        </div>
        <div className={style.row_1}>
          <div className={style.txt_1}>선택1. 레벨테스트 보기</div>
          <div className={style.txt_2}>레벨테스트 결과가 학습 레벨로 설정됩니다. 학습 레벨은 언제든 변경할 수 있습니다.</div>
        </div>
        <div className={style.level_test_button}>
          <Button color={'red'} shadow onClick={onStartLevelTest}>레벨테스트 시작</Button>
        </div>
        <div className={style.line}>
          <div className={style.txt_box}>OR</div>
        </div>
        <div className={style.row_2}>
          <div className={style.txt_1}>선택2. 레벨 직접 선택하기</div>
          <div className={style.txt_2}>학년에 상관없이 학습하기 쉬워 보이는 레벨을 선택해 주세요. 선택한 학습 레벨은 언제든 변경할 수 있습니다.</div>
        </div>
        <div className={style.body}>
          <IntroChooseItem
            bgColor="#704ea6"
            label="PreK (DODO ABC)"
            // title={t('t482')}
            // detail={t('t519')}
            title={'기초 영어 | 미취학'}
            detail={'Alphabet, Phonics, Sight Words 등의 학습을 통해 영어의 소리와 규칙, 패턴 등을 익히는 단계입니다.'}
            symbolImgSrc="/src/images/@intro-choose-level/img_prek.png"
            onCardClick={() => {
              onToggleCard('PK')
            }}
            onStartClick={() => {
              onChooseLevel && onChooseLevel('PK')
            }}
            active={selectedLevel === 'PK'}
          />
          <IntroChooseItem
            bgColor="#f6993b"
            label="Level K"
            // title={t('t520')}
            // detail={t('t521')}
            title={'기초 리딩 | 초등 저학년'}
            detail={'일상과 관련된 주제의 반복적인 노출을 통해 기본 어휘와 짧은 스토리를 이해하는 단계입니다.'}
            symbolImgSrc="/src/images/@intro-choose-level/img_k.png"
            onCardClick={() => {
              onToggleCard('KA')
            }}
            onStartClick={() => {
              onChooseLevel && onChooseLevel('KA')
            }}
            active={selectedLevel === 'KA'}
          />
          <IntroChooseItem
            bgColor="#e35f33"
            label="Level 1"
            // title={t('t522')}
            // detail={t('t523')}
            title={'기본 리딩 | 초등 고학년'}
            detail={'다양한 주제와 장르를 다루며, 문장이 문단으로 확대되어 읽기 능력이 향상되는 단계입니다.'}
            symbolImgSrc="/src/images/@intro-choose-level/img_1.png"
            onCardClick={() => {
              onToggleCard('1A')
            }}
            onStartClick={() => {
              onChooseLevel && onChooseLevel('1A')
            }}
            active={selectedLevel === '1A'}
          />
          <IntroChooseItem
            bgColor="#4eba60"
            label="Level 2"
            // title={t('t524')}
            // detail={t('t525')}
            title={'심화 리딩 | 중등 이상'}
            detail={'어휘의 볼륨이 증가하며 다양한 시제를 포함하는 문장 패턴을 익히는 독립적인 읽기가 가능한 단계입니다.'}
            symbolImgSrc="/src/images/@intro-choose-level/img_2.png"
            onCardClick={() => {
              onToggleCard('2A')
            }}
            onStartClick={() => {
              onChooseLevel && onChooseLevel('2A')
            }}
            active={selectedLevel === '2A'}
          />
        </div>
      </div>
    </div>
  )
}

// 단계선택 아이템
export function IntroChooseItem({
  bgColor,
  label,
  title,
  detail,
  symbolImgSrc,
  active,
  onCardClick,
  onStartClick,
}: {
  bgColor?: string
  label?: string
  title?: string
  detail?: string
  symbolImgSrc: string
  active?: boolean
  onCardClick?: () => void
  onStartClick?: () => void
}) {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <>
      <div
        style={{ backgroundColor: bgColor }}
        className={`${style.intro_choose_item}`}
        onClick={onCardClick}>
        <div className={style.exp}>
          <div className={style.txt_l}>{label}</div>
          <div className={style.txt_h}>{title}</div>
          <div className={style.txt_p}>{detail}</div>
        </div>
        <div className={style.choose_box}>
          <Image
            alt={''}
            src={symbolImgSrc}
            width={300}
            height={200}
            style={{ width: '100%', height: '100%' }}
          />
          <Button color={'red'} shadow onClick={onStartClick}>
            {t('t339')}
          </Button>
        </div>
      </div>
    </>
  )
}
