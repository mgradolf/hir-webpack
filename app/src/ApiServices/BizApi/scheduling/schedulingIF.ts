import SchedulingIf, { config } from "@packages/api/lib/proxy/BizApi/scheduling/schedulingIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findMeetingTypes(): Promise<IApiResponse> {
  return SchedulingIf[config.Actions.findMeetingTypes]([], Headers)
}

export function findPossibleSites(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SchedulingIf[config.Actions.findPossibleSites]([], Headers)
}

export function findPossibleBuildings(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SchedulingIf[config.Actions.findPossibleBuildings]([Params.SiteID], Headers)
}

export function findPossibleRooms(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SchedulingIf[config.Actions.findPossibleRooms]([Params.BuildingID], Headers)
}

export function findQualifiedInstructors(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SchedulingIf[config.Actions.findQualifiedInstructors]([Params], Headers)
}
