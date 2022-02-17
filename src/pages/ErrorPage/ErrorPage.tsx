import React from 'react'
import { MainTemplate } from '../../components/templates/MainTemplate'
import Typography from "@mui/material/Typography"
import { IMainError, IStateError } from '../../utils/types'
import { useLocation } from 'react-router-dom'
const ErrorTexts: IMainError = {
  Visit: "Визит не найден",
  WasVisit: "Отзыв уже оставлен"
}


interface IProps {
  type?: keyof typeof ErrorTexts
}
const getErrorText = (type: IProps["type"]) => {
  return ErrorTexts[type!] || "Ошибка"
}

export const ErrorPage: React.FC<IProps> = () => {
  const location = useLocation()
  const errorState = location.state as IStateError 
  return (
    <MainTemplate>
      <Typography variant="h2" sx={{ fontSize: { xs: 14, sm: 18 }, textTransform: "uppercase" }} lineHeight={1} fontWeight={600} color='#0C0D07' align='center'>{getErrorText(errorState?.type)}</Typography>
    </MainTemplate>
  )
}