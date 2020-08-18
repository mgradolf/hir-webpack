import { getCountries } from "@packages/api/lib/test/getCountries"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export const getCountriesWrap = (): Promise<IApiResponse> => getCountries()
