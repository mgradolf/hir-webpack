import { getCountries } from "@packages/api/lib/test/getCountries"
export const getCountriesWrap = (): Promise<[any, any]> => getCountries()
