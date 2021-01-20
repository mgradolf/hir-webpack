import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.membership.MembershipIF",
  Module: "hir",
  Actions: {
    findMembershipBeneficiaries: "findMembershipBeneficiaries",
    findMebershipTerms: "findMebershipTerms"
  }
}

export default ApiMethodFactory(config)
