import callApi from "../utils/CallApi"
import { setTokens } from "../utils/TokenStore"
import { ApiConfig } from "../utils/Interfaces"
import { convertToFormData } from "../utils/ConvertToFormData"

export async function login(UserName: string, UserPassword: string): Promise<any> {
  const requestConfig: ApiConfig = {
    baseURL: process.env.REACT_APP_API_ROOT,
    url: `api/login?UserName=${UserName}&UserPassword=${UserPassword}`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    // params: convertToFormData({ UserName, UserPassword })
  }

  const [response, error] = await callApi(requestConfig)
  console.log("*****************")
  console.log(response)
  console.log("*****************")
  setTokens(response.data["token"])
  return [response, error]
}
