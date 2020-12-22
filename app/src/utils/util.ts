export const onlyUnique = (value: any, index: any, self: any): any => {
  return self.indexOf(value) === index
}

export const putSpaceBetweenCapitalLetters = (word: string): string => word.replace(/([A-Z])/g, " $1").trim()
