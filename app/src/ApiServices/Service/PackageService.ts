import PackageService, { config } from "@packages/api/lib/proxy/Service/PackageService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findPackages(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return PackageService[config.Actions.findPackages](Params, Headers)
}

export function savePackage(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return PackageService[config.Actions.savePackage](Params, Headers)
}

export function addPackageFinancial(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PackageService[config.Actions.addPackageFinancial](Params, Headers)
}

export function removePackageFinancial(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PackageService[config.Actions.removePackageFinancial](Params, Headers)
}

export function submitBulkOrder(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PackageService[config.Actions.submitBulkOrder](Params, Headers)
}

export function addSection(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return PackageService[config.Actions.addSection](Params, Headers)
}

export function updateSection(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return PackageService[config.Actions.updateSection](Params, Headers)
}

export function removeSection(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return PackageService[config.Actions.removeSection](Params, Headers)
}

export function getPackageReport(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PackageService[config.Actions.getPackageReport](Params, Headers)
}
