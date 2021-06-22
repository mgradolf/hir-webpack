import CertificateIf, { config } from "@packages/api/lib/proxy/BizApi/certificate/certificateIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getApplicableSectionCertificate(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CertificateIf[config.Actions.getApplicableSectionCertificate]([Params.SectionID], Headers)
}

export function getApplicableProgramCertificate(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CertificateIf[config.Actions.getApplicableProgramCertificate]([Params.ProgramID], Headers)
}

export function searchCertificate(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CertificateIf[config.Actions.searchCertificate]([Params], Headers)
}

export function canDeleteCertificate(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CertificateIf[config.Actions.canDeleteCertificate]([Params.CertificateID], Headers)
}

export function deleteCertificate(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CertificateIf[config.Actions.deleteCertificate]([Params.CertificateID], Headers)
}
