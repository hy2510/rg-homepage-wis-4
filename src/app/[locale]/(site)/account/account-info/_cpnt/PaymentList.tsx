'use client'

import useTranslation from '@/localization/client/useTranslations'
import { useOnLoadPaymentHistory } from '@/client/store/payment/history/hook'

export default function PaymentList() {
  // @language 'common'
  const { t } = useTranslation()

  const { loading, error, payload } = useOnLoadPaymentHistory()

  if (loading) {
    return <div></div>
  }
  return (
    <div>
      {payload && payload.length ? (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={{ ...thTdStyle, ...thStyle }}>결제일</th>
              <th style={{ ...thTdStyle, ...thStyle }}>이용권</th>
              <th style={{ ...thTdStyle, ...thStyle }}>결제 수단</th>
              <th style={{ ...thTdStyle, ...thStyle }}>금액</th>
            </tr>
          </thead>
          <tbody>
            {payload.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td style={thTdStyle}>{row.startDate}</td>
                <td style={thTdStyle}>{row.memo}</td>
                <td style={thTdStyle}>{row.receiptTypeName}</td>
                <td style={thTdStyle}>{row.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>결제 이력이 없습니다.</div>
      )}
    </div>
  )
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  gridTemplateColumns: '1fr 2fr 1fr 1fr',
}

const thTdStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
}

const thStyle: React.CSSProperties = {
  backgroundColor: '#f2f2f2',
}
