import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.certificate.CertificateIF",
  Module: "hir",
  Actions: {
    getApplicableSectionCertificate: "getApplicableSectionCertificate",
    getApplicableProgramCertificate: "getApplicableProgramCertificate",
    searchCertificate: "searchCertificate"
  }
}

export default ApiMethodFactory(config)
