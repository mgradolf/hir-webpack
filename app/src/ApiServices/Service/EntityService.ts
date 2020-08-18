import EntityService, { config } from "@packages/api/lib/proxy/Service/EntityService"

export const entities = {
  Offering: "Offering"
}

export function getOfferingById(EntityID: number): Promise<[any, any]> {
  return EntityService[config.Actions.getEntity]({
    EntityType: entities.Offering,
    EntityID
  })
}
