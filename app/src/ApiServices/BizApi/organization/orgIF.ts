import OrgIf, { config } from "@packages/api/lib/proxy/BizApi/organization/orgIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { ORGANIZATION_TYPE_ID_FOR_PROGRAM_APPLICATION } from "~/utils/Constants"

export function getOrganizationByType(): Promise<IApiResponse> {
  return OrgIf[config.Actions.getOrganizationByType]([ORGANIZATION_TYPE_ID_FOR_PROGRAM_APPLICATION])
}
