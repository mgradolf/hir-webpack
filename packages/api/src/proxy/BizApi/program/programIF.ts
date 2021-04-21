import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.program.ProgramIF",
  Module: "hir",
  Actions: {
    searchProgram: "searchProgram",
    searchProgramOffering: "searchProgramOffering",
    deleteProgramOfferingWithEvent: "deleteProgramOfferingWithEvent",
    saveProgramWithEvent: "saveProgramWithEvent",
    copyProgramWithEvent: "copyProgramWithEvent",
    deleteProgramWithEvent: "deleteProgramWithEvent",
    deleteProgramReqGroupMember: "deleteProgramReqGroupMember",
    getProgramReqGroups: "getProgramReqGroups",
    getProgramReqGroupMembers: "getProgramReqGroupMembers",
    saveProgramReqGroup: "saveProgramReqGroup",
    deleteProgramReqGroup: "deleteProgramReqGroup",
    addProgramReqGroupMember: "addProgramReqGroupMember"
  }
}

export default ApiMethodFactory(config)
