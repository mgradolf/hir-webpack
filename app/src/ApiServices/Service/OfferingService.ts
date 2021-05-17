import OfferingService, { config } from "@packages/api/lib/proxy/Service/OfferingService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
/* -------------------------------------------------------------------------- */
/*                              offering section                              */
/* -------------------------------------------------------------------------- */

export function createOffering(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OfferingService[config.Actions.createOffering](Params, Headers)
}

export function updateOffering(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OfferingService[config.Actions.updateOffering](Params, Headers)
}

export function searchOffering(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OfferingService[config.Actions.searchOffering](Params, Headers)
}

export function removeOffering(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OfferingService[config.Actions.removeOffering](Params, Headers)
}

export function addOrRemoveOfferingToCatalog(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OfferingService[config.Actions.addOrRemoveOfferingToCatalog](Params, Headers)
}

export function createOfferingFinancial(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OfferingService[config.Actions.createOfferingFinancial](Params, Headers)
}

export function updateOfferingFinancial(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OfferingService[config.Actions.updateOfferingFinancial](Params, Headers)
}

export function searchOfferingFinancial(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OfferingService[config.Actions.searchOfferingFinancial](Params, Headers)
}

export function getOfferingApprovalHist(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OfferingService[config.Actions.getOfferingApprovalHist](Params, Headers)
}

export function setApprovalStatus(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OfferingService[config.Actions.setApprovalStatus](Params, Headers)
}

export function getOfferingApprovalStateList(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OfferingService[config.Actions.getOfferingApprovalStateList](Params, Headers)
}

export function getOfferingApprovalSendToList(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OfferingService[config.Actions.getOfferingApprovalSendToList](Params, Headers)
}

export function getRequisiteOfferingGroup(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OfferingService[config.Actions.getRequisiteOfferingGroup](Params, Headers)
}

export function getGroupOfferings(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OfferingService[config.Actions.getGroupOfferings](Params, Headers)
}

export function createRequisiteOfferingGroup(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OfferingService[config.Actions.createRequisiteOfferingGroup](Params, Headers)
}

export function updateRequisiteOfferingGroup(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OfferingService[config.Actions.updateRequisiteOfferingGroup](Params, Headers)
}

export function getQualifiedInstructors(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OfferingService[config.Actions.getQualifiedInstructors](Params, Headers)
}

export function updateInstructors(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OfferingService[config.Actions.updateInstructors](Params, Headers)
}

export function createSection(Params: { [key: string]: string }): Promise<IApiResponse> {
  return OfferingService[config.Actions.createSection](Params, Headers)
}
