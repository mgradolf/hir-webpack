import { AxiosRequestConfig } from 'axios'

const common: AxiosRequestConfig = {
  url: 'api/hirServlet',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  data: {
    Service: 'OfferingService'
  }
}

export default common
