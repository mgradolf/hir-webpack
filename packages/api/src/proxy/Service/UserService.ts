import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "userService",
  Module: "hir",
  Actions: {
    findAllUsers: "findAllUsers",
    findUser: "findUser",
    saveUser: "saveUser",
    findAllUserRoles: "findAllUserRoles",
    changePassword: "changePassword"
  }
}

export default ApiMethodFactory(config)
