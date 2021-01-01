import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "TagService",
  Module: "hir",
  Actions: {
    getTags: "getTags",
    getParentTags: "getParentTags",
    addTagIntoEntity: "addTagIntoEntity",
    removeTagFromEntity: "removeTagFromEntity",
    findTagContent: "findTagContent"
  }
}

export default ApiMethodFactory(config)
