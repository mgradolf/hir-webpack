import StudentCertificateIf, { config } from "@packages/api/lib/proxy/BizApi/certificate/studentCertificateIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getCompletedSection(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return StudentCertificateIf[config.Actions.getCompletedSection]([Params.StudentID], Headers)
}

export function getCompletedProgram(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return StudentCertificateIf[config.Actions.getCompletedProgram]([Params.StudentID], Headers)
}

export function voidCertificateWithEvent(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return StudentCertificateIf[config.Actions.voidCertificateWithEvent](
    [Params.StudentCertificateID, Params.Comment],
    Headers
  )
}
