'use client'

import { useSiteBlueprint } from '@/app/_context/CustomerContext'
import { useDevicePlatform } from '@/app/_context/DeviceContext'
import { useStudentStudyable } from '@/client/store/student/info/selector'
import Purchase from '../_cpnt/Purchase'
import PurchaseSchool from '../_cpnt/PurchaseSchool'

export default function Page() {
  const { target, country, isPaymentable } = useSiteBlueprint()
  const { value: studyState } = useStudentStudyable()
  const platform = useDevicePlatform()

  if (studyState === 'PAUSED') {
    return <div>{'학습 일시중지 중에는 이용권을 구매할 수 없습니다.'}</div>
  }

  if (isPaymentable && platform !== 'unknown') {
    if (target.private) {
      let purchaseType: 'direct' | 'directvn' | 'android' | 'ios' = 'direct'
      let isChangeUserInfo = country.korea
      if (platform === 'android' || platform === 'ios') {
        purchaseType = platform
      } else if (country.vietnam) {
        purchaseType = 'directvn'
      }
      return (
        <Purchase
          purchaseType={purchaseType}
          isChangeUserInfo={isChangeUserInfo}
        />
      )
    } else if (target.school || target.academy) {
      //TODO -- 학교용 데이터
      return <PurchaseSchool />
    }
  }
  return <>{`Not accessible.`}</>
}
