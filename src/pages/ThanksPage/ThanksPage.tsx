import {useState, useEffect} from "react"
import { MainTemplate } from "../../components/templates/MainTemplate"
import { useWindowSize , SEC_BEFORE_REDIRECT, formatWord} from "../../utils"
import Confetti from 'react-confetti'
import Typography from "@mui/material/Typography"
let interval: NodeJS.Timer
export const ThanksPage = () => {
  const { width, height } = useWindowSize()
  const [secToRedirect, setSecToRedirect] = useState(SEC_BEFORE_REDIRECT)
  useEffect(() => {
    interval = setInterval(() => {
      setSecToRedirect(prev => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    if (secToRedirect === 0) {
      window.location.href = 'https://www.google.com'
    }
  }, [secToRedirect])
  const formattedSec = formatWord('секунд', secToRedirect, ['', 'у', 'ы'])
  const redirectText = `Перенаправление через ${secToRedirect} ${formattedSec}`
  return (
    <MainTemplate>

      <Confetti
        
        width={width}
        height={height}
      />
      <Typography variant="h2" sx={{fontSize: {xs: 32, sm: 40}, textTransform: "uppercase"}} lineHeight={1} fontWeight={600} color='#C83D07' align='center'>Спасибо</Typography>
      <Typography variant="h2" sx={{fontSize: {xs: 14, sm: 18}, textTransform: "uppercase"}} lineHeight={1} fontWeight={600} color='#0C0D07' align='center'>за</Typography>
      <Typography variant="h2" sx={{fontSize: {xs: 32, sm: 40}, textTransform: "uppercase"}} lineHeight={1} fontWeight={600} color='#C83D07' align='center'>отзыв</Typography>
      <Typography variant="body1" sx={{mt: 1}}>{redirectText}</Typography>
    </MainTemplate>
  )
}