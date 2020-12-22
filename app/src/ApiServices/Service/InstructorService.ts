import InstructorService, { config } from "@packages/api/lib/proxy/Service/InstructorService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function searchInstructorOfferings(Params: { [key: string]: any }): Promise<IApiResponse> {
  return InstructorService[config.Actions.searchInstructorOfferings](Params)
}

export function searchSectionInstructor(Params: { [key: string]: any }): Promise<IApiResponse> {
  return InstructorService[config.Actions.searchSectionInstructor](Params)
}
