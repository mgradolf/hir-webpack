import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showAddSectionProductModal } from "~/Store/ModalState"
import { Dispatch } from "redux"

interface ICreateActionButtonProp {
  sectionId: number
  openAddSectionProductModal?: (sectionId: number) => void
}
function CreateActionButton(props: ICreateActionButtonProp) {
  const onClick = () => {
    if (props.openAddSectionProductModal) props.openAddSectionProductModal(props.sectionId)
  }
  return (
    <Button type="primary" onClick={onClick}>
      + Add Product
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openAddSectionProductModal: (sectionId: number) => dispatch(showAddSectionProductModal(true, { sectionId }))
  }
}

export default connect(null, mapDispatchToProps)(CreateActionButton)
