import BudgetAnalysisService, { config } from "@packages/api/lib/proxy/Service/BudgetAnalysisService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function analyzeSections(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return BudgetAnalysisService[config.Actions.analyzeSections](Params, Headers)
}
