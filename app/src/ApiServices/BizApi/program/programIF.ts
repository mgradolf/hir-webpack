import ProgramIf, { config } from "@packages/api/lib/proxy/BizApi/program/programIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function searchPrograms(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.searchProgram]([Params], Headers)
}

export function searchProgramOffering(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.searchProgramOffering]([Params], Headers)
}

export function deleteProgramOfferingWithEvent(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.deleteProgramOfferingWithEvent]([Params.ProgramOfferingID], Headers)
}

export function saveProgramWithEvent(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.saveProgramWithEvent]([Params], Headers)
}

export function copyProgramWithEvent(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.copyProgramWithEvent]([Params.ProgramID], Headers)
}

export function deleteProgramWithEvent(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.deleteProgramWithEvent]([Params.ProgramID], Headers)
}

export function getProgramAdmReqGroups(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.getProgramAdmReqGroups]([Params.ProgramID], Headers)
}

export function getProgramAdmReqGroup(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.getProgramAdmReqGroup]([Params.ProgramAdmReqGroupID], Headers)
}

export function getProgramAdmReqs(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.getProgramAdmReqs]([Params.ProgramAdmReqGroupID], Headers)
}

export function deleteProgramAdmReqGroup(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.deleteProgramAdmReqGroup]([Params.ProgramAdmReqGroupID], Headers)
}

export function deleteProgramAdmReq(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.deleteProgramAdmReq]([Params.ProgramAdmReqID], Headers)
}

export function getProgramReqGroups(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.getProgramReqGroups]([Params.ProgramID], Headers)
}

export function getProgramReqGroupMembers(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.getProgramReqGroupMembers]([Params.ProgramID], Headers)
}

export function saveProgramReqGroup(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.saveProgramReqGroup]([Params], Headers)
}

export function deleteProgramReqGroup(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.deleteProgramReqGroup]([Params.ProgramReqGroupID, [Params.OfferingID]], Headers)
}

export function addProgramReqGroupMember(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.addProgramReqGroupMember]([Params.ProgramReqGroupID, [Params.OfferingID]], Headers)
}

export function deleteProgramReqGroupMember(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.deleteProgramReqGroupMember]([Params.ProgramReqGroupID, [Params.OfferingID]], Headers)
}

export function getProgramFinancials(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.getProgramFinancials]([Params.ProgramID], Headers)
}

export function deleteProgramFinancial(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.deleteProgramFinancial]([Params.ProgramFinancialID], Headers)
}
