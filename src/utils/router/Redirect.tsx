import { useEffect, useLayoutEffect } from "react"
import { useNavigateSameParams } from "../hooks/useNavigateSameParams"
import { RedirectPath } from "./routes"

export const Redirect = () => {
  const navigate = useNavigateSameParams()
  useEffect(() => {
    navigate(RedirectPath ,{replace: true})
  }, [])
  return null
}