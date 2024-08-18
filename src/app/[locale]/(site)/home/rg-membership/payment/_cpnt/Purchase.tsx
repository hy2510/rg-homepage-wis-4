'use client'

import { useCustomerInfo } from '@/app/_context/CustomerContext'
import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'
import { useOnLoadProductList } from '@/client/store/payment/purchase/hook'
import { useFetchReloadStudentStudyState } from '@/client/store/student/info/hook'
import { useStudentInfo } from '@/client/store/student/info/selector'
import { useScreenMode, useStyle } from '@/ui/context/StyleContext'
import BillPaper from './BillPaper'
import PayMethodList from './PayMethod'
import PayerInfo from './PayerInfo'
import PaymentStudentInfo from './PaymentStudentInfo'
import ProductCardList from './ProductCard'

const STYLE_ID = 'page_purchase'

export default function Purchase({
  purchaseType,
  isChangeUserInfo = false,
}: {
  purchaseType: 'direct' | 'directvn' | 'ios' | 'android'
  isChangeUserInfo?: boolean
}) {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const isMobile = useScreenMode() === 'mobile'

  const studentId = useStudentInfo().studentId
  const customerId = useCustomerInfo().customerId

  const { loading, error, payload } = useOnLoadProductList(purchaseType)
  const { loading: reloadStudentStudyLoading, fetch: reloadStudentStudy } =
    useFetchReloadStudentStudyState()

  const [selectItem, setSelectItem] = useState<string | undefined>(undefined)
  const [payMethod, setPayMethod] = useState<string | undefined>(undefined)
  const [isPolicyAgree, setPolicyAgree] = useState(!isChangeUserInfo)

  const onProductClick = (itemId: string) => {
    setSelectItem(itemId)
  }

  const onPaymethodClick = (payMethod: string) => {
    setPayMethod(payMethod)
  }

  const onBuyClick = () => {
    if (!targetProduct) {
      alert('구매하실 이용권을 선택해주세요.')
      return
    }
    if (!isPolicyAgree) {
      alert('결제를 진행하기 위해서는 개인정보 수집에 동의하셔야 합니다.')
      return
    }
    if (!payMethod) {
      alert('결제 수단을 선택해주세요.')
      return
    }

    if (targetProduct) {
      const name = targetProduct.name
      const price = targetProduct.totalFee
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

  if (loading) {
    return <div></div>
  }
  const filteredItem = payload?.product?.filter(
    (item) => item.id === selectItem,
  )
  const currency = payload?.currency || 'KRW'
  const targetProduct =
    filteredItem && filteredItem.length > 0 ? filteredItem[0] : undefined

  return (
    <div className={style.purchase}>
      <PaymentStudentInfo STYLE_ID={STYLE_ID} />
      <div className={style.page_container}>
        <div className={style.col_left}>
          <ProductCardList
            STYLE_ID={STYLE_ID}
            currency={currency}
            product={payload?.product}
            activeId={selectItem}
            onProductClick={onProductClick}
          />
          <PayerInfo
            STYLE_ID={STYLE_ID}
            isChangeUserInfo={isChangeUserInfo}
            onPolicyAgreeChange={(checked) => {
              setPolicyAgree(checked)
            }}
          />
          {purchaseType !== 'android' && purchaseType !== 'ios' && (
            <PayMethodList
              STYLE_ID={STYLE_ID}
              methodList={payload?.payType}
              activeMethod={payMethod}
              onPayMethodClick={onPaymethodClick}
            />
          )}
        </div>
        <div className={style.col_right}>
          <BillPaper
            STYLE_ID={STYLE_ID}
            currency={currency}
            product={targetProduct}
            active={!!targetProduct && isPolicyAgree && !!payMethod}
            onBuyClick={onBuyClick}
          />
        </div>
      </div>
    </div>
  )
}
