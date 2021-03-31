import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "OfferingService",
  Module: "hir",
  Actions: {
    createOffering: "createOffering",
    updateOffering: "updateOffering",
    searchOffering: "searchOffering",
    removeOffering: "removeOffering",
    addOrRemoveOfferingToCatalog: "addOrRemoveOfferingToCatalog",
    createOfferingFinancial: "createOfferingFinancial",
    updateOfferingFinancial: "updateOfferingFinancial",
    searchOfferingFinancial: "searchOfferingFinancial",
    getOfferngApprovalHist: "getOfferngApprovalHist",
    setApprovalStatus: "setApprovalStatus",
    getOfferngApprovalStateList: "getOfferngApprovalStateList",
    getOfferingApprovalSendToList: "getOfferingApprovalSendToList",
    getRequisiteOfferingGroup: "getRequisiteOfferingGroup",
    getGroupOfferings: "getGroupOfferings",
    createRequisiteOfferingGroup: "createRequisiteOfferingGroup",
    updateRequisiteOfferingGroup: "updateRequisiteOfferingGroup",
    getQualifiedInstructors: "getQualifiedInstructors",
    updateInstructors: "updateInstructors",
    createSection: "createSection"
  }
}

export default ApiMethodFactory(config)
