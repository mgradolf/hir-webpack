import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.program.ProgramCommunicationIF",
  Module: "hir",
  Actions: {
    getProgramEmailEventNameLookup: "getProgramEmailEventNameLookup",
    getProgramEmailNotice: "getProgramEmailNotice",
    getRecipientWithTag: "getRecipientWithTag",
    addRecipientUserID: "addRecipientUserID",
    removeRecipientUserID: "removeRecipientUserID",
    addRecipientEmailAddress: "addRecipientEmailAddress",
    removeRecipientEmailAddress: "removeRecipientEmailAddress"
  }
}

export default ApiMethodFactory(config)
