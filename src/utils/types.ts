
export type IRating = number | null
export type ISpecItem = {
  CRVID: string,
  RECTYPEID: "1",
  DOCID: string,
  RECNAME: string,
  IMGURL: string,
  RATING: string,
  COMMENT: string,
}

export type IRatingForVisit = {
  COMMENT: string
  CRVID: string
  DOCID: string
  IMGURL: string
  RATING: IRating
  RECNAME: string
  RECTYPEID: string
}

export type ChangeRateFn = (e: React.SyntheticEvent, value: IRating) => void

export type IMainError = {
  Visit: string,
  WasVisit: string
}

export type IStateError = {
  type: keyof IMainError
}