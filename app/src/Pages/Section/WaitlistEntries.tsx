import { Button, Col, Row } from "antd"
import { ColumnsType } from "antd/lib/table"
import moment from "moment"
import React, { useEffect, useState } from "react"
import WaitlistEntriesFormModal from "~/Component/Section/WaitlistEntries/CreateEdit/FormModal"
import WaitlistEntriesSearchFilterMeta from "~/FormMeta/WaitlistEntries/WaitlistEntriesSearchFilterMeta"
import { findWaitListEntries } from "~/ApiServices/BizApi/registration/waitlistIF"
import { deleteWaitListEntry } from "~/ApiServices/Service/WaitlistEntryService"
import SearchPage from "~/Component/Common/Page/SearchPage"
import { RecordType } from "~/Component/Common/ResponsiveTable"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { RouteComponentProps } from "react-router-dom"

export default function WaitlistEntryPage(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  const [modifiedMeta, setModifiedMeta] = useState<any[]>([])
  const [entryToEdit, setEntryToEdit] = useState()
  const [showCreateModal, setShowCreateModal] = useState(false)
  useEffect(() => {
    const [meta, ...othermetas] = WaitlistEntriesSearchFilterMeta
    setModifiedMeta([
      {
        ...meta,
        extraProps: {
          SectionID
        }
      },
      ...othermetas
    ])
  }, [SectionID])
  useEffect(() => {
    if (entryToEdit) {
      setShowCreateModal(true)
    }
  }, [entryToEdit])
  const columns: ColumnsType<RecordType> = [
    {
      title: "SectionNumber",
      dataIndex: "SectionNumber",
      width: 150
    },
    {
      title: "SeatGroupName",
      dataIndex: "SeatGroupName",
      width: 150
    },
    {
      title: "AccountName",
      dataIndex: "AccountName",
      width: 150
    },
    {
      title: "PurchaserName",
      dataIndex: "PurchaserName",
      width: 150
    },
    {
      title: "StudentName",
      dataIndex: "StudentName",
      width: 150
    },
    {
      title: "Email",
      dataIndex: "StudentEmailAddress",
      width: 150
    },
    {
      title: "Request State",
      dataIndex: "RequestState",
      width: 150
    },
    {
      title: "Priority",
      dataIndex: "Priority",
      width: 150
    },
    {
      title: "Email",
      dataIndex: "StudentEmailAddress",
      width: 150
    },
    {
      title: "CreationTime",
      dataIndex: "CreationTime",
      width: 150
    },
    {
      title: "ExpirationTime",
      dataIndex: "RequestExpirationTime",
      width: 150
    },
    {
      title: "Source",
      dataIndex: "Source",
      width: 150
    },
    {
      title: "Edit",
      render: (text: any, record: any) => {
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                setEntryToEdit(record)
              }}
            >
              Edit
            </Button>
            <Button
              danger
              onClick={() => {
                deleteWaitListEntry({ WaitListEntryID: record.WaitListEntryID }).then((x) => {
                  if (x.success) eventBus.publish(REFRESH_PAGE)
                })
              }}
            >
              Remove
            </Button>
          </>
        )
      }
    }
  ]

  const expandableRowRender = (data: any, mobileView: boolean): JSX.Element => {
    return (
      <div style={{ border: "1px solid", padding: "5px" }}>
        {mobileView && (
          <Row>
            <Col span="10">Start Date:</Col>
            <Col span="14">{moment(data.startDate).format("YYYY-MM-DD")}</Col>
          </Row>
        )}
        {mobileView && (
          <Row>
            <Col span="10">End Date:</Col>
            <Col span="14">{moment(data.endDate).format("YYYY-MM-DD")}</Col>
          </Row>
        )}
        {mobileView && (
          <Row>
            <Col span="10">Current Status:</Col>
            <Col span="14">{data.currentStatus}</Col>
          </Row>
        )}
      </div>
    )
  }

  return (
    <>
      {showCreateModal && (
        <WaitlistEntriesFormModal WaitListEntry={entryToEdit} setShowCreateModal={setShowCreateModal} />
      )}
      <SearchPage
        title="Waitlist Entries"
        initialFilter={{ SectionID }}
        meta={modifiedMeta}
        hideSearchField={true}
        blocks={[
          <>
            <Button
              type="primary"
              onClick={() => {
                setShowCreateModal(true)
              }}
            >
              + Add Waitlist Entry
            </Button>
          </>
        ]}
        tableProps={{
          rowKey: "WaitListEntryID",
          columns: columns,
          searchFunc: findWaitListEntries,
          bordered: true,
          responsiveColumnIndices: [1, 2, 3],
          expandableRowRender: expandableRowRender,
          pagination: { position: ["topLeft"], pageSize: 20 }
        }}
      ></SearchPage>
    </>
  )
}
