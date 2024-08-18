import { Customer } from './customer'

export interface SiteBlueprint {
  target: {
    private: boolean
    school: boolean
    academy: boolean
  }
  country: {
    korea: boolean
    vietnam: boolean
    indonesia: boolean
  }
  studyOpen: {
    EB: boolean
    PB: boolean
    LC: boolean
    MS: boolean
    PD: boolean
    JN: boolean
    ES: boolean
    PreK: boolean
    DodoABC: boolean
    Speak: boolean
  }
  studentOpen: {
    changeUserName: boolean
    nameMaxLangth: number
    userEmail: boolean
    phoneNumber: boolean
    reportSetting: boolean
    suspendSetting: boolean
    withdraw: boolean
  }
  main: {
    isHidodoBanner: boolean
    isSotialRgPost: boolean
  }
  isStudentNoLogin: boolean
  isChallengeMenu: boolean
  isShowLevelMasterRanking: boolean
  isOnStudySetting: boolean
  isShowStudyEndInform: boolean
  isPaymentable: boolean
  isShowStudyEndDay: boolean
  customLogo?: string
}

export function makeSiteBlueprint(customer: Customer): SiteBlueprint {
  const {
    customerUse,
    countryCode,
    useStudentNoYn,
    studyEBUseYn,
    studyPBUseYn,
    studyLCUseYn,
    studyMSUseYn,
    studyPDUseYn,
    studyJNUseYn,
    studyESUseYn,
    useDodoAbcYn,
    useSpeakYn,
    needPayment,
  } = customer

  const type = customerUse.toLocaleLowerCase() as
    | 'academy'
    | 'school'
    | 'private'

  const target = {
    private: type === 'private',
    school: type === 'school',
    academy: type === 'academy',
  }
  const country = {
    korea: countryCode === 'KR',
    vietnam: countryCode === 'VN',
    indonesia: countryCode === 'ID',
  }

  return {
    target,
    country,
    studyOpen: {
      EB: studyEBUseYn,
      PB: studyPBUseYn,
      LC: studyLCUseYn,
      MS: studyMSUseYn,
      PD: studyPDUseYn,
      JN: studyJNUseYn,
      ES: studyESUseYn,
      PreK: useDodoAbcYn === 'A' || useDodoAbcYn === 'N',
      DodoABC: useDodoAbcYn === 'A' || useDodoAbcYn === 'Y',
      Speak: useSpeakYn,
    },
    studentOpen: {
      changeUserName: target.private,
      nameMaxLangth: target.private && country.korea ? 10 : -1,
      userEmail: target.private,
      phoneNumber: target.private,
      reportSetting: target.private,
      suspendSetting: target.private,
      withdraw: target.private,
    },
    main: {
      isHidodoBanner: target.private,
      isSotialRgPost: true,
    },
    isStudentNoLogin: useStudentNoYn,
    isChallengeMenu: target.private || target.school,
    isShowLevelMasterRanking: target.private || target.school,
    isOnStudySetting: target.private || target.school,
    isShowStudyEndInform: target.private,
    isPaymentable: needPayment === 'Y',
    isShowStudyEndDay: target.private,
    customLogo:
      !target.private && customer.logoFilename
        ? customer.logoFilename
        : undefined,
  }
}

export function newSiteBlueprint(): SiteBlueprint {
  return {
    target: {
      private: false,
      school: false,
      academy: false,
    },
    country: {
      korea: false,
      vietnam: false,
      indonesia: false,
    },
    studyOpen: {
      EB: false,
      PB: false,
      LC: false,
      MS: false,
      PD: false,
      JN: false,
      ES: false,
      PreK: false,
      DodoABC: false,
      Speak: false,
    },
    studentOpen: {
      changeUserName: false,
      nameMaxLangth: -1,
      userEmail: false,
      phoneNumber: false,
      reportSetting: false,
      suspendSetting: false,
      withdraw: false,
    },
    main: {
      isHidodoBanner: false,
      isSotialRgPost: false,
    },
    isStudentNoLogin: false,
    isChallengeMenu: false,
    isShowLevelMasterRanking: false,
    isOnStudySetting: false,
    isShowStudyEndInform: false,
    isShowStudyEndDay: false,
    isPaymentable: false,
  }
}
