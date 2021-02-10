import AddressBookIf, { config } from "@packages/api/lib/proxy/BizApi/person/addressBookIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findDefaultCountry(
  Params?: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return AddressBookIf[config.Actions.findDefaultCountry]([Params], Headers)
}
