export const onlyUnique = (value: any, index: any, self: any): any => {
  return self.indexOf(value) === index
}

export const putSpaceBetweenCapitalLetters = (word: string): string => word.replace(/([A-Z])/g, " $1").trim()

export const removeSpaceBetweenCapitalLetters = (word: string): string => {
  const temp: string = word
    .trim()
    .split(" ")
    .map((x: string) => {
      const [x1, ...xrest] = x
      const x11 = x1.toUpperCase()
      return `${x11}${xrest.join("")}`
    })
    .join("")
  return temp
}
