import * as React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { SectionSearchMeta } from "~/TableSearchMeta/Section/SectionSearchMeta"
import { getSectionTableColumns } from "~/TableSearchMeta/Section/SectionTableColumns"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import { SectionFormModal } from "~/Component/Feature/Section/SectionFormModal"

export default function Section() {
  const SectionFormModalOpenButton = () => {
    const [showModal, setShowModal] = React.useState(false)
    return (
      <>
        {setShowModal && (
          <IconButton toolTip="Create Section" iconType="create" onClick={() => setShowModal && setShowModal(true)} />
        )}
        {showModal && <SectionFormModal closeModal={() => setShowModal(false)} />}
      </>
    )
  }

  return (
    <SearchPage
      blocks={[<SectionFormModalOpenButton />]}
      hideSearchField={false}
      helpKey="searchSection"
      title="Manage Sections"
      meta={SectionSearchMeta}
      metaName="SectionSearchMeta"
      tableProps={getSectionTableColumns()}
    ></SearchPage>
  )
}
