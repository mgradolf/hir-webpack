import RefLookupService, { config } from "@packages/api/lib/proxy/Service/RefLookupService"

export function getOfferingTypes(): Promise<[any, any]> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "OfferingType"
  })
}
