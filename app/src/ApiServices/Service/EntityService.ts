import EntityService, { config } from "@packages/api/lib/proxy/Service/EntityService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export const entities = {
  Offering: "Offering"
}

export function getOfferingById(EntityID: number): Promise<IApiResponse> {
  return EntityService[config.Actions.getEntity]({
    EntityType: entities.Offering,
    EntityID
  })
}
