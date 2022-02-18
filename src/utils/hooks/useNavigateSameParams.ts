import { useCallback } from "react"
import { NavigateFunction, NavigateOptions, useLocation, useNavigate } from "react-router-dom"

export const useNavigateSameParams = () => {
  const navigate = useNavigate()
  const {hash, search} = useLocation()
  const navigateSameParams = useCallback((to: string, options: NavigateOptions) => {
      navigate({hash: hash, pathname: to, search: search}, options)
    }, [hash, search])
  return navigateSameParams
}