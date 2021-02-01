import TagService, { config } from "@packages/api/lib/proxy/Service/TagService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getTags(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return TagService[config.Actions.getTags](Params, Headers).then((x) => {
    if (x.success && Array.isArray(x.data)) {
      x.data = x.data.map((a: any) => {
        a.EntityID = Params.EntityID
        a.EntityType = Params.EntityType
        return a
      })
    }
    return x
  })
}

export function addTagIntoEntity(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return TagService[config.Actions.addTagIntoEntity](Params, Headers)
}

export function getParentTags(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return TagService[config.Actions.getParentTags](Params, Headers).then((x) => {
    if (x.success && Array.isArray(x.data)) {
      x.data = x.data.map((a: any) => {
        a.EntityID = Params.EntityID
        a.EntityType = Params.EntityType
        return a
      })
    }
    return x
  })
}

export function removeTagFromEntity(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return TagService[config.Actions.removeTagFromEntity](Params, Headers)
}

export function findTagContent(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return TagService[config.Actions.findTagContent](Params, Headers)
}
