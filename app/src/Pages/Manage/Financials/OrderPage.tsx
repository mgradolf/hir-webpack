import React, { useState } from "react"
import { Redirect } from "react-router"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { OrderSearchMeta } from "~/TableSearchMeta/Order/OrderSearchMeta"
import { getOrderTableColumns } from "~/TableSearchMeta/Order/OrderTableColumns"

export default function OrderLogPage() {
  const [redirectTo, setRedirectTo] = useState<string>()
  return (
    <>
      {redirectTo && <Redirect to={redirectTo} />}
      <SearchPage
        title="Order"
        blocks={[
          <IconButton iconType="create" toolTip="Create Order" onClick={() => setRedirectTo("/create-order")} />
        ]}
        meta={OrderSearchMeta}
        metaName="OrderSearchMeta"
        hideSearchField={false}
        tableProps={getOrderTableColumns()}
        helpKey="financialsOrderSearchOrder"
      />
    </>
  )
}
