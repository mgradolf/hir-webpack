import TagService, { config } from "@packages/api/lib/proxy/Service/TagService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getTags(Params: { [key: string]: any }): Promise<IApiResponse> {
  return TagService[config.Actions.getTags](Params)
}

export function addTagIntoEntity(Params: { [key: string]: any }): Promise<IApiResponse> {
  return TagService[config.Actions.addTagIntoEntity](Params)
}

export function getParentTags(Params: { [key: string]: any }): Promise<IApiResponse> {
  return TagService[config.Actions.getParentTags](Params)
}

export function removeTagFromEntity(Params: { [key: string]: any }): Promise<IApiResponse> {
  return TagService[config.Actions.removeTagFromEntity](Params)
}
