import ScheduleIf, { config } from "@packages/api/lib/proxy/BizApi/schedule/schedulingIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findMeetingTypes(): Promise<IApiResponse> {
  return ScheduleIf[config.Actions.findMeetingTypes]([])
}

export function findPossibleSites(): Promise<IApiResponse> {
  return ScheduleIf[config.Actions.findPossibleSites]([])
}

export function findPossibleBuildings(siteId: number): Promise<IApiResponse> {
  return ScheduleIf[config.Actions.findPossibleBuildings]([siteId])
}

export function findPossibleRooms(buildingId: number): Promise<IApiResponse> {
  return ScheduleIf[config.Actions.findPossibleRooms]([buildingId])
}
