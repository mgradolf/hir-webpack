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
    getProgramAdmReqGroups: "getProgramAdmReqGroups",
    getProgramAdmReqGroup: "getProgramAdmReqGroup",
    getProgramAdmReqs: "getProgramAdmReqs",
    deleteProgramAdmReqGroup: "deleteProgramAdmReqGroup",
    deleteProgramAdmReq: "deleteProgramAdmReq",
    deleteProgramReqGroupMember: "deleteProgramReqGroupMember",
    getProgramReqGroups: "getProgramReqGroups",
    getProgramReqGroupMembers: "getProgramReqGroupMembers",
    getProgramAdmReq: "getProgramAdmReq",
    saveProgramReqGroup: "saveProgramReqGroup",
    deleteProgramReqGroup: "deleteProgramReqGroup",
    addProgramReqGroupMember: "addProgramReqGroupMember",
    getProgramFinancials: "getProgramFinancials",
    deleteProgramFinancial: "deleteProgramFinancial"
  }
}

export default ApiMethodFactory(config)
