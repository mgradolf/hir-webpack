// import * as React from "react"
// import { Row, Col, Typography } from "antd"
// import SectionFilterOpenButton from "~/Component/Section/SectionFilterOpenButton"
// import SectionTable from "~/Component/Section/SectionTable"
// import { RouteComponentProps } from "react-router-dom"
// // import { useSectionFilterState, useSections } from "~/Hooks/Section"
// import SectionSearchFilters from "~/Component/Common/SearchFilters"
// import SectionSearchFilterMeta from "~/FormMeta/Section/SectionSearchFilterMeta"
// import SectionModalOpenButton from "~/Component/Section/CreateEdit/SectionModalOpenButton"
// import styles from "~/Pages/Offering/Offering.module.scss"

// const { useState } = React
// const { Title } = Typography

// export default function OfferingPage(props: RouteComponentProps<{ offeringID: string }>) {
//   const OfferingID = parseInt(props.match.params.offeringID) || undefined
//   // const { filterData, updateFilterData } = useSectionFilterState()
//   // const [filterCount, setFilterCount] = useState<number>(0)

//   // const [loading, sectionItems] = useSections(filterData, OfferingID)
//   const [showFilter, setFilterVisiblity] = useState<boolean>(false)
//   const [searchParams, setSearchParams] = useState<{ [key: string]: any }>({})
//   const [filterCount, setFilterCount] = useState<number>(0)

//   const toggleFilter = () => {
//     setFilterVisiblity(!showFilter)
//   }
//   return (
//     <div className="site-layout-content">
//       <Row>
//         <Title level={3}>Manage Sections</Title>
//       </Row>
//       <SectionFilterOpenButton
//         filterCount={filterCount}
//         filterColumnVisible={showFilter}
//         toggleFilter={toggleFilter}
//         actionButton={OfferingID ? <SectionModalOpenButton OfferingID={OfferingID} /> : undefined}
//       />
//       <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
//         <SectionSearchFilters
//           title={""}
//           isModalView={false}
//           visible={showFilter}
//           hideFilters={toggleFilter}
//           meta={SectionSearchFilterMeta}
//           initialFilter={searchParams}
//           onApplyChanges={(newFilterValues, appliedFilterCount) => {
//             setSearchParams(newFilterValues)
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
//           <SectionTable searchParams={searchParams} offeringID={OfferingID} />
//         </Col>
//       </Row>
//     </div>
//   )
// }

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
import SectionSearchFilterMeta from "~/FormMeta/Section/SectionSearchFilterMeta"
import { ColumnsType } from "antd/lib/table"
import { RecordType } from "~/Component/Common/ResponsiveTable"
import { Link, RouteComponentProps } from "react-router-dom"
import moment from "moment"
import SectionMenu from "~/Component/Section/SectionMenu"
import { searchSection } from "~/ApiServices/BizApi/course/courseIF"
import SectionFormModal from "~/Component/Section/CreateEdit/SectionFormModal"

export default function Offering(props: RouteComponentProps<{ offeringID: string }>) {
  const offeringID = Number(props.match.params.offeringID)
  const [showModal, setShowModal] = useState(false)
  const columns: ColumnsType<RecordType> = [
    {
      title: "Section Number",
      dataIndex: "SectionNumber",
      key: "SectionNumber",
      render: (text: any, record: any) => (
        <Link to={offeringID ? `/offering/${offeringID}/section/${record.SectionID}` : `/section/${record.SectionID}`}>
          {text}
        </Link>
      ),
      sorter: (a: any, b: any) => a.SectionNumber.length - b.SectionNumber.length
    },
    {
      title: "Offering Name",
      dataIndex: "OfferingName",
      key: "OfferingName",
      sorter: (a: any, b: any) => a.OfferingName.length - b.OfferingName.length
    },
    {
      title: "Offering Code",
      dataIndex: "OfferingCode",
      key: "OfferingCode",
      sorter: (a: any, b: any) => a.OfferingCode.length - b.OfferingCode.length,
      render: (text: any, record: any) => <Link to={`/offering/${record.OfferingID}`}>{text}</Link>
    },
    {
      title: "Creation Date",
      dataIndex: "CreationDate",
      key: "CreationDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "Termination Date",
      dataIndex: "TerminationDate",
      key: "TerminationDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "Instructors",
      dataIndex: "Faculty",
      key: "Faculty",
      render: (faculties: Array<any> | null) => {
        return (
          Array.isArray(faculties) &&
          faculties.map((x: any, index: number) => <div key={x.FacultyDescriptor + index}>- {x.FacultyDescriptor}</div>)
        )
      }
    },
    {
      title: "Status",
      dataIndex: "StatusCode",
      key: "StatusCode"
    },
    {
      title: "Start Date",
      dataIndex: "StartDate",
      key: "StartDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "Locations",
      dataIndex: "Locations",
      key: "Locations",
      render: (locations: Array<string | null> | null) => {
        return Array.isArray(locations) && locations.map((x: any) => (x ? <span>{x}</span> : null))
      }
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <SectionMenu section={record} />
        </Space>
      )
    }
  ]

  return (
    <SearchPage
      blocks={[
        <>
          {setShowModal && (
            <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal && setShowModal(true)}>
              + Create Section
            </Button>
          )}
          {showModal && <SectionFormModal OfferingID={offeringID} closeModal={() => setShowModal(false)} />}
        </>
      ]}
      hideSearchField={true}
      title="Manage Offerings"
      meta={SectionSearchFilterMeta}
      tableProps={{
        columns: columns,
        searchFunc: searchSection,
        responsiveColumnIndices: [1, 2, 3, 4, 5],
        pagination: { position: ["topLeft"], pageSize: 20 },
        rowKey: "OfferingID"
      }}
    ></SearchPage>
  )
}
