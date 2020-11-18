import CertificateIf, { config } from "@packages/api/lib/proxy/BizApi/certificate/certificateIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getApplicableSectionCertificate(Params: Array<any>): Promise<IApiResponse> {
  return CertificateIf[config.Actions.getApplicableSectionCertificate](Params)
}

export function getApplicableProgramCertificate(Params: Array<any>): Promise<IApiResponse> {
  return CertificateIf[config.Actions.getApplicableProgramCertificate](Params)
}
