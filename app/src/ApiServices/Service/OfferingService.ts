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

export function addOrRemoveOfferingToCatalog(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OfferingService[config.Actions.addOrRemoveOfferingToCatalog](Params)
}

export function createOfferingFinancial(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OfferingService[config.Actions.createOfferingFinancial](Params)
}

export function updateOfferingFinancial(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OfferingService[config.Actions.updateOfferingFinancial](Params)
}

export function searchOfferingFinancial(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OfferingService[config.Actions.searchOfferingFinancial](Params)
}

export function getOfferngApprovalHist(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OfferingService[config.Actions.getOfferngApprovalHist](Params)
}

export function setApprovalStatus(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OfferingService[config.Actions.setApprovalStatus](Params)
}

export function getOfferngApprovalStateList(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OfferingService[config.Actions.getOfferngApprovalStateList](Params)
}

export function getOfferingApprovalSendToList(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OfferingService[config.Actions.getOfferingApprovalSendToList](Params)
}

export function getRequisiteOfferingGroup(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OfferingService[config.Actions.getRequisiteOfferingGroup](Params)
}

export function getGroupOfferings(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OfferingService[config.Actions.getGroupOfferings](Params)
}

export function createRequisiteOfferingGroup(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OfferingService[config.Actions.createRequisiteOfferingGroup](Params)
}

export function updateRequisiteOfferingGroup(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OfferingService[config.Actions.updateRequisiteOfferingGroup](Params)
}

export function getQualifiedInstructors(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OfferingService[config.Actions.getQualifiedInstructors](Params)
}

export function updateInstructors(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OfferingService[config.Actions.updateInstructors](Params)
}

export function createSection(Params: { [key: string]: string }): Promise<IApiResponse> {
  return OfferingService[config.Actions.createSection](Params)
}
