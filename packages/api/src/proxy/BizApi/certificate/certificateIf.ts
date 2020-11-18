import ApiMethodFactory, { Iconfig } from "../../../utils/ApiMethodFactory"

export const config: Iconfig = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.certificate.CertificateIF",
  Module: "hir",
  Actions: {
    getApplicableSectionCertificate: "getApplicableSectionCertificate",
    getApplicableProgramCertificate: "getApplicableProgramCertificate"
  }
}

export default ApiMethodFactory(config)
