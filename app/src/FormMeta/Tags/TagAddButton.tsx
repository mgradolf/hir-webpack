import React, { useState } from "react"
import { Button } from "antd"
import { addTagIntoEntity } from "~/ApiServices/Service/TagService"
import { LookupModal } from "~/Component/Common/Modal/LookupModal"
import { TagsSearchMeta } from "~/FormMeta/Tags/TagsSearchMeta"
import { getTagsTableColumns } from "~/FormMeta/Tags/TagsTableColumns"
import { eventBus } from "~/utils/EventBus"

export const TagAddButton = (props: { tag: { [key: string]: any }; eventName: string }) => {
  const [showModal, setShowModal] = useState(false)

  const addTag = async (Params: any[]) => {
    const promises = Params.map((x) =>
      addTagIntoEntity({ EntityType: props.tag.EntityType, EntityID: props.tag.EntityID, TagID: x.TagID })
    )
    console.log(promises)

    Promise.all(promises).then((x) => {
      setShowModal(false)
      eventBus.publish(props.eventName)
    })
  }

  return (
    <>
      <Button type="primary" onClick={() => setShowModal(true)}>
        + Add Tag
      </Button>
      {showModal && (
        <LookupModal
          title="Select Tags"
          isArray={true}
          meta={TagsSearchMeta}
          {...getTagsTableColumns(true, "")}
          defaultFilter={{ EntityType: props.tag.EntityType, EntityID: props.tag.EntityID, IsSelected: false }}
          closeModal={(Params: any) => {
            if (Params) addTag(Params)
            else setShowModal(false)
          }}
        />
      )}
    </>
  )
}
