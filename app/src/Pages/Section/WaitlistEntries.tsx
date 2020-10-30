import React, { useEffect, useState } from "react"
import { Row, Col, Typography, Button } from "antd"
import WaitListEntryTable from "~/Component/Section/WaitlistEntries/WaitListEntryTable"
import { RouteComponentProps } from "react-router-dom"
import styles from "~/Pages/Offering/Offering.module.scss"
import WaitlistEntriesSearchFilters from "~/Component/Common/SearchFilters"
import WaitlistEntriesSearchFilterMeta from "~/FormMeta/WaitlistEntries/WaitlistEntriesSearchFilterMeta"
import { findWaitListEntries } from "~/ApiServices/BizApi/registration/waitlistIF"
import WaitlistEntriesFormModal from "~/Component/Section/WaitlistEntries/CreateEdit/FormModal"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { deleteWaitListEntry } from "~/ApiServices/Service/WaitlistEntryService"

const { Title } = Typography

export default function WaitlistEntriesPage(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  const [waitListEntries, setWaitListEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [entryToEdit, setEntryToEdit] = useState()
  useEffect(() => {
    eventBus.subscribe(REFRESH_PAGE, () => {
      setLoading(true)
      findWaitListEntries([{ SectionID }]).then((x) => {
        if (x.success) setWaitListEntries(x.data)
        setLoading(false)
      })
    })
    eventBus.publish(REFRESH_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_PAGE)
    }
  }, [SectionID])

  useEffect(() => {
    if (entryToEdit) {
      setShowCreateModal(true)
    }
  }, [entryToEdit])
  return (
    <div className="site-layout-content">
      <Row>
        <Title level={3}>Waitlist Entries</Title>
      </Row>

      <WaitlistEntriesSearchFilters
        meta={WaitlistEntriesSearchFilterMeta}
        title="Waitlist Entries Filter"
        initialFilter={{}}
        visible={true}
        isCheckeble={false}
        isModalView
        hideFilters={() => console.log("meo")}
        onApplyChanges={(newFilterValues, appliedFilterCount) => {
          console.log(newFilterValues)
          console.log(appliedFilterCount)
          Object.keys(newFilterValues).forEach((key) => {
            if (newFilterValues[key] === "") delete newFilterValues[key]
          })
          setLoading(true)
          findWaitListEntries([{ ...newFilterValues, SectionID }]).then((x) => {
            if (x.success) {
              setWaitListEntries(x.data)
              document.getElementById("WaitListEntryTable")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "start"
              })
            }
            setLoading(false)
          })
        }}
      />
      <Button
        style={{ float: "right", zIndex: 11, marginTop: "22px", marginRight: "17px" }}
        type="primary"
        onClick={() => {
          setShowCreateModal(true)
        }}
      >
        + Add Waitlist Entry
      </Button>
      {showCreateModal && (
        <WaitlistEntriesFormModal
          SectionID={SectionID}
          WaitListEntry={entryToEdit}
          setShowCreateModal={setShowCreateModal}
        />
      )}
      <Col id="WaitListEntryTable" className={`gutter-row ${styles.offeringDetails}`} xs={24} sm={24} md={24}>
        <WaitListEntryTable
          dataSource={waitListEntries}
          loading={loading}
          setEntryToEdit={setEntryToEdit}
          removeEntry={(WaitListEntryID: number) => {
            deleteWaitListEntry({ WaitListEntryID }).then((x) => {
              if (x.success) eventBus.publish(REFRESH_PAGE)
            })
          }}
        />
      </Col>
    </div>
  )
}
