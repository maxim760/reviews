import { useMemo, useState, useEffect, useCallback } from "react"
import Alert from "@mui/material/Alert"
import Skeleton from '@mui/material/Skeleton';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import TextField from "@mui/material/TextField";
import AssignmentIcon from '@mui/icons-material/AssignmentIndOutlined';
import { MainTemplate } from "../../components/templates/MainTemplate";
import { RoutePaths } from "../../utils/router/routes";
import {useNavigate} from "react-router-dom"
import { ChangeRateFn, IRating, ISpecItem } from "../../utils/types";
import {RatingItem, RatingSpecList} from "./components"
import { SxProps, Theme } from "@mui/material/styles";
const mockData: ISpecItem[] = [
  {specName: "Алина Алинова", id: "3"},
  {specName: "Ирина Петрова", id: "4"},
]
const data: ISpecItem[] = [
  {specName: "Иван Иванов", id: "0"},
  {specName: "Алина Алинова", id: "3"},
  {specName: "Ирина Петрова", id: "4"},
]

type IRatingState = {
  [key: string]: ISpecItem & {rating: IRating}
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const toInitRatings = (data: ISpecItem[]): IRatingState => {
  return data
    .reduce((acc, item) => {
      return {
        ...acc,
        [item.id]: {...item, rating: null}
      }
    }, {})
}

let alertTimer: NodeJS.Timeout
const alertMS = 10000

const styles = {
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submitBtn : {
    alignSelf: "center",
    minWidth: "200px",
    textAlign: "center",
    borderRadius: 2,
    lineHeight: "normal",
    height: "40px",
  },
  submitBtnOffset: {
    mt: 1.5
  },
  wrapperTextArea: {
    mt: 2,
    width: "100%"
  },
} as const
export const RatingPage = () => {
  const [visitRate, setVisitRate] = useState<IRating>(null)
  const navigate = useNavigate()
  const [ratings, setRatings] = useState<IRatingState>(() => toInitRatings(data))
  const [review, setReview] = useState("")
  const [error, setError] = useState({error: false, message: ''})
  const [loading, setLoading] = useState(true)
  const [formLoading, setFormLoading] = useState(false)
  const removeError = () => setError(prev => ({...prev, error: false}))
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1600)
  }, [])
  useEffect(() => {
    if (!error) {
      clearTimeout(alertTimer)
    } else {
      alertTimer = setTimeout(() => {
        removeError()
      }, alertMS)
    }
    return () => clearTimeout(alertTimer)
  }, [error.error])
  const onChangeReview = (e: React.ChangeEvent<HTMLTextAreaElement>) => setReview(e.target.value)
  const isRatingsDone = useMemo(() => {
    const isVisitDone = visitRate !== null
    const isSpecRatingsDone = Object
      .values(ratings)
      .map((item) => item.rating)
      .every(rate => rate !== null)
    return isVisitDone && isSpecRatingsDone
  }, [visitRate, ratings])
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isRatingsDone) {
      setError({error: true, message: "Не все рейтинги поставлены"})
      return
    }
    try {
      setFormLoading(true)
      await delay(1000)
      setFormLoading(false)
      navigate(RoutePaths.Thanks)
    } catch (error) {
      setFormLoading(false)
      setError({error: true, message: (error as Error)?.message ?? "Ошибка при отправлении отзыва"})
    }
  }
  const onChangeVisitRate: ChangeRateFn = useCallback((event, value) => {
    setVisitRate(value)
  }, [])

  const onChangeSpecRate = useCallback((id: string): ChangeRateFn => (event: React.SyntheticEvent, value: IRating) => {
    setRatings(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        rating: value
      }
    }))
  }, [])
  if (loading) {
    return (
      <MainTemplate>
        <Box sx={styles.wrapper} component="form">
          <RatingItem onChange={() => {}} value={null} Icon={AssignmentIcon} text='' loading />
          <RatingSpecList items={Object.values(toInitRatings(mockData))} onChange={() => () => {}} loading />
          <Box sx={styles.wrapperTextArea}>
            <Skeleton variant="rectangular" sx={{borderRadius: "6px", width: "100%", maxWidth: "none"}} >
              <TextField multiline minRows={2} fullWidth />
            </Skeleton>
          </Box>
          <Skeleton
            sx={{...styles.submitBtnOffset, borderRadius: styles?.submitBtn?.borderRadius || 1}}
            variant='rectangular'
          >
            <LoadingButton sx={styles.submitBtn}>
              Оставить отзыв
            </LoadingButton>
          </Skeleton>
        </Box>
      </MainTemplate>
    )
  }
  return (
    <MainTemplate>
      <Box
        sx={styles.wrapper}
        component="form"
        onSubmit={onSubmitForm}
      >
        <RatingItem
          onChange={onChangeVisitRate}
          value={visitRate}
          Icon={AssignmentIcon}
          text='Оцените визит'
        />
        <RatingSpecList 
          items={Object.values(ratings)}
          onChange={onChangeSpecRate}
        />
        <Box sx={styles.wrapperTextArea}>
          <TextField
            multiline
            label="Поделитесь впечатлениями"
            onChange={onChangeReview}
            value={review}
            minRows={2}
            fullWidth
            maxRows={5}
            />
        </Box>
        <Collapse in={!!error.error}>
          <Alert severity="error" onClose={removeError} sx={{mt: 1}}>
            {error.message}
          </Alert>
        </Collapse>
        <LoadingButton
          disabled={formLoading}  
          loading={formLoading}  
          sx={{...styles.submitBtn, ...styles.submitBtnOffset}}
          type="submit"
          variant="contained"
        >
          Оставить отзыв
        </LoadingButton>
      </Box>
    </MainTemplate>
  )
}