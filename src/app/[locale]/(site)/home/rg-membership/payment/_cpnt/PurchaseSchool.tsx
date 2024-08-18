'use client'

import { useCustomerInfo } from '@/app/_context/CustomerContext'
import RgFormat from '@/app/rgformat'
import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'
import { useUnpaidBalanceList } from '@/client/store/payment/purchase/hook'
import { useFetchReloadStudentStudyState } from '@/client/store/student/info/hook'
import {
  useStudentInfo,
  useStudentStudyable,
} from '@/client/store/student/info/selector'
import { UnpaidBalance } from '@/repository/client/object/unpaid-balance'
import { useScreenMode, useStyle } from '@/ui/context/StyleContext'
import PayRequestModal from './PayRequestSchoolModal'

const STYLE_ID = 'page_purchase_school'

const PAY_TYPE = ['vcard', 'directbank', 'vbank']

export default function PurchaseSchool() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const isMobile = useScreenMode() === 'mobile'

  const studentId = useStudentInfo().studentId
  const customerId = useCustomerInfo().customerId
  const { isStudyEnd } = useStudentStudyable()

  const { loading, error, payload } = useUnpaidBalanceList()
  const { loading: reloadStudentStudyLoading, fetch: reloadStudentStudy } =
    useFetchReloadStudentStudyState()

  const [selectPayTarget, setSelectPayTarget] = useState<
    UnpaidBalance | undefined
  >(undefined)

  const onBuyClick = (itemId: string, payMethod: string) => {
    const item = payload?.filter((p) => p.requestId === itemId)
    if (item && item.length > 0) {
      const name = item[0].requestTypeName
      const price = item[0].fee
      const param = {
        customerId,
        studentId,
        payMethod,
        name,
        price,
        mobileYn: isMobile ? 'Y' : 'N',
      }
      //TODO -- 결제 연동 시 전송할 데이터 생성
      // 직렬화
      const serialize = encodeURIComponent(
        btoa(encodeURIComponent(JSON.stringify(param))),
      )
      console.log(param, serialize)
      // 객체화
      const deserialize = decodeURIComponent(
        atob(decodeURIComponent(serialize)),
      )
      console.log(deserialize, JSON.parse(deserialize))

      // 결제가 완료되면... reloadStudent(), useFetchStudentHistory() 호출
      // 무통장 입금 인 경우,, 정보 수신해야 함.
    }
  }

  const onCloseClick = () => {
    setSelectPayTarget(undefined)
  }

  return (
    <>
      <div className={style.purchase_school}>
        <div className={style.t_header}>
          <div className={style.th_item}>내역</div>
          <div className={style.th_item}>반명</div>
          <div className={style.th_item}>결제 금액</div>
          <div className={style.th_item}>납입 기한</div>
          <div className={style.th_item}></div>
        </div>
        <div className={style.t_body}>
          {!loading &&
            payload &&
            payload.length > 0 &&
            payload.map((unpaid) => {
              return (
                <div className={style.tr} key={unpaid.requestId}>
                  <div className={style.td_item}>{unpaid.requestTypeName}</div>
                  <div className={style.td_item}>{unpaid.className}</div>
                  <div className={style.td_item}>
                    {RgFormat.toNumberMoneyString(unpaid.fee, 'KRW')}
                  </div>
                  <div className={style.td_item}>{unpaid.startDate}</div>
                  <div className={style.td_item}>
                    <div className={style.payment_form}>
                      <div
                        className={style.btn_link}
                        onClick={() => setSelectPayTarget(unpaid)}>
                        결제
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

          {/* 구매 내역이 없는 경우 나오는 메세지 */}
          {!loading && payload && payload.length === 0 && (
            <div className={style.empty_message}>미납 내역이 없습니다.</div>
          )}

          {!loading && isStudyEnd && (
            <div className={style.empty_message}>
              미납으로 학습이 제한 되었습니다. 결제 후 이용해주세요.
            </div>
          )}
        </div>
      </div>
      {/* 이니시스 실행전 모달 */}
      {selectPayTarget && (
        <PayRequestModal
          STYLE_ID={STYLE_ID}
          PAY_TYPE={PAY_TYPE}
          selectItem={selectPayTarget}
          onCloseClick={onCloseClick}
          onBuyClick={onBuyClick}
        />
      )}

      {/* {selectPayTarget && (
        <PaymentVBankResponseModal onCloseClick={onCloseClick} />
      )} */}
    </>
  )
}
