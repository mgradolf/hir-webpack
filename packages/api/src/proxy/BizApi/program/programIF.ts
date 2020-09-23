import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.program.ProgramIF",
  Module: "hir",
  Actions: {
    searchProgram: "searchProgram"
  }
}

export default ApiMethodFactory(config)
