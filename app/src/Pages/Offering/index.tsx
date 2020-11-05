// import * as React from "react"
// import { Row, Col, Typography } from "antd"
// import { OfferingTable } from "~/Component/Offering/OfferingTable"
// import { FilterOpenButton } from "~/Component/Offering/OfferingFilterOpenButton"
// import OfferingModalOpenButton from "~/Component/Offering/CreateEdit/OfferingModalOpenButton"
// import { RouteComponentProps } from "react-router-dom"
// import styles from "~/Pages/Offering/Offering.module.scss"
// import { useOfferings, useOfferingFilterState } from "~/Hooks/Offering"
// import OfferingSearchFilters from "~/Component/Common/SearchFilters"
// import OfferingSearchFilterMeta from "~/FormMeta/Offering/OfferingSearchFilterMeta"

// const { useState } = React
// const { Title } = Typography

// function OfferingPage(props: RouteComponentProps) {
//   const { filterData, updateFilterData } = useOfferingFilterState()
//   const [showFilter, setFilterVisiblity] = useState<boolean>(false)
//   const [filterCount, setFilterCount] = useState<number>(0)

//   const [loading, offeringItems] = useOfferings(filterData)

//   const toggleFilter = () => {
//     setFilterVisiblity(!showFilter)
//   }

//   return (
//     <div className="site-layout-content">
//       <Row>
//         <Title level={3}>Manage Offerings</Title>
//       </Row>
//       <FilterOpenButton
//         filterCount={filterCount}
//         filterColumnVisible={showFilter}
//         toggleFilter={toggleFilter}
//         actionButton={<OfferingModalOpenButton />}
//       />
//       <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
//         <OfferingSearchFilters
//           meta={OfferingSearchFilterMeta}
//           title="Offering Filter"
//           isModalView={false}
//           visible={showFilter}
//           hideFilters={toggleFilter}
//           initialFilter={filterData}
//           onApplyChanges={(newFilterValues, appliedFilterCount) => {
//             updateFilterData({ ...filterData, ...newFilterValues })
//             setFilterCount(appliedFilterCount)
//             setFilterVisiblity(false)
//           }}
//         />
//         <Col
//           className={`gutter-row ${styles.offeringDetails}`}
//           xs={24}
//           sm={24}
//           md={{ span: showFilter ? 17 : 24, offset: showFilter ? 1 : 0 }}
//         >
//           <OfferingTable dataSource={offeringItems} loading={loading} />
//         </Col>
//       </Row>
//     </div>
//   )
// }
// export default OfferingPage

import React, { useState } from "react"
import { Button, Space } from "antd"
import SearchPage from "~/Component/Common/Page/SearchPage"
import OfferingMenu from "~/Component/Offering/OfferingMenu"
import OfferingSearchFilterMeta from "~/FormMeta/Offering/OfferingSearchFilterMeta"
import { searchOffering } from "~/ApiServices/Service/OfferingService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { Link, RouteComponentProps } from "react-router-dom"
import OfferingFormModal from "~/Component/Offering/CreateEdit/OfferingFormModal"

export default function Offering(props: RouteComponentProps) {
  const [showModal, setShowModal] = useState(false)
  const columns: TableColumnType = [
    {
      title: "Offering Code",
      dataIndex: "OfferingCode",
      key: "OfferingCode",
      render: (text: any, record: any) => <Link to={`/offering/${record.OfferingID}`}>{text}</Link>,
      sorter: (a: any, b: any) => a.OfferingCode.length - b.OfferingCode.length
    },
    {
      title: "Offering Name",
      dataIndex: "OfferingName",
      key: "OfferingName",
      sorter: (a: any, b: any) => a.OfferingName.length - b.OfferingName.length
    },
    {
      title: "Creation Date",
      dataIndex: "CreationDate",
      key: "CreationDate",
      render: renderDate
    },
    {
      title: "Termination Date",
      dataIndex: "TerminationDate",
      key: "TerminationDate",
      render: renderDate
    },
    {
      title: "Status",
      dataIndex: "StatusCode",
      key: "StatusCode",
      sorter: (a: any, b: any) => a.StatusCode.length - b.StatusCode.length
    },
    {
      title: "Offering Type",
      dataIndex: "OfferingTypeName",
      key: "OfferingTypeName"
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <OfferingMenu offering={record} />
        </Space>
      )
    }
  ]

  return (
    <SearchPage
      blocks={[
        <>
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal(true)}>
            + Create Offering
          </Button>
          {showModal && <OfferingFormModal closeModal={() => setShowModal(false)} />}
        </>
      ]}
      title="Manage Offerings"
      meta={OfferingSearchFilterMeta}
      tableProps={{
        columns: columns,
        searchFunc: searchOffering,
        responsiveColumnIndices: [1, 2, 3, 4, 5],
        pagination: { position: ["topLeft"], pageSize: 20 },
        rowKey: "OfferingID"
      }}
    ></SearchPage>
  )
}
