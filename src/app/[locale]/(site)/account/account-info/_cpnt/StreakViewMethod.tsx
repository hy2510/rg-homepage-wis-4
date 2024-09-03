'use client'

import useTranslation from '@/localization/client/useTranslations'
import { CheckBox } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_account_info'

export default function StreakViewMethod() {
  // @language 'common'
  const { t } = useTranslation()
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.streak_view_method}>
      <div className={style.txt_1}>
        <CheckBox check={true} />연속학습 어워드 보기</div>
      <div className={style.txt_2}>보기를 선택하면 20일 단위로 획득한 연속 학습 어워드와 누적 기록을 확인할 수 있습니다. 선택하지 않으면 어워드와 누적 기록은 표시되지 않고, 현재 진행중인 실제 연속 학습 일수만 표시됩니다.</div>
    </div>
  )
}
