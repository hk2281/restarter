export const declareNumber = (
  number: number | undefined,
  words: [string, string, string],
) => {
  return number
    ? words[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? number % 10 : 5]
      ]
    : ``
}
