import ScheduleIf, { config } from "@packages/api/lib/proxy/BizApi/schedule/schedulingIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findMeetingTypes(): Promise<IApiResponse> {
  return ScheduleIf[config.Actions.findMeetingTypes]([])
}
