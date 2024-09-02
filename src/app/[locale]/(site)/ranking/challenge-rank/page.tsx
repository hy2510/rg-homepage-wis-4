'use client'

import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'
import NumberUtils from '@/util/number-utils'
import Image from 'next/image'
import { ReactNode } from 'react'
import {
  useFetchReadkingkingRanking,
  useOnLoadReadkingkingRanking,
} from '@/client/store/ranking/readingking/hook'
import { useReadingkingRanking } from '@/client/store/ranking/readingking/selector'
import { useReadingkingEvent } from '@/client/store/readingking/event/selector'
import { useStudentAvatar } from '@/client/store/student/avatar/selector'
import { RankReadingking } from '@/repository/client/object/rank-readingking'
import { Dropdown, DropdownItem } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import LoadingScreen from '@/ui/modules/LoadingScreen'

const STYLE_ID = 'page_challenge_rank'

export default function Page() {
  const { loading } = useOnLoadReadkingkingRanking()

  if (loading) {
    return <LoadingScreen />
  }
  return (
    <main>
      <ChallengeRank />
    </main>
  )
}

function ChallengeRank() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const eventList = useReadingkingEvent().payload
  const { payload: rank, option: eventOption } = useReadingkingRanking()

  const rankList = rank.list
  const rankUser = rank.user

  const { fetch } = useFetchReadkingkingRanking()

  const onEventChange = (eventId: string) => {
    fetch({ eventId })
  }

  let eventTitle = ''
  let eventStartDate = ''
  let eventEndDate = ''
  let isEventIng = false
  if (eventList && eventList.length > 0 && eventOption.eventId) {
    const findEvent = eventList.filter((e) => e.eventId === eventOption.eventId)
    if (findEvent.length > 0) {
      eventTitle = findEvent[0].eventTitle
      const startDate = DateUtils.createDate(findEvent[0].startDate)
      const endDate = DateUtils.createDate(findEvent[0].endDate)
      endDate.setHours(23)
      endDate.setMinutes(59)
      endDate.setSeconds(59)
      eventStartDate = DateUtils.toStringDate(startDate, { divide: '. ' })
      eventEndDate = DateUtils.toStringDate(endDate, { divide: '. ' })
      isEventIng =
        startDate.getTime() <= Date.now() && Date.now() <= endDate.getTime()
    }
  }

  const { userAvatar } = useStudentAvatar()

  return (
    <main className={style.challenge_rank}>
      <div>
        <Dropdown title={eventTitle}>
          {eventList.map((evt, i) => {
            return (
              <DropdownItem
                key={`a_${evt.eventId}_${i}`}
                onClick={() => {
                  onEventChange(evt.eventId)
                }}>
                {evt.eventTitle}
              </DropdownItem>
            )
          })}
        </Dropdown>
        {eventTitle && (
          <div style={{marginTop: '10px'}}>
            <div style={{color: '#b3b9c2'}}>{`대회 기간: ${eventStartDate} ~ ${eventEndDate}`}</div>
            {isEventIng && (
              <div style={{color: '#b3b9c2', marginTop: '10px'}}>오늘 학습한 기록은 내일 오전 랭킹에 반영됩니다.</div>
            )}
          </div>
        )}
      </div>
      {rankUser && (
        <>
          <SubTitle>{t('t398')}</SubTitle>
          <UserEngagementStatus
            userAvatar={rankUser.imgAvatarRankingList || userAvatar.imageCircle}
            userRank={rankUser.totalRank}
            studentName={rankUser.studentName}
            earnPoints={rankUser.rgPoint}
            completed={rankUser.bookCount}
            studyDay={rankUser.studyDay}
          />
        </>
      )}
      <SubTitle
        message={false ? `${t('t399')}  : 2023.05.23 화요일 오전 12:04` : ''}>
        {t('t400')}
      </SubTitle>
      <Leaderboard rankList={rankList} />
    </main>
  )
}

const SubTitle = ({
  children,
  message,
}: {
  children?: ReactNode
  message?: string
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.sub_title}>
      {children}
      <span>{message}</span>
    </div>
  )
}

const UserEngagementStatus = ({
  userAvatar = '',
  userRank = 0,
  studentName = '',
  completed = 0,
  earnPoints = 0,
  studyDay = 0,
}: {
  userAvatar: string
  userRank: number
  studentName?: string
  completed?: number
  earnPoints?: number
  studyDay?: number
}) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.user_engagement_status}>
      {/* <div className={style.user_symbol}>
        {0 < userRank && userRank < 1000 && (
          <div className={style.user_rank}>
            <div className={style.txt_rank}>{userRank}</div>
          </div>
        )}
        <div className={style.user_avatar}>
          <Image alt="" src={userAvatar} width={100} height={100} />
        </div>
      </div> */}
      <ColumnBox label={'순위'} contents={userRank == 0 ? '###' : userRank} />
      {/* <ColumnBox label={t('t289')} contents={studentName} /> */}
      <ColumnBox label={t('t394')} contents={`${studyDay}`} />
      <ColumnBox label={t('t160')} contents={`${earnPoints}`} />
      <ColumnBox label={t('t395')} contents={`${completed}`} />
    </div>
  )
}

const Leaderboard = ({ rankList }: { rankList: RankReadingking[] }) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.leaderboard}>
      <div className={style.table_header}>
        <div className={style.th_item}>{t('t396')}</div>
        <div className={style.th_item}>{t('t289')}</div>
        <div className={style.th_item}>{t('t394')}</div>
        <div
          className={style.th_item}>{`${t('t160')} / ${t('t395')}`}</div>{' '}
      </div>
      {rankList.map((a) => {
        return (
          <TableRow
            key={`Rank_${a.num}_${a.studentId}`}
            rank={a.totalRank}
            studentAvatar={a.imgAvatarRankingList}
            studyDay={a.studyDay}
            studentName={a.studentName}
            earnPoints={a.rgPoint}
            completed={a.bookCount}
          />
        )
      })}
    </div>
  )
}

const ColumnBox = ({
  label,
  contents,
}: {
  label: string
  contents: any
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.column_box}>
      <div className={style.label}>{label}</div>
      <div className={style.contents}>{contents}</div>
    </div>
  )
}

const TableRow = ({
  rank = 0,
  studentAvatar,
  studentName,
  studyDay,
  earnPoints,
  completed,
  present,
}: {
  rank?: number
  studentAvatar?: string
  studentName?: string
  studyDay?: number
  earnPoints?: number
  completed?: number
  present?: number
}) => {
  const style = useStyle(STYLE_ID)
  return (
    <div
      className={`
      ${style.table_row} 
      ${rank >= 1 && rank < 4 ? style.top_ranker : ''}`}>
      <div
        className={`
        ${style.rank} 
        ${
          rank == 3
            ? style.rank3
            : rank == 2
              ? style.rank2
              : rank == 1
                ? style.rank1
                : ''
        }`}>
        {rank}
      </div>
      <div
        className={`${style.student_name} ${
          rank == 3
            ? style.rank3
            : rank == 2
              ? style.rank2
              : rank == 1
                ? style.rank1
                : ''
        }`}>
        <Image alt="" src={studentAvatar || ''} width={60} height={60} />
        <div className={style.txt_student_name}>{studentName}</div>
      </div>
      <div className={style.txt_present}>{studyDay}</div>
      <div className={style.txt_earn_points}>
        {earnPoints && NumberUtils.toRgDecimalPoint(earnPoints)} / {completed}
      </div>
    </div>
  )
}
