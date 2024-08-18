'use client'

import {
  useChangeCustomer,
  useClearCustomer,
  useCustomerInfo,
} from '@/app/_context/CustomerContext'
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { useState } from 'react'
import { useFetchFindCustomer } from '@/client/store/customer/info/hook'
import { useFetchSearchCustomer } from '@/client/store/customer/search/hook'
import { SearchCustomerResponse } from '@/repository/client/customer/search-customer'
import {
  BackLink,
  Button,
  Nav,
  NavItem,
  TextField,
} from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import LoginFormAcademy from './LoginFormAcademy'
import LoginFormPrivate from './LoginFormPrivate'
import LoginFormSchool from './LoginFormSchool'

const STYLE_ID = 'page_sign_in'

export default function LoginFormBetaService() {
  // @language 'common'
  const { t } = useTranslation()

  const customer = useCustomerInfo()

  const groupSearch = useFetchSearchCustomer()
  const findCustomer = useFetchFindCustomer()

  const navTab: 'P' | 'G' = 'G'

  const [isGroupSearchEmpty, setGroupSearchEmpty] = useState(false)
  const [groupKeyword, setGroupKeyword] = useState('')
  const [groupSearchCustomers, setGroupSearchCustomers] =
    useState<SearchCustomerResponse>([])

  const changeCustomer = useChangeCustomer()
  const clearCustomer = useClearCustomer()
  const setupCustomer = (customerId: string) => {
    findCustomer.fetch({
      customerId,
      callback: (data) => {
        if (data.payload) {
          changeCustomer(data.payload)
        }
      },
    })
  }

  const loginTitle = customer.name
  const onLoginBackClick = () => {
    clearCustomer()
  }
  return (
    <>
      {customer.customerId && (
        <LoginFormWrapper
          title={loginTitle}
          customerUse={customer.customerUse}
          onBack={onLoginBackClick}
        />
      )}
      {!customer.customerId && (
        <>
          <div style={{ overflow: 'auto' }}>
            <Nav>
              <NavItem active={navTab === 'G'}>
                {t('t259')}
                <span style={{ fontSize: '0.8em', fontWeight: 500 }}>
                  {'(학교)'}
                </span>
              </NavItem>
            </Nav>
          </div>
          {navTab === 'G' && (
            <CustomerSearch
              isShowEmpty={isGroupSearchEmpty}
              searchKeyword={groupKeyword}
              customers={groupSearchCustomers}
              onSearchCustomer={(keyword) => {
                setGroupSearchEmpty(false)
                groupSearch.fetch({
                  keyword,
                  type: 'school',
                  callback: (data) => {
                    if (data.success) {
                      if (data.payload && data.payload.length > 0) {
                        setGroupSearchCustomers(data.payload)
                      } else {
                        setGroupSearchEmpty(true)
                      }
                      setGroupKeyword(keyword)
                    }
                  },
                })
              }}
              onSelectCustomer={(customer) => {
                setupCustomer(customer.customerId)
              }}
            />
          )}
        </>
      )}
    </>
  )
}

function LoginFormWrapper({
  customerUse,
  title,
  onBack,
}: {
  customerUse: string
  title: string
  onBack?: () => void
}) {
  const header = <BackLink onClick={() => onBack && onBack()}>{title}</BackLink>
  return (
    <>
      {customerUse === 'Private' && <LoginFormPrivate customHeader={header} />}
      {customerUse === 'School' && <LoginFormSchool customHeader={header} />}
      {customerUse === 'Academy' && <LoginFormAcademy customHeader={header} />}
    </>
  )
}

function CustomerSearch({
  isShowEmpty,
  searchKeyword,
  customers,
  onSearchCustomer,
  onSelectCustomer,
}: {
  isShowEmpty: boolean
  searchKeyword: string
  customers: SearchCustomerResponse
  onSearchCustomer?: (keyword: string) => void
  onSelectCustomer?: (customer: { customerId: string }) => void
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const [keyword, setKeyword] = useState(searchKeyword)
  return (
    <>
      <div className={style.group_member}>
        <TextField
          id={'customer-name'}
          hint={'학교 이름 검색'}
          value={keyword}
          onTextChange={(text) => setKeyword(text)}
          onKeyDown={(e) => {
            if (e.key.toLowerCase() === 'enter' && keyword) {
              onSearchCustomer && onSearchCustomer(keyword)
            }
          }}
        />
        <Button
          color={'red'}
          shadow
          onClick={() => {
            onSearchCustomer && onSearchCustomer(keyword)
          }}>
          {t('t263')}
        </Button>
        {isShowEmpty && <div style={{ color: 'gray' }}>{t('t264')}</div>}

        {!isShowEmpty && customers.length > 0 && (
          <div className={style.search_result_data}>
            <div className={style.txt_title}>{t('t265')}</div>
            {customers.map((customer) => {
              return (
                <Link
                  href={''}
                  key={customer.customerId}
                  onClick={() =>
                    onSelectCustomer && onSelectCustomer(customer)
                  }>
                  <div className={style.school_card_item}>
                    {`• ${customer.name}`}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
