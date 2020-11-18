import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.course.CourseIF",
  Module: "hir",
  Actions: {
    getSection: "getSection",
    offeringTypehasSectionType: "offeringTypehasSectionType",
    deleteSection: "deleteSection",
    searchSection: "searchSection",
    findSectionNotice: "findSectionNotice",
    createSectionNotice: "createSectionNotice",
    findAvailableAffiliatedOrgs: "findAvailableAffiliatedOrgs"
  }
}

export default ApiMethodFactory(config)
