import React, { useEffect, useState } from "react"
import SearchFilters from "~/Component/Common/SearchFilters"
import AccountTable from "~/Component/Account/AccountTable"
import AccountSearchFilterMeta from "~/FormMeta/Account/AccountSearchFilterMeta"
import { findAccountForLookUp } from "~/ApiServices/BizApi/account/accountIF"

export default function AccountPage() {
  const [filterData, updateFilterData] = useState<{ [key: string]: any }>({})
  const [loading, setLoading] = useState(false)
  const [accounts, setAccounts] = useState<any[]>([])

  useEffect(() => {
    setLoading(true)
    findAccountForLookUp([filterData]).then((x) => {
      if (x.success) setAccounts(x.data)
      setLoading(false)
    })
  }, [filterData])

  return (
    <div className="site-layout-content">
      <SearchFilters
        meta={AccountSearchFilterMeta}
        isModalView={true}
        initialFilter={filterData}
        title="Account Filter"
        visible={true}
        isCheckeble={false}
        toggleVisiibility={() => console.log("s")}
        onApplyChanges={(newFilterValues, newFilterCount) => {
          updateFilterData(newFilterValues)
        }}
      />

      <AccountTable dataSource={accounts} loading={loading} isModal={true} />
    </div>
  )
}
