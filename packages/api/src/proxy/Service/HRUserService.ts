import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "HRUserService",
  Module: "hir",
  Actions: {
    getAllUsers: "getAllUsers",
    getUserByUserLogin: "getUserByUserLogin",
    getUserByUserID: "getUserByUserID",
    getUsersByRole: "getUsersByRole"
  }
}

export default ApiMethodFactory(config)
