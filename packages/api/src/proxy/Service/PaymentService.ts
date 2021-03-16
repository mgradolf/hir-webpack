import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "paymentService",
  Module: "hir",
  Actions: {
    savePaymentDueDatePolicy: "savePaymentDueDatePolicy",
    getPaymentDueDatePolicy: "getPaymentDueDatePolicy"
  }
}

export default ApiMethodFactory(config)
