import callApi from 'src/call_api'
import { AxiosRequestConfig } from 'axios'

interface OfferingCreateBody {
  FinancialTypeID: number
  ApplyToID: number
  FinancialBasisTypeID: number
  FinancialCategoryTypeID: number
  Description: string
  ItemUnitAmount: number
  IsCharge: boolean
  IsOptional: boolean
  IsActive: boolean
  Weight: number
  IsTaxable: boolean
  GLAccountID: number
}

export async function addRmOfferingToCatalogs(
  Params: OfferingCreateBody
): Promise<any> {
  const requestConfig: AxiosRequestConfig = {
    url: 'api/hirServlet',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      Service: 'OfferingService',
      Action: 'createOfferingFinancial',
      Params
    }
  }

  const response = await callApi(requestConfig)
  return response
}
