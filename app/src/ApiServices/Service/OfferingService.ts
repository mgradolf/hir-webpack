import OfferingService, { config } from "@packages/api/lib/proxy/Service/OfferingService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
/* -------------------------------------------------------------------------- */
/*                              offering section                              */
/* -------------------------------------------------------------------------- */

export function createOffering(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OfferingService[config.Actions.createOffering](Params)
}

export function updateOffering(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OfferingService[config.Actions.updateOffering](Params)
}

export function searchOffering(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OfferingService[config.Actions.searchOffering](Params)
}

export function addOrRemoveOfferingToCatalog(OfferingID: number, CatalogIDs: Array<number>): Promise<IApiResponse> {
  return OfferingService[config.Actions.addOrRemoveOfferingToCatalog]({
    OfferingID,
    CatalogIDs
  })
}

/* -------------------------------------------------------------------------- */
/*                         offering financial section                         */
/* -------------------------------------------------------------------------- */
export function createOfferingFinancial(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OfferingService[config.Actions.createOfferingFinancial](Params)
}

export function updateOfferingFinancial(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OfferingService[config.Actions.updateOfferingFinancial](Params)
}

export function searchOfferingFinancial(OfferingID: number): Promise<IApiResponse> {
  return OfferingService[config.Actions.searchOfferingFinancial]({ OfferingID })
}

/* -------------------------------------------------------------------------- */
/*                         offering approval section                         */
/* -------------------------------------------------------------------------- */
export function getOfferngApprovalHist(OfferingID: number): Promise<IApiResponse> {
  return OfferingService[config.Actions.getOfferngApprovalHist]({ OfferingID })
}

export function setApprovalStatus(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OfferingService[config.Actions.setApprovalStatus](Params)
}

export function getOfferngApprovalStateList(OfferingID: number): Promise<IApiResponse> {
  return OfferingService[config.Actions.getOfferngApprovalStateList]({ OfferingID })
}

export function getOfferingApprovalSendToList(OfferingID: number): Promise<IApiResponse> {
  return OfferingService[config.Actions.getOfferingApprovalSendToList]({ OfferingID })
}

/* -------------------------------------------------------------------------- */
/*                         offering requisite management section              */
/* -------------------------------------------------------------------------- */
export function getRequisiteOfferingGroup(OfferingID: number): Promise<IApiResponse> {
  return OfferingService[config.Actions.getRequisiteOfferingGroup]({ OfferingID })
}
export function getGroupOfferings(RequisiteOfferingGroupID: number): Promise<IApiResponse> {
  return OfferingService[config.Actions.getGroupOfferings]({ RequisiteOfferingGroupID })
}
export function createRequisiteOfferingGroup(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OfferingService[config.Actions.createRequisiteOfferingGroup](Params)
}
export function updateRequisiteOfferingGroup(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OfferingService[config.Actions.updateRequisiteOfferingGroup](Params)
}

/* -------------------------------------------------------------------------- */
/*                         offering qualified instructor section              */
/* -------------------------------------------------------------------------- */
export function getQualifiedInstructors(OfferingID: number): Promise<IApiResponse> {
  return OfferingService[config.Actions.getQualifiedInstructors]({ OfferingID })
}

export function updateInstructors(OfferingID: number, InstructorIDs: Array<number>): Promise<IApiResponse> {
  return OfferingService[config.Actions.updateInstructors]({
    OfferingID,
    InstructorIDs
  })
}
