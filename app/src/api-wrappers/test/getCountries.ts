import { getCountries } from '@packages/api/lib/test/getCountries'
import callApi from '~/api-wrappers/callApi'

export const getCountriesWrap = (): Promise<[any, any]> => callApi(getCountries)
