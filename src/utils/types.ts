
export type IRating = number | null
export type ISpecItem = {
  specName: string,
  id: string
}
export type IRatingItem = ISpecItem & {rating:IRating}

export type ChangeRateFn = (e: React.SyntheticEvent, value: IRating) => void

