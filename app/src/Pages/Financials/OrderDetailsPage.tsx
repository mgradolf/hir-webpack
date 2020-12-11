// import React from "react"
// import { RouteComponentProps } from "react-router-dom"
// import { findAccountForLookUp } from "~/ApiServices/BizApi/account/accountIF"
// import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
// import { getAccountDetailsMeta } from "~/FormMeta/Account/AccountDetailsMeta"

// export default function AccountDetailsPage(props: RouteComponentProps<{ accountID: string }>) {
//   const AccountID = Number(props?.match?.params?.accountID)
//   return (
//     <DetailsPage
//       getMeta={getAccountDetailsMeta}
//       getDetails={() =>
//         findAccountForLookUp({ AccountID }).then((x) => {
//           if (x.success) x.data = x.data[0]
//           return x
//         })
//       }
//       entityType="Account"
//       entityID={AccountID}
//     />
//   )
// }

import React from "react"
import { Tabs } from "antd"
import { RouteComponentProps } from "react-router-dom"
import Details from "~/Component/Section/Order/Details/OrderDetails"
import OrderItems from "~/Component/Section/Order/Details/OrderItems"
import Orderlines from "~/Component/Section/Order/Details/Orderlines"
import OrderCredits from "~/Component/Section/Order/Details/OrderCredits"
import OrderPaymentsLines from "~/Component/Section/Order/Details/OrderPaymentsLines"
import OrderReturnItems from "~/Component/Section/Order/Details/OrderReturnItems"
import OrderRegistrations from "~/Component/Section/Order/Details/OrderRegistration"

export default function OrderDetails(props: RouteComponentProps<{ sectionID: string; orderID: string }>) {
  const OrderID = Number(props.match.params.orderID)
  const SectionID = Number(props.match.params.sectionID)
  return (
    <div className="site-layout-content">
      <Tabs defaultActiveKey="1" type="card" size="large">
        <Tabs.TabPane tab="Order Details" key="1">
          <Details OrderID={OrderID} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Order Items" key="2">
          <OrderItems OrderID={OrderID} SectionID={SectionID} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Order Lines" key="3">
          <Orderlines OrderID={OrderID} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Credits/Discount" key="4">
          <OrderCredits OrderID={OrderID} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Payments" key="5">
          <OrderPaymentsLines OrderID={OrderID} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Returns" key="6">
          <OrderReturnItems OrderID={OrderID} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Registrations" key="7">
          <OrderRegistrations OrderID={OrderID} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
