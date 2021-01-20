import jobSchedulerIF, { config } from "@packages/api/lib/proxy/BizApi/jobScheduler/jobSchedulerIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findJobSchedules(): Promise<IApiResponse> {
  return jobSchedulerIF[config.Actions.findJobSchedules]([])
}
