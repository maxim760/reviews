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
import { ChangeRateFn, IRating, IRatingForVisit, IStateError } from "../../utils/types";
import {RatingItem, RatingSpecList} from "./components"
import { request, ReviewData } from "../../utils";
import { useNavigateSameParams } from "../../utils/hooks/useNavigateSameParams";
const mockData: IRatingForVisit[] = [
  {RECNAME: "Алина Алинова", CRVID: "3", DOCID: "3", RATING: null, COMMENT: "", IMGURL: "", RECTYPEID: "1"},
  {RECNAME: "Ирина Петрова", CRVID: "4", DOCID: "4", RATING: null, COMMENT: "", IMGURL: "", RECTYPEID: "1"},
]

type IRatingState = {
  [key: string]: IRatingForVisit
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const toInitRatings = (data: IRatingForVisit[]): IRatingState => {
  return data
    .reduce((acc, item) => {
      return {
        ...acc,
        [item.CRVID]: {...item, RATING: null}
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
  const [visitRate, setVisitRate] = useState<IRatingForVisit | null>(null)
  const navigate = useNavigateSameParams()
  const [ratings, setRatings] = useState<IRatingState>({})
  const [error, setError] = useState({error: false, message: ''})
  const [loading, setLoading] = useState(true)
  const [formLoading, setFormLoading] = useState(false)
  const visitId = ReviewData.getVisitId()
  const removeError = () => setError(prev => ({...prev, error: false}))
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const data: IRatingForVisit[] = await request("CRVGetListByVisitId", { VisitId: visitId })
      if (!data.length || data.length === data.filter(item => item.RECTYPEID === "2").length) {
        const errorState: IStateError = { type: "WasVisit" }
        navigate(RoutePaths.Error, {replace: true, state: errorState})
        return
      }
      setRatings(toInitRatings(data.filter(item => item.RECTYPEID === "1")))
      const visit = data.filter(item => item.RECTYPEID === "0")?.[0]
      if (visit) {
        setVisitRate({...visit, RATING: null})
      }
      setLoading(false)
        
    }
    loadData()
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
  const onChangeReview = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVisitRate(prev => ({...prev as IRatingForVisit, COMMENT: e.target.value}))
  }
  const isRatingsDone = useMemo(() => {
    const isVisitDone = visitRate !== null
    const isSpecRatingsDone = Object
      .values(ratings)
      .map((item) => item.RATING)
      .every(rate => rate !== null)
    return isVisitDone && isSpecRatingsDone
  }, [visitRate, ratings])
  const isOnlyBestRatings = useMemo(() => {
    const isVisitDone = visitRate?.RATING === 5
    const isSpecRatingsDone = Object
      .values(ratings)
      .map((item) => item.RATING)
      .every(rate => rate === 5)
    return isVisitDone && isSpecRatingsDone
  }, [visitRate, ratings])
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isRatingsDone) {
      setError({error: true, message: "Не все рейтинги поставлены"})
      return
    }
    try {
      const specItems = Object.values(ratings)
      const visitItems = visitRate ? [visitRate] : []
      const promises = [...visitItems, ...specItems].map(item => {
        return request("CRVSubmit", {
          CRVId: item.CRVID,
          Rating: item.RATING,
          Comment: item.COMMENT,
        })
      })
      setFormLoading(true)
      const res = await Promise.all(promises)
      setFormLoading(false)
      const redirectUrl = "" // пока нет
      if (isOnlyBestRatings) {
        navigate(RoutePaths.Thanks, {replace: true, state: {fromReview: true, redirectUrl}})
      } else {
        if(redirectUrl) {
          window.location.href = redirectUrl
        } else {
          navigate(RoutePaths.Finish, {replace: true})
        }
      }
    } catch (error) {
      setFormLoading(false)
      setError({error: true, message: (error as Error)?.message ?? "Ошибка при отправлении отзыва"})
    }
  }
  const onChangeVisitRate: ChangeRateFn = useCallback((event, value) => {
    setVisitRate((prev) => ({...prev as IRatingForVisit, RATING: value}))
  }, [])

  const onChangeSpecRate = useCallback((id: string): ChangeRateFn => (event: React.SyntheticEvent, value: IRating) => {
    setRatings(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        RATING: value
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
        {!!visitRate && <RatingItem
          onChange={onChangeVisitRate}
          value={visitRate?.RATING || null}
          Icon={AssignmentIcon}
          text='Оцените визит'
        />}
        <RatingSpecList 
          items={Object.values(ratings)}
          onChange={onChangeSpecRate}
        />
        <Box sx={styles.wrapperTextArea}>
          <TextField
            multiline
            label="Поделитесь впечатлениями"
            onChange={onChangeReview}
            value={visitRate?.COMMENT ?? ""}
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