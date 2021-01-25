import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.program.ProgramApplicationIF",
  Module: "hir",
  Actions: {
    saveApplicationAnswer: "saveApplicationAnswer",
    getProgramAppDetails: "getProgramAppDetails",
    searchProgramApplication: "searchProgramApplication",
    addApplicationComment: "addApplicationComment",
    addProgramAdmReqComment: "addProgramAdmReqComment",
    resubmitProgramAdmReq: "resubmitProgramAdmReq",
    changeProgramAdmReqStatus: "changeProgramAdmReqStatus",
    changeApplicationStatusWithEvent: "changeApplicationStatusWithEvent"
  }
}

export default ApiMethodFactory(config)
