import * as React from "react"
import Modal from "~/Component/Modal"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showAddOfferingFromRequisiteGroupModal } from "~/store/ModalState"
import { FilterColumn, IFilterValues } from "~/Component/Offering/FilterColumnModal"
import { Row, Table, Col, Grid, Card, Button } from "antd"
import { eventBus, REFRESH_OFFERING_PAGE } from "~/utils/EventBus"
import { searchOffering } from "~/ApiServices/Service/OfferingService"
import { Breakpoint } from "antd/lib/_util/responsiveObserve"
import moment from "moment"
import styles from "~/Component/Offering/FilterColumn.module.scss"

const { useEffect, useState } = React

interface IOfferingRequisiteGroupProps {
  offeringID: number
  requisiteGroupID: number
  closeAddOfferingFromRequisiteGroupModal: () => void
}

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
  ShowProgramOffering: "",
  TagName: "",
  TagTypeID: "",
  IsSearchTagHierarchy: "",
  OfferingNearCapacity: "",
  ToFinalEnrollmentDate: "",
  FromFinalEnrollmentDate: ""
}

enum ModalPages {
  FilterPage,
  OfferingsList
}

function AddOfferingFromRequisiteGroupModal({
  offeringID,
  requisiteGroupID,
  closeAddOfferingFromRequisiteGroupModal
}: IOfferingRequisiteGroupProps) {
  const [filterData, updateFilterData] = useState<IFilterValues>(INITIAL_FILTER_DATA)
  const [offeringItems, setOfferingItems] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [modalSelectedPage, setModalPage] = useState<ModalPages>(ModalPages.FilterPage)
  const [selectedOfferings, setSelectedOfferings] = useState([])

  const { useBreakpoint } = Grid
  const screens = useBreakpoint() as { [key: string]: boolean } // {xs: false, sm: true, md: false, lg: false, xl: false, …}
  const breakpoints = ["md", "lg", "xl", "xxl"]
  const display = breakpoints.filter((x) => screens[x]).length === 0

  console.log("offeirng ID: " + offeringID)
  console.log("requsitite group ID: " + requisiteGroupID)

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
      params["StatusID"] = filterData.StatusID !== "" ? Number(filterData.StatusID) : undefined
      params["Coordinator"] = filterData.Coordinator !== "" ? filterData.Coordinator : undefined
      params["OrganizationID"] = filterData.OrganizationID !== "" ? Number(filterData.OrganizationID) : undefined
      params["OfferingTypeID"] = filterData.OfferingTypeID !== "" ? Number(filterData.OfferingTypeID) : undefined
      params["SectionTypeID"] = filterData.SectionTypeID !== "" ? Number(filterData.SectionTypeID) : undefined
      params["InstructorID"] = filterData.InstructorID !== "" ? Number(filterData.InstructorID) : undefined
      params["ShowProgramOffering"] = filterData.ShowProgramOffering !== "" ? filterData.ShowProgramOffering : undefined
      params["OfferingNearCapacity"] =
        filterData.OfferingNearCapacity !== "" ? filterData.OfferingNearCapacity : undefined
      params["IsQuickAdmit"] = filterData.IsQuickAdmit !== "" ? Boolean(filterData.IsQuickAdmit) : undefined
      params["IsSearchTagHierarchy"] =
        filterData.IsSearchTagHierarchy !== "" ? Boolean(filterData.IsSearchTagHierarchy) : undefined
      params["TagName"] = filterData.TagName !== "" ? filterData.TagName : undefined
      params["TagTypeID"] = filterData.TagTypeID !== "" ? filterData.TagTypeID : undefined
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

  const columns = [
    {
      title: "Offering Code",
      dataIndex: "OfferingCode",
      key: "OfferingCode",
      render: (text: any, record: any) => <span>{text}</span>,
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
      responsive: ["md", "lg", "xl", "xxl"] as Breakpoint[],
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "Termination Date",
      dataIndex: "TerminationDate",
      key: "TerminationDate",
      responsive: ["md", "lg", "xl", "xxl"] as Breakpoint[],
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "Status",
      dataIndex: "StatusCode",
      key: "StatusCode",
      responsive: ["md", "lg", "xl", "xxl"] as Breakpoint[],
      sorter: (a: any, b: any) => a.StatusCode.length - b.StatusCode.length
    },
    {
      title: "Department",
      dataIndex: "OrganizationName",
      responsive: ["md", "lg", "xl", "xxl"] as Breakpoint[],
      key: "OrganizationName"
    },
    {
      title: "Offering Type",
      dataIndex: "OfferingTypeName",
      responsive: ["md", "lg", "xl", "xxl"] as Breakpoint[],
      key: "OfferingTypeName"
    },
    {
      title: "Def Section",
      dataIndex: "SectionTypeName",
      responsive: ["md", "lg", "xl", "xxl"] as Breakpoint[],
      key: "SectionTypeName"
    }
  ]

  function expandableRowRender(data: any, display: boolean) {
    return (
      <div style={{ border: "1px solid", padding: "5px" }}>
        <Row>
          <Col span="8">Description:</Col>
          <Col span="16">{data.OfferingDescription}</Col>
        </Row>
        {display && (
          <Row>
            <Col span="8">Creation Date:</Col>
            <Col span="16">{data.CreationDate}</Col>
          </Row>
        )}

        {display && (
          <Row>
            <Col span="8">Termination Date:</Col>
            <Col span="16">{data.TerminationDate}</Col>
          </Row>
        )}

        {display && (
          <Row>
            <Col span="8">Status:</Col>
            <Col span="16">{data.StatusCode}</Col>
          </Row>
        )}

        {display && (
          <Row>
            <Col span="8">Department:</Col>
            <Col span="16">{data.OrganizationName}</Col>
          </Row>
        )}
        {display && (
          <Row>
            <Col span="8">Offering Type:</Col>
            <Col span="16">{data.OfferingTypeName}</Col>
          </Row>
        )}
        {display && (
          <Row>
            <Col span="8">Def Section:</Col>
            <Col span="16">{data.SectionTypeName}</Col>
          </Row>
        )}
      </div>
    )
  }

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedOfferings(selectedRows)
    },
    getCheckboxProps: (record: { name: string }) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name
    })
  }

  console.log(selectedOfferings)

  return (
    <Modal showModal={true} width="1000px" closable>
      {(modalSelectedPage === ModalPages.FilterPage && (
        <Row style={{ justifyContent: "center" }}>
          <FilterColumn
            data={filterData}
            visible
            toggleVisiibility={() => {
              closeAddOfferingFromRequisiteGroupModal()
              setSelectedOfferings([])
            }}
            onApplyChanges={(newFilterValues) => {
              updateFilterData({ ...filterData, ...newFilterValues })
              setModalPage(ModalPages.OfferingsList)
            }}
          />
        </Row>
      )) ||
        (modalSelectedPage === ModalPages.OfferingsList && (
          <Card style={{ maxHeight: "1000px", overflow: "scroll" }}>
            <Table
              columns={columns}
              dataSource={offeringItems}
              loading={loading}
              bordered
              rowSelection={rowSelection}
              expandedRowRender={(record, index, indent, expanded) => {
                return expandableRowRender(record, display)
              }}
              rowKey="OfferingID"
              pagination={{ position: ["topLeft"] }}
              scroll={{ x: "fit-content" }}
            />
            <Row className={styles.floatRight}>
              <Button
                type="primary"
                disabled={selectedOfferings.length === 0}
                className={styles.applyBtn}
                onClick={() => {
                  closeAddOfferingFromRequisiteGroupModal()
                }}
              >
                Select
              </Button>
            </Row>
          </Card>
        )) || <></>}
    </Modal>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeAddOfferingFromRequisiteGroupModal: () => dispatch(showAddOfferingFromRequisiteGroupModal(false))
  }
}

export default connect(undefined, mapDispatchToProps)(AddOfferingFromRequisiteGroupModal)
