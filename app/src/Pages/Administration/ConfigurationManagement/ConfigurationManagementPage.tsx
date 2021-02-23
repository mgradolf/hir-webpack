import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getSystemConfigurationTableColumns } from "~/TableSearchMeta/SystemConfiguration/SystemConfigurationTableColumns"

export default function ConfigurationManagementPage() {
  return (
    <SearchPage
      title="Configuration Management"
      defaultFormValue={{}}
      tableProps={{
        ...getSystemConfigurationTableColumns()
      }}
    ></SearchPage>
  )
}
