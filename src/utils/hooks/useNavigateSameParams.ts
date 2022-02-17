import { NavigateFunction, NavigateOptions, useLocation, useNavigate } from "react-router-dom"

export const useNavigateSameParams = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const navigateSameParams = (to: string, options: NavigateOptions) => {
    navigate({hash: location.hash, pathname: to, search: location.search}, options)
  }
  return navigateSameParams
}