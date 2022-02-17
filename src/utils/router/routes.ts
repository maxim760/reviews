import {ErrorPage, FinishPage, RatingPage, ThanksPage, } from "../../pages"

export enum RoutePaths {
  Rating = "/",
  Thanks = "/thanks",
  Error = "/error",
  Finish = "/finish",
}


export const RedirectPath = RoutePaths.Rating 

export const routes = [
  {Page: RatingPage, path: RoutePaths.Rating},
  {Page: ThanksPage, path: RoutePaths.Thanks},
  {Page: ErrorPage, path: RoutePaths.Error},
  {Page: FinishPage, path: RoutePaths.Finish},
]