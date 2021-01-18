import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "PaymentGatewayService",
  Module: "hir",
  Actions: {
    findPaymentGatewayActivities: "findPaymentGatewayActivities"
  }
}

export default ApiMethodFactory(config)
