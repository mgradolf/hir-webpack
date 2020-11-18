import StudentCertificateIf, { config } from "@packages/api/lib/proxy/BizApi/certificate/studentCertificateIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getCompletedSection(Params: Array<any>): Promise<IApiResponse> {
  return StudentCertificateIf[config.Actions.getCompletedSection](Params)
}

export function getCompletedProgram(Params: Array<any>): Promise<IApiResponse> {
  return StudentCertificateIf[config.Actions.getCompletedProgram](Params)
}
