import CourseIf, { config } from "@packages/api/lib/proxy/BizApi/course/courseIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getSection(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return CourseIf[config.Actions.getSection]([Params], Headers)
}

export function offeringTypehasSectionType(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CourseIf[config.Actions.offeringTypehasSectionType]([Params], Headers)
}

export function deleteSection(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return CourseIf[config.Actions.deleteSection]([Params], Headers)
}

export function searchSection(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return CourseIf[config.Actions.searchSection]([Params], Headers)
}

export function findSectionNotice(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CourseIf[config.Actions.findSectionNotice]([Params], Headers)
}

export function createSectionNotice(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CourseIf[config.Actions.createSectionNotice]([Params], Headers)
}

export function findAvailableAffiliatedOrgs(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CourseIf[config.Actions.findAvailableAffiliatedOrgs]([Params.SeatGroupID], Headers)
}
