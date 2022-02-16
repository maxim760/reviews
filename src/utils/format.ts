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