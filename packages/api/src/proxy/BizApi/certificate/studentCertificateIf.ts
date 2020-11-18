import ApiMethodFactory, { Iconfig } from "../../../utils/ApiMethodFactory"

export const config: Iconfig = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.certificate.StudentCertificateIF",
  Module: "hir",
  Actions: {
    getCompletedSection: "getCompletedSection",
    getCompletedProgram: "getCompletedProgram"
  }
}

export default ApiMethodFactory(config)
