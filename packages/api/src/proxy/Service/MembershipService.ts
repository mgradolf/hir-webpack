import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "MembershipService",
  Module: "hir",
  Actions: {
    getMembershipCollection: "getMembershipCollection"
  }
}

export default ApiMethodFactory(config)
