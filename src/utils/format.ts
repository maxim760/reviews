import { IOption, IOptionsData } from "./types"

export const formatWord = (word: string, count: number, suffixes: [string, string, string]) => {
  const lastNum = count % 10
  const lastTwoNums = count % 100
  if (lastNum === 0 || lastTwoNums === 11 || lastNum >= 5) {
    return word + suffixes[0]
  }
  if (lastNum === 1) {
    return word + suffixes[1]
  }
  return word + suffixes[2]
}

export const formatOptions = (options: IOption[]): IOptionsData => {
  const successUrlOption = options.find(opt => opt.ID === "21")
  const successUrl = successUrlOption && successUrlOption.PARAMVALUE !== "0"
    ? successUrlOption.PARAMVALUE
    : ""

  const badUrlOption = options.find(opt => opt.ID === "22")
  const badUrl = badUrlOption && badUrlOption.PARAMVALUE !== "0"
    ? badUrlOption.PARAMVALUE
    : ""
  
  const successTextOption = options.find(opt => opt.ID === "23")
  const successText = successTextOption && successTextOption.PARAMVALUE !== "0"
    ? successTextOption.PARAMVALUE
    : ""
  
  const badTextOption = options.find(opt => opt.ID === "24")
  const badText = badTextOption && badTextOption.PARAMVALUE !== "0"
    ? badTextOption.PARAMVALUE
    : "Ваш отзыв отправлен"
  return {successText, successUrl, badText, badUrl}
}