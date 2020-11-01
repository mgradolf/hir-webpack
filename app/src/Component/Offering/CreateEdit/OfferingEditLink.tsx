import React, { useState } from "react"
import { Button } from "antd"
import OfferingFormModal from "~/Component/Offering/CreateEdit/OfferingFormModal"

// import { connect } from "react-redux"
// import { showCreateOfferingModal } from "~/Store/ModalState"
// import { Dispatch } from "redux"

interface IOfferingEditLinkProp {
  OfferingId: number
  PrimaryType: boolean | false
}
export default function OfferingEditLink(props: IOfferingEditLinkProp) {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <Button
        type={props.PrimaryType ? "primary" : "link"}
        onClick={() => {
          setOpenModal(true)
        }}
      >
        Edit
      </Button>
      {openModal && <OfferingFormModal closeModal={() => setOpenModal(false)} offeringId={props.OfferingId} />}
    </>
  )
}

// const mapDispatchToProps = (dispatch: Dispatch) => {
//   return {
//     openCreateOfferingModal: (OfferingId: number) => {
//       return dispatch(showCreateOfferingModal({ value: true, config: { OfferingId } }))
//     }
//   }
// }

// export default connect(null, mapDispatchToProps)(OfferingEditLink)
