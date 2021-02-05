import jobSchedulerIF, { config } from "@packages/api/lib/proxy/BizApi/jobScheduler/jobSchedulerIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findJobSchedules(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return jobSchedulerIF[config.Actions.findJobSchedules]([Params], Headers)
}
