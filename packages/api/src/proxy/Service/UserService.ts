import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "userService",
  Module: "hir",
  Actions: {
    findAllUsers: "findAllUsers",
    findUser: "findUser"
  }
}

export default ApiMethodFactory(config)
