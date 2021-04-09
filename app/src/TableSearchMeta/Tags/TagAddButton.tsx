import React, { useState } from "react"
import { addTagIntoEntity } from "~/ApiServices/Service/TagService"
import { LookupModal } from "~/Component/Common/Modal/LookupModal/LookupModal"
import { TagsSearchMeta } from "~/TableSearchMeta/Tags/TagsSearchMeta"
import { getTagsTableColumns } from "~/TableSearchMeta/Tags/TagsTableColumns"
import { eventBus } from "~/utils/EventBus"
import { CreateEditRemoveIconButton } from "~/Component/Common/Form/Buttons/CreateEditRemoveIconButton"

export const TagAddButton = (props: { EntityType: string; EntityID: number; eventName: string }) => {
  const [showModal, setShowModal] = useState(false)

  const addTag = async (Params: any[]) => {
    const promises = Params.map((x) =>
      addTagIntoEntity({ EntityType: props.EntityType, EntityID: props.EntityID, TagID: x.TagID })
    )
    console.log(promises)

    Promise.all(promises).then((x) => {
      setShowModal(false)
      eventBus.publish(props.eventName)
    })
  }

  return (
    <>
      <CreateEditRemoveIconButton toolTip="Add Tag" iconType="create" onClick={() => setShowModal(true)} />
      {showModal && (
        <LookupModal
          title="Select Tags"
          isArray={true}
          meta={TagsSearchMeta}
          metaName="TagsSearchMeta"
          {...getTagsTableColumns(true, "")}
          defaultFormValue={{ EntityType: props.EntityType, EntityID: props.EntityID, IsSelected: false }}
          closeModal={(Params: any) => {
            if (Params) addTag(Params)
            else setShowModal(false)
          }}
        />
      )}
    </>
  )
}
