import {useState, useEffect} from "react"
import { MainTemplate } from "../../components/templates/MainTemplate"
import { useWindowSize, SEC_BEFORE_REDIRECT, formatWord } from "../../utils"
import { useLocation, useNavigate } from "react-router-dom" 
import Confetti from 'react-confetti'
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { RoutePaths } from "../../utils/router/routes"
import { useNavigateSameParams } from "../../utils/hooks/useNavigateSameParams"
import { IOptionsData } from "../../utils/types"

let interval: NodeJS.Timer
export const ThanksPage = () => {
  const navigate = useNavigateSameParams()
  const location = useLocation()
  const {
    fromReview = false,
    options = {},
    isSuccess = false
  } = (location.state || {}) as {
      fromReview?: boolean,
      options?: IOptionsData,
      isSuccess?: boolean
    }
  const redirectUrl = isSuccess ? options.successUrl : options.badUrl
  const text = isSuccess ? options.successText : (options.badText || "Отзыв отправлен")
  useEffect(() => {
    if (!fromReview) {
      navigate(RoutePaths.Rating, { replace: true })
      return
    }
    window.history.replaceState({}, document.title)
  }, [])
  const { width, height } = useWindowSize()
  const [secToRedirect, setSecToRedirect] = useState(SEC_BEFORE_REDIRECT)
  useEffect(() => {
    if (!redirectUrl) {
      return
    }
    interval = setInterval(() => {
      setSecToRedirect(prev => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    if (secToRedirect === 0 && redirectUrl) {
      window.location.href = redirectUrl
    }
  }, [secToRedirect])
  const formattedSec = formatWord('секунд', secToRedirect, ['', 'у', 'ы'])
  const redirectText = `Перенаправление через ${secToRedirect} ${formattedSec}`
  return (
    <MainTemplate>

      {isSuccess ? <Confetti
        width={width}
        height={height}
        confettiSource={{x: 0, y: 0, h: 1/4 * height, w: width}}
      /> : <Confetti
          width={width}
          height={height}
          numberOfPieces={18}
          confettiSource={{x: 0, y: 0, h: 1/2 * height, w: width}}
          drawShape={(ctx) => {
            ctx.rotate = () => { }
            ctx.translate(0, 0)
            ctx.scale = () => {}
            ctx.transform = () => {}
            ctx.beginPath()
            ctx.rotate(0)
            ctx.font = ctx.font.replace(/\d+px/, `40px`)
            ctx.fillText("😢", 0, 0)
            ctx.closePath()
          }}
      />}
      {text ? (
        <Box sx={{textAlign: "center"}}>{text}</Box>
      ) : (
        <>
          <Typography variant="h2" sx={{fontSize: {xs: 32, sm: 40}, textTransform: "uppercase"}} lineHeight={1} fontWeight={600} color='#C83D07' align='center'>Спасибо</Typography>
          <Typography variant="h2" sx={{fontSize: {xs: 14, sm: 18}, textTransform: "uppercase"}} lineHeight={1} fontWeight={600} color='#0C0D07' align='center'>за</Typography>
          <Typography variant="h2" sx={{fontSize: {xs: 32, sm: 40}, textTransform: "uppercase"}} lineHeight={1} fontWeight={600} color='#C83D07' align='center'>отзыв</Typography>
        </>
      )}
      {redirectUrl && <Typography variant="body1" sx={{ mt: 1 }}>{redirectText}</Typography>}
    </MainTemplate>
  )
}