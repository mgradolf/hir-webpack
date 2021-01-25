import ProgramApplicationService, { config } from "@packages/api/lib/proxy/Service/ProgramApplicationService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function changeApplicationStatusWithEvent(Params: { [key: string]: any }): Promise<IApiResponse> {
  return ProgramApplicationService[config.Actions.changeApplicationStatusWithEvent](Params)
}
