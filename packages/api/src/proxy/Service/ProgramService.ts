import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "programService",
  Module: "hir",
  Actions: {
    createOrUpdateProgramOffering: "createOrUpdateProgramOffering",
    saveOrUpdateEmailNotification: "saveOrUpdateEmailNotification",
    addOrUpdateAdmissionRequirement: "addOrUpdateAdmissionRequirement",
    saveOrUpdateAdmissionRequirementGroups: "saveOrUpdateAdmissionRequirementGroups",
    addOrUpdateOfferingRequirement: "addOrUpdateOfferingRequirement",
    saveOrUpdateProgramFinancial: "saveOrUpdateProgramFinancial",
    getProgramDetails: "getProgramDetails"
  }
}

export default ApiMethodFactory(config)
