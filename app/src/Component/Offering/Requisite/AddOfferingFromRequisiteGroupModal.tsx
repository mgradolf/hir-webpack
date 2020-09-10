import * as React from "react"
import Modal from "~/Component/Modal"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showAddOfferingFromRequisiteGroupModal } from "~/store/ModalState"
import { FilterColumn, IFilterValues } from "~/Component/Offering"
import { Row, Col, Card, Button } from "antd"
import { eventBus, REFRESH_OFFERING_REQUISITE_GROUP_PAGE } from "~/utils/EventBus"
import { Breakpoint } from "antd/lib/_util/responsiveObserve"
import moment from "moment"
import styles from "~/Component/Offering/Requisite/PrerequisiteGroups.module.scss"
import Title from "antd/lib/typography/Title"
import { addOfferingIntoRequisiteGroup } from "~/ApiServices/BizApi/course/requisiteIf"
import { useOfferings } from "~/Component/Offering/offeringUtils"
import ResponsiveTable from "~/Component/ResponsiveTable"

const { useState } = React

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
  const [loading, offeringItems] = useOfferings(filterData)
  const [modalSelectedPage, setModalPage] = useState<ModalPages>(ModalPages.FilterPage)
  const [selectedOfferings, setSelectedOfferings] = useState<any[]>([])

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

  const rowSelection: { [key: string]: any } = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedOfferings(selectedRows)
    },
    getCheckboxProps: (record: { name: string }) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name
    })
  }

  function handleSelect() {
    const selectedOfferingIds = selectedOfferings.map((offering) => offering.OfferingID)
    addOfferingIntoRequisiteGroup([selectedOfferingIds, requisiteGroupID])
    closeAddOfferingFromRequisiteGroupModal()
    eventBus.publish(REFRESH_OFFERING_REQUISITE_GROUP_PAGE)
  }

  return (
    <Modal showModal={true} width="1000px">
      {(modalSelectedPage === ModalPages.FilterPage && (
        <Row style={{ justifyContent: "center" }}>
          <FilterColumn
            isModalView={true}
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
          <Card style={{ maxHeight: "80vh", overflow: "scroll" }}>
            <Row>
              <Col span={12}>
                <Title level={3}>Add offerings</Title>
              </Col>
              <Col offset={8} className={styles.Table_config}>
                <Button
                  type="link"
                  onClick={() => {
                    setModalPage(ModalPages.FilterPage)
                  }}
                >
                  Go back
                </Button>
                <Button type="primary" disabled={selectedOfferings.length === 0} onClick={handleSelect}>
                  Select
                </Button>
              </Col>
            </Row>
            <ResponsiveTable
              columns={columns}
              dataSource={offeringItems}
              loading={loading}
              bordered
              rowSelection={rowSelection}
              expandableRowRender={expandableRowRender}
              rowKey="OfferingID"
              pagination={{ position: ["bottomLeft"] }}
              scroll={{ x: "fit-content" }}
            />
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
