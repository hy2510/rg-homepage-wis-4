'use client'

import { deleteAccountGetResult } from '@/app/_account/account-list'
import { useCustomerInfo } from '@/app/_context/CustomerContext'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useStudentHistory } from '@/client/store/student/history/selector'
import { useStudentInfo } from '@/client/store/student/info/selector'
import { useFetchStudentWithdraw } from '@/client/store/student/withdraw/hook'
import { Modal } from '@/ui/common/common-components'

export default function Withdraw() {
  const router = useRouter()
  const { loading, fetch } = useFetchStudentWithdraw()
  const [isShowWithdrawPopup, setShowWithdrawPopup] = useState(false)

  const studentHistory = useStudentHistory().payload
  const { loginId, studyEndDay } = useStudentInfo()
  const { customerId } = useCustomerInfo()

  let isWithdrawOn = studentHistory.length === 0 && studyEndDay <= 0
  if (!isWithdrawOn) {
    const className =
      studentHistory.length === 0
        ? ''
        : studentHistory[0].className.toUpperCase()
    if (
      studentHistory.length === 1 &&
      (className.startsWith('신규회원') || className.startsWith('TRIAL'))
    ) {
      isWithdrawOn = true
    } else if (studyEndDay <= 0) {
      isWithdrawOn = true
    }
  }
  return (
    <div>
      <button
        style={{ color: 'red' }}
        onClick={() => {
          if (isWithdrawOn) {
            setShowWithdrawPopup(true)
          } else {
            alert(
              '잔여학습일이 남아있는 경우에는 회원탈퇴를 할 수 없습니다. 고객센터로 문의해주세요.',
            )
          }
        }}>
        withdraw
      </button>
      {isShowWithdrawPopup && (
        <WithdrawCauseModal
          onWithdrawClick={(memo: string) => {
            if (!loading) {
              fetch({
                cause: memo,
                callback: (isSuccess) => {
                  if (isSuccess) {
                    deleteAccountGetResult({ loginId, customerId })
                    alert(
                      '회원탈퇴가 완료되었습니다. 그동안 이용해주셔서 감사합니다.',
                    )
                    router.replace('/signoff')
                  }
                },
              })
            }
          }}
          onCancelClick={() => setShowWithdrawPopup(false)}
        />
      )}
    </div>
  )
}

function WithdrawCauseModal({
  onWithdrawClick,
  onCancelClick,
}: {
  onWithdrawClick?: (memo: string) => void
  onCancelClick?: () => void
}) {
  const [withdrawCause, setWithdrawCause] = useState('')
  const [isOnEtcCause, setOnEtcCause] = useState(false)
  const [etcCause, setEtcCause] = useState('')
  const [isShowSafeInput, setShowSafeInput] = useState(false)
  const [userSafeNumber, setUserSafeNumber] = useState('')

  const saftNumber = useMemo(() => {
    return Math.ceil(Math.random() * 8999 + 1000).toString()
  }, [])

  const withdrawCauseMap: { key: string; value: string }[] = [
    {
      key: '1',
      value: '1:단순한 변심',
    },
    {
      key: '2',
      value: '2:기대에 미치지 못한 콘텐츠',
    },
    {
      key: '3',
      value: '3:타 사이트 유사 서비스 이용을 위해',
    },
    {
      key: '4',
      value: '4:잦은 서비스 오류 및 장애',
    },
    {
      key: '5',
      value: '5:불만족스러운 서비스',
    },
    {
      key: '6',
      value: '6:개인정보 변경을 위한 재가입',
    },
    {
      key: '7',
      value: '7:학습 동기의 저하',
    },
    {
      key: '8',
      value: '8:학습자의 환경변화 (학년 이동, 이사, 이민 등)',
    },
    {
      key: '9',
      value: '9:기타',
    },
  ]
  const onCauseSelect = (key: string) => {
    const selected = withdrawCauseMap.filter((item) => item.key === key)
    if (selected.length === 1) {
      setWithdrawCause(selected[0].key)
      setEtcCause('')
      if (selected[0].key !== '9') {
        setOnEtcCause(false)
      } else {
        setOnEtcCause(true)
      }
    } else {
      setWithdrawCause('')
    }
  }

  const isWithdrawActive =
    !!withdrawCause && (withdrawCause !== '9' || !!etcCause)

  return (
    <Modal
      compact
      header
      title={'회원 탈퇴'}
      onClickDelete={() => onCancelClick && onCancelClick()}
      onClickLightbox={() => onCancelClick && onCancelClick()}>
      <div style={{ padding: '16px' }}>
        {!isShowSafeInput ? (
          <>
            <div>
              <h3>탈퇴하고자 하는 이유를 알려주세요.</h3>
              <select onChange={(e) => onCauseSelect(e.target.value)}>
                <option value={''}>보기에서 선택해주세요.</option>
                {withdrawCauseMap.map(({ key, value }) => {
                  return (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  )
                })}
              </select>
            </div>
            {isOnEtcCause && (
              <div>
                <input
                  placeholder="기타 사유를 입력해주세요."
                  onChange={(e) => setEtcCause(e.target.value)}
                />
              </div>
            )}
            <div>
              <br />
              <button
                disabled={!isWithdrawActive}
                style={{
                  display: 'inline-block',
                  color: isWithdrawActive ? 'red' : 'gray',
                }}
                onClick={() => {
                  if (isWithdrawActive) {
                    setShowSafeInput(true)
                  }
                }}>
                탈퇴하겠습니다.
              </button>
              <button
                style={{ display: 'inline-block' }}
                onClick={() => onCancelClick && onCancelClick()}>
                다시 생각해 보겠습니다.
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <div>
                탈퇴한 후에는 되돌릴 수 없으니 신중하게 생각하고 아래 보안코드를
                입력해주세요.
              </div>
              <div>보안코드: {saftNumber}</div>
              <div>
                <input
                  placeholder="화면에 보이는 보안코드를 입력해주세요."
                  onChange={(e) => setUserSafeNumber(e.target.value)}
                />
              </div>
              <button
                disabled={saftNumber !== userSafeNumber}
                style={{
                  display: 'inline-block',
                  color: saftNumber === userSafeNumber ? 'red' : 'gray',
                }}
                onClick={() => {
                  if (isWithdrawActive) {
                    const item = withdrawCauseMap.filter(
                      (item) => item.key === withdrawCause,
                    )[0]
                    const cause = `사유 : ${item.key !== '9' ? `${item.value}` : `${item.value}: ${etcCause}`}`

                    onWithdrawClick && onWithdrawClick(cause)
                  }
                }}>
                확인
              </button>
              <button
                style={{ display: 'inline-block' }}
                onClick={() => onCancelClick && onCancelClick()}>
                다시 생각해 보겠습니다.
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
