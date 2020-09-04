import * as React from "react"
import { Row, Col, Typography } from "antd"
import { SelectedFilters, FilterColumn, IFilterValues, OfferingTable } from "~/Component/Offering"
import { searchOffering } from "~/ApiServices/Service/OfferingService"
import { RouteComponentProps } from "react-router-dom"
import styles from "~/pages/Offering/Offering.module.scss"
import { REFRESH_OFFERING_PAGE, eventBus } from "~/utils/EventBus"

const { useState, useEffect } = React
const { Title } = Typography

const INITIAL_FILTER_DATA: IFilterValues = {
  OfferingCode: "",
  OfferingName: "",
  ToCreationDate: "",
  FromCreationDate: "",
  ToTerminationDate: "",
  FromTerminationDate: "",
  IsQuickAdmit: "",
  StatusID: "",
  Coordinator: "",
  OrganizationID: "",
  OfferingTypeID: "",
  SectionTypeID: "",
  InstructorID: "",
  showProgramOffering: "",
  ComboSearchTagHierarchy: "",
  ComboSearchTagTypeIDHierarchy: "",
  ToFinalEnrollmentDate: "",
  FromFinalEnrollmentDate: ""
}

function OfferingPage(props: RouteComponentProps) {
  const [filterData, updateFilterData] = useState<IFilterValues>(INITIAL_FILTER_DATA)
  const [showFilter, setFilterVisiblity] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [offeringItems, setOfferingItems] = useState<Array<any>>([])

  const [filterCount, setFilterCount] = useState<number>(0)

  useEffect(() => {
    const loadOfferings = async function () {
      setLoading(true)

      const params: { [key: string]: any } = {}
      params["OfferingCode"] = filterData.OfferingCode !== "" ? filterData.OfferingCode : "*"
      params["OfferingName"] = filterData.OfferingName !== "" ? filterData.OfferingName : undefined
      params["ToCreationDate"] = filterData.ToCreationDate !== "" ? filterData.ToCreationDate : undefined
      params["FromCreationDate"] = filterData.FromCreationDate !== "" ? filterData.FromCreationDate : undefined
      params["ToTerminationDate"] = filterData.ToTerminationDate !== "" ? filterData.ToTerminationDate : undefined
      params["FromTerminationDate"] = filterData.FromTerminationDate !== "" ? filterData.FromTerminationDate : undefined
      params["IsQuickAdmit"] = filterData.IsQuickAdmit !== "" ? filterData.IsQuickAdmit : undefined
      params["StatusID"] = filterData.StatusID !== "" ? Number(filterData.StatusID) : undefined
      params["Coordinator"] = filterData.Coordinator !== "" ? filterData.Coordinator : undefined
      params["OrganizationID"] = filterData.OrganizationID !== "" ? Number(filterData.OrganizationID) : undefined
      params["OfferingTypeID"] = filterData.OfferingTypeID !== "" ? Number(filterData.OfferingTypeID) : undefined
      params["SectionTypeID"] = filterData.SectionTypeID !== "" ? Number(filterData.SectionTypeID) : undefined
      params["InstructorID"] = filterData.InstructorID !== "" ? Number(filterData.InstructorID) : undefined
      params["showProgramOffering"] = filterData.showProgramOffering !== "" ? filterData.showProgramOffering : undefined
      params["ComboSearchTagHierarchy"] =
        filterData.ComboSearchTagHierarchy !== "" ? filterData.ComboSearchTagHierarchy : undefined
      params["ComboSearchTagTypeIDHierarchy"] =
        filterData.ComboSearchTagTypeIDHierarchy !== "" ? filterData.ComboSearchTagTypeIDHierarchy : undefined
      params["ToFinalEnrollmentDate"] =
        filterData.ToFinalEnrollmentDate !== "" ? filterData.ToFinalEnrollmentDate : undefined
      params["FromFinalEnrollmentDate"] =
        filterData.FromFinalEnrollmentDate !== "" ? filterData.FromFinalEnrollmentDate : undefined

      const objectKeys = Object.keys(params)
      objectKeys.forEach((key) => {
        if (!Boolean(params[key]) && typeof params[key] !== "number") {
          delete params[key]
        }
      })

      const result = await searchOffering(params)

      if (result && result.success) {
        setOfferingItems(result.data)
      }
      setLoading(false)
    }
    eventBus.subscribe(REFRESH_OFFERING_PAGE, loadOfferings)
    eventBus.publish(REFRESH_OFFERING_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_OFFERING_PAGE)
    }
  }, [filterData])

  const toggleFilter = () => {
    setFilterVisiblity(!showFilter)
  }

  return (
    <div className="site-layout-content">
      <Row>
        <Title level={3}>Manage Offerings</Title>
      </Row>
      <SelectedFilters filterCount={filterCount} filterColumnVisible={showFilter} toggleFilter={toggleFilter} />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={styles.paddingTop10px}>
        <FilterColumn
          visible={showFilter}
          toggleVisiibility={toggleFilter}
          data={filterData}
          onApplyChanges={(newFilterValues, appliedFilterCount) => {
            updateFilterData({ ...filterData, ...newFilterValues })
            setFilterCount(appliedFilterCount)
          }}
        />
        <Col
          className={`gutter-row ${styles.offeringDetails}`}
          xs={24}
          sm={24}
          md={{ span: showFilter ? 18 : 24, offset: showFilter ? 1 : 0 }}
        >
          <OfferingTable dataSource={offeringItems} loading={loading} />
        </Col>
      </Row>
    </div>
  )
}
export default OfferingPage
