import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.query.QueryIF",
  Module: "hir",
  Actions: {
    executeDomainListWithoutPagination: "executeDomainListWithoutPagination",
    executeDomainListWithPagination: "executeDomainListWithPagination",
    findEnrollmentHistory: "findEnrollmentHistory",
    executeDomainList: "executeDomainList"
  }
}

export default ApiMethodFactory(config)
