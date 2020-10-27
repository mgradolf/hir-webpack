import PersonIf, { config } from "@packages/api/lib/proxy/BizApi/person/personIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
/* -------------------------------------------------------------------------- */
/*                              offering requisite section                              */
/* -------------------------------------------------------------------------- */
export function searchPersons(Params: Array<{ [key: string]: any }>): Promise<IApiResponse> {
  return PersonIf[config.Actions.searchPersons](Params)
}
