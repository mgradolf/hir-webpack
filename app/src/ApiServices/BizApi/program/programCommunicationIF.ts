import ProgramCommunicationIF, { config } from "@packages/api/lib/proxy/BizApi/program/programCommunicationIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getProgramEmailEventNameLookup(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramCommunicationIF[config.Actions.getProgramEmailEventNameLookup]([Params.ProgramID], Headers).then(
    (x) => {
      if (x.success) {
        x.data = Object.keys(x.data).map((key) => ({ ID: key, Name: x.data[key] }))
      }
      return x
    }
  )
}

export function getProgramEmailNotice(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramCommunicationIF[config.Actions.getProgramEmailNotice]([Params.ProgramID], Headers)
}

export function getRecipientWithTag(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramCommunicationIF[config.Actions.getRecipientWithTag]([Params.ProgramEmailNoticeID], Headers).then(
    (x) => {
      if (x.success) {
        x.data = Object.keys(x.data).map((key) => ({ Type: key, Recipient: x.data[key] }))
      }
      return x
    }
  )
}

export function addRecipientUserID(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramCommunicationIF[config.Actions.addRecipientUserID](
    [Params.ProgramEmailNoticeID, [Params.UserID]],
    Headers
  )
}

export function removeRecipientEmailAddress(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramCommunicationIF[config.Actions.removeRecipientEmailAddress](
    [Params.ProgramEmailNoticeID, [Params.Email]],
    Headers
  )
}

export function removeRecipientUserID(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramCommunicationIF[config.Actions.removeRecipientUserID](
    [Params.ProgramEmailNoticeID, [Params.UserID]],
    Headers
  )
}

export function addRecipientEmailAddress(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramCommunicationIF[config.Actions.addRecipientEmailAddress](
    [Params.ProgramEmailNoticeID, [Params.Email]],
    Headers
  )
}
