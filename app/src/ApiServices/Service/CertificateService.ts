import CertificateService, { config } from "@packages/api/lib/proxy/Service/CertificateService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function saveOrUpdateCertificate(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CertificateService[config.Actions.createOrUpdateCertificate](Params, Headers)
}

export function getStaticParams(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CertificateService[config.Actions.getStaticParams](Params, Headers)
}

export function previewCertificate(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CertificateService[config.Actions.previewCertificate](Params, Headers)
}
