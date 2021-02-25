import React, { useState } from "react"
import { PersonSearchMeta } from "~/TableSearchMeta/Person/PersonSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getPersonTableColumns } from "~/TableSearchMeta/Person/PersonTableColumns"
import { Button } from "antd"
import PersonFormModal from "~/Component/Person/Forms/PersonFormModal"
import { HelpContext } from "~/Context/HelpContext"
import { IHelpConfig } from "~/Config/Help"

export default function PersonTable() {
  const [showModal, setShowModal] = useState(false)

  return (
    <HelpContext.Consumer>
      {(helpConfig: IHelpConfig) => (
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
          helpUrl={helpConfig.person}
        ></SearchPage>
      )}
    </HelpContext.Consumer>
  )
}
