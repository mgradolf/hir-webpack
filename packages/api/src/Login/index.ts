import { setTokens } from "../utils/TokenStore"
import { setUsername } from "../utils/UserInfoStore"
import { IApiResponse } from "../utils/Interfaces"
import { baseURL } from "../utils/ApiMethodFactory"
import { handleResponse } from "../utils/HandleResponse"
import axios, { AxiosRequestConfig } from "axios"

export async function login(UserName: string, UserPassword: string): Promise<IApiResponse> {
  const requestConfig: AxiosRequestConfig = {
    baseURL,
    url: `api/login?UserName=${UserName}&UserPassword=${UserPassword}`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }
  requestConfig.withCredentials = true
  const response: IApiResponse = await handleResponse(axios.request(requestConfig))
  if (response && response.success) {
    setTokens(response.data["token"])
    setUsername(UserName)
  }
  return response
}
