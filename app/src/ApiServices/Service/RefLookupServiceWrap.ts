import RefLookupService, { config } from "@packages/api/lib/proxy/Service/RefLookupService"

export function getOfferingTypes(): Promise<[any, any]> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "OfferingType"
  })
}

export function getTerms(): Promise<[any, any]> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "Term"
  })
}

export function getOfferingStatusTypes(): Promise<[any, any]> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "OfferingStatusType"
  })
}

export function getOrganizations(): Promise<[any, any]> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "Organization"
  })
}

export function getPaymentGatewayAccounts(): Promise<[any, any]> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "PaymentGatewayAccount"
  })
}

export function getSectionTypes(): Promise<[any, any]> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "SectionType"
  })
}
