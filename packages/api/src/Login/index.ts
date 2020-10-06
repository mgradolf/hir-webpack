import callApi from "../utils/CallApi"
import { setTokens } from "../utils/TokenStore"
import { ApiConfig, IApiResponse } from "../utils/Interfaces"
import { baseURL } from "../utils/ApiMethodFactory"

export async function login(UserName: string, UserPassword: string): Promise<IApiResponse> {
  const requestConfig: ApiConfig = {
    baseURL,
    url: `api/login?UserName=${UserName}&UserPassword=${UserPassword}`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }

  const response: IApiResponse = await callApi(requestConfig)
  if (response && response.success) {
    setTokens(response.data["token"])
  }
  return response
}
