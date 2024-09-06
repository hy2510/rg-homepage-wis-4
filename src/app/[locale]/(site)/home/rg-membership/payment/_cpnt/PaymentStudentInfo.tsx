'use client'

import useTranslation from '@/localization/client/useTranslations'
import { useStudentInfo } from '@/client/store/student/info/selector'
import { useStyle } from '@/ui/context/StyleContext'

export default function PaymentStudentInfo({ STYLE_ID }: { STYLE_ID: string }) {
  // @Language 'common'
  const { t } = useTranslation()

  const style = useStyle(STYLE_ID)

  const student = useStudentInfo()

  return (
    <div className={style.user_info_bar}>
      <div className={style.user_name}>{student.name}</div>
      <div className={style.period}>남은 학습기간 {student.studyEndDay}일</div>
      {student.studyEndDay > 0 && (
        <div className={style.end_date}>{student.studyEndDate}에 종료</div>
      )}
    </div>
  )
}
