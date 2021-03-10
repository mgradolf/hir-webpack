import ProgramApplicationIf, { config } from "@packages/api/lib/proxy/BizApi/program/programApplicationIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function deleteAttachment(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramApplicationIf[config.Actions.deleteAttachment]([Params.ProgramAppAttachmentID], Headers)
}

export function saveApplicationAnswer(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramApplicationIf[config.Actions.saveApplicationAnswer](
    [Params.ProgramAppID, Params.ProgramAdmReqID, Params.Answer],
    Headers
  )
}

export function getProgramAppDetails(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramApplicationIf[config.Actions.getProgramAppDetails]([Params.ProgramID, Params.StudentID], Headers)
}

export function searchProgramApplication(Params: { [key: string]: any }): Promise<IApiResponse> {
  return ProgramApplicationIf[config.Actions.searchProgramApplication]([Params])
}

export function addApplicationComment(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramApplicationIf[config.Actions.addApplicationComment]([Params.ProgramAppID, Params.Comment], Headers)
}

export function addProgramAdmReqComment(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramApplicationIf[config.Actions.addProgramAdmReqComment](
    [Params.ProgramAppID, Params.ProgramAdmReqID, Params.Comment],
    Headers
  )
}

export function resubmitProgramAdmReq(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramApplicationIf[config.Actions.resubmitProgramAdmReq](
    [Params.ProgramAppID, Params.ProgramAdmReqID, Params.Comment, Params.Reason],
    Headers
  )
}

export function changeProgramAdmReqStatus(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramApplicationIf[config.Actions.changeProgramAdmReqStatus](
    [Params.ProgramAppID, Params.ProgramAdmReqID, Params.StatusID, Params.Comment],
    Headers
  )
}

export function changeApplicationStatusWithEvent(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramApplicationIf[config.Actions.changeApplicationStatusWithEvent]([Params], Headers)
}
