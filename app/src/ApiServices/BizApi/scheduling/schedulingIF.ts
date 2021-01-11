import SchedulingIf, { config } from "@packages/api/lib/proxy/BizApi/scheduling/schedulingIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findMeetingTypes(Params?: any): Promise<IApiResponse> {
  return SchedulingIf[config.Actions.findMeetingTypes]([Params])
}

export function findPossibleSites(Params?: any): Promise<IApiResponse> {
  return SchedulingIf[config.Actions.findPossibleSites]([Params])
}

export function findPossibleBuildings(Params?: any): Promise<IApiResponse> {
  return SchedulingIf[config.Actions.findPossibleBuildings]([Params])
}

export function findPossibleRooms(Params?: any): Promise<IApiResponse> {
  return SchedulingIf[config.Actions.findPossibleRooms]([Params])
}

export function findQualifiedInstructors(Params?: any): Promise<IApiResponse> {
  return SchedulingIf[config.Actions.findQualifiedInstructors]([Params])
}
