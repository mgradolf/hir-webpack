import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "programService",
  Module: "hir",
  Actions: {
    createOrUpdateProgramOffering: "createOrUpdateProgramOffering",
    saveOrUpdateEmailNotification: "saveOrUpdateEmailNotification",
    addOrUpdateOfferingRequirement: "addOrUpdateOfferingRequirement",
    saveOrUpdateProgramFinancial: "saveOrUpdateProgramFinancial"
  }
}

export default ApiMethodFactory(config)
