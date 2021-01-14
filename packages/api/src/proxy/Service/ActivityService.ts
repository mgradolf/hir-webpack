import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "ActivityService",
  Module: "hir",
  Actions: {
    getStudentAcademicActivity: "getStudentAcademicActivity",
    getStudentEnrollmentActivity: "getStudentEnrollmentActivity",
    getOrderActivity: "getOrderActivity",
    getCreditMemoActivity: "getCreditMemoActivity",
    getPaymentActivity: "getPaymentActivity"
  }
}

export default ApiMethodFactory(config)
