import React, { useState } from "react"
import { PersonSearchMeta } from "~/TableSearchMeta/Person/PersonSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getPersonTableColumns } from "~/TableSearchMeta/Person/PersonTableColumns"
import { Button } from "antd"
import PersonFormModal from "~/Component/Person/Forms/PersonFormModal"
import helpFileNameMap from "~/Config/HelpFileMap.json"

export default function PersonTable() {
  const [showModal, setShowModal] = useState(false)

  return (
    <SearchPage
      blocks={[
        <>
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal(true)}>
            + Create Person
          </Button>
          {showModal && <PersonFormModal closeModal={() => setShowModal(false)} />}
        </>
      ]}
      title="Manage Persons"
      meta={PersonSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getPersonTableColumns()
      }}
      helpKey={helpFileNameMap.generic}
    ></SearchPage>
  )
}
