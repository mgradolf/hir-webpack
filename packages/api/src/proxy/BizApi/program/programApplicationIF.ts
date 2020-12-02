import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.program.ProgramApplicationIF",
  Module: "hir",
  Actions: {
    searchProgramApplication: "searchProgramApplication"
  }
}

export default ApiMethodFactory(config)
