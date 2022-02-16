import {RatingPage, ThanksPage} from "../../pages"

export enum RoutePaths {
  Rating = "/",
  Thanks = "/thanks"
}


export const RedirectPath = RoutePaths.Rating 

export const routes = [
  {Page: RatingPage, path: RoutePaths.Rating},
  {Page: ThanksPage, path: RoutePaths.Thanks},
]