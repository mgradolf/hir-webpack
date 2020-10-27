import SchedulingIf, { config } from "@packages/api/lib/proxy/BizApi/scheduling/schedulingIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findMeetingTypes(): Promise<IApiResponse> {
  return SchedulingIf[config.Actions.findMeetingTypes]([])
}

export function findPossibleSites(): Promise<IApiResponse> {
  return SchedulingIf[config.Actions.findPossibleSites]([])
}

export function findPossibleBuildings(Params: Array<any>): Promise<IApiResponse> {
  return SchedulingIf[config.Actions.findPossibleBuildings](Params)
}

export function findPossibleRooms(Params: Array<any>): Promise<IApiResponse> {
  return SchedulingIf[config.Actions.findPossibleRooms](Params)
}

export function findQualifiedInstructors(Params: Array<any>): Promise<IApiResponse> {
  return SchedulingIf[config.Actions.findQualifiedInstructors](Params)
}
