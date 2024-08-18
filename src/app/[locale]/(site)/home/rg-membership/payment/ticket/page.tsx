'use client'

import { useStudentStudyable } from '@/client/store/student/info/selector'
import Ticket from '../_cpnt/Ticket'

export default function Page() {
  const { value: studyState } = useStudentStudyable()

  if (studyState === 'PAUSED') {
    return <div>{'학습 일시중지 중에는 티켓등록을 할 수 없습니다.'}</div>
  }
  return <Ticket />
}
