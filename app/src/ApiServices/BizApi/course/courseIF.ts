import CourseIf, { config } from "@packages/api/lib/proxy/BizApi/course/courseIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getSection(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CourseIf[config.Actions.getSection]([Params])
}

export function offeringTypehasSectionType(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CourseIf[config.Actions.offeringTypehasSectionType]([Params])
}

export function deleteSection(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CourseIf[config.Actions.deleteSection]([Params])
}

export function searchSection(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CourseIf[config.Actions.searchSection]([Params])
}

export function findSectionNotice(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CourseIf[config.Actions.findSectionNotice]([Params])
}

export function createSectionNotice(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CourseIf[config.Actions.createSectionNotice]([Params])
}

export function findAvailableAffiliatedOrgs(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CourseIf[config.Actions.findAvailableAffiliatedOrgs]([Params])
}
