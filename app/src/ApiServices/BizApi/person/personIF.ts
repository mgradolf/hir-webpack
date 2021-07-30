import PersonIf, { config } from "@packages/api/lib/proxy/BizApi/person/personIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function searchPersons(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return PersonIf[config.Actions.searchPersons]([Params], Headers)
}

export function findPreferredEmail(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonIf[config.Actions.findPreferredEmail]([Params.PersonID], Headers)
}
