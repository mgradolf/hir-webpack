import React, { useState } from "react"
import { PersonSearchMeta } from "~/TableSearchMeta/Person/PersonSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getPersonTableColumns } from "~/TableSearchMeta/Person/PersonTableColumns"
import { Button } from "antd"
import PersonFormModal from "~/Component/Person/PersonFormModal"

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
      helpKey="https://docs.google.com/document/d/1FKV-i5gsVClhsHLYFMqpdEGDVZmwJU576AXKKcTfwiY/edit?usp=sharing"
    ></SearchPage>
  )
}
