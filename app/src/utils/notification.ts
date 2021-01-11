import { notification } from "antd"

export default (description: any) => {
  notification.open({
    message: "Success",
    description: description
  })
}
