import { MainTemplate } from '../../components/templates/MainTemplate'
import Typography from "@mui/material/Typography"

export const FinishPage = () => {
  return (
    <MainTemplate>
      <Typography variant="h2" sx={{ fontSize: { xs: 14, sm: 18 }, textTransform: "uppercase" }} lineHeight={1} fontWeight={600} color='#0C0D07' align='center'>Отзыв отправлен</Typography>
    </MainTemplate>
  )
}