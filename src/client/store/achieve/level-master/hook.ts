import { useEffect } from 'react'
import { useFetchBasicState } from '../../hooks'
import { fetcher } from '../../fetcher-action'
import repository from '@/repository/client'
import { useAchieveLevelMasterAction } from './selector'

export function useOnLoadAchieveLevelMaster() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const action = useAchieveLevelMasterAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(repository.getLevelMaster())

      if (res.isSuccess) {
        action.setLevelMaster(res.payload)
      } else {
        setError(res.error)
      }
      setLoading(false)
    }
    fetching()
    // Deps를 입력하는 경우, 다른 Store 값 변경에 반응하게 되므로 입력하지 않음
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    loading,
    error,
  }
}
