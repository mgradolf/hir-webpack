import { useEffect, useState } from "react"
import { IApiPermissions, loadUserPermission } from "~/ApiServices/Service/HRUserService"

export interface IPermissionHook {}

export function usePermissionHook(service: string, action: string): boolean {
  const [permission, setPermission] = useState(false)
  useEffect(() => {
    loadUserPermission().then((x) => {
      const data: IApiPermissions = x.data
      if (x.success && data && data[service]) {
        setPermission(!!data[service][action])
      }
    })
  }, [service, action])
  return permission
}
