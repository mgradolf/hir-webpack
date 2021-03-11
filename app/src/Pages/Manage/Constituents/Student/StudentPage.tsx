import React from "react"
// import { Button } from "antd"
// import StudentFormModal from "~/Component/Student/StudentFormModal"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getStudentTableColumns } from "~/TableSearchMeta/Student/StudentTableColumns"
import { studentSearchMeta } from "~/TableSearchMeta/Student/StudentSearchMeta"
import { HelpContext } from "~/Help/HelpContext"
import { IHelpConfig } from "~/Help/getHelpConfig"
import { PersonFormOpenButton } from "~/Component/Person/Forms/CreateEdit/PersonFormWithConfig"

export default function PersonTable() {
  // const [showModal, setShowModal] = useState(false)
  return (
    <HelpContext.Consumer>
      {(helpConfig: IHelpConfig) => (
        <SearchPage
          // blocks={[
          //   <>
          //     <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal(true)}>
          //       + Create Student
          //     </Button>
          //     {showModal && <StudentFormModal closeModal={() => setShowModal(false)} />}
          //   </>
          // ]}
          blocks={[<PersonFormOpenButton initialValues={{ Roles: [1] }} />]}
          title="Manage Students"
          meta={studentSearchMeta}
          hideSearchField={false}
          tableProps={{
            ...getStudentTableColumns()
          }}
          helpUrl={helpConfig.generic}
        ></SearchPage>
      )}
    </HelpContext.Consumer>
  )
}
