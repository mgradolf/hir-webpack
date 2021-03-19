import React, { useState } from "react"
import { Dropdown, Menu } from "antd"
import { LookupModal } from "~/Component/Common/Modal/LookupModal/LookupModal"
import { getOfferingTableColumns } from "~/TableSearchMeta/Offering/OfferingTableColumns"
import { getSectionTableColumns } from "~/TableSearchMeta/Section/SectionTableColumns"
import { getProgramTableColumns } from "~/TableSearchMeta/Program/ProgramTableColumns"
import { getMarketingCodeRepositoryTableColumns } from "~/TableSearchMeta/MarketingCodeRepository/MarketingCodeRepositoryTableColumns"
import { OfferingSearchMeta } from "~/TableSearchMeta/Offering/OfferingSearchMeta"
import { SectionSearchMeta } from "~/TableSearchMeta/Section/SectionSearchMeta"
import { ProgramSearchMeta } from "~/TableSearchMeta/Program/ProgramSearchMeta"
import { MarketingCodeRepositorySearchMeta } from "~/TableSearchMeta/MarketingCodeRepository/MarketingCodeRepositorySearchMeta"
import { addTagIntoEntity } from "~/ApiServices/Service/TagService"
import { eventBus } from "~/utils/EventBus"

interface IScheduleUpdateMenuProp {
  TagID: number
  eventName: string
  style?: React.CSSProperties
}

export function TagAddDropdown(props: IScheduleUpdateMenuProp) {
  const [entityType, setEntityType] = useState<any>(undefined)
  const [showLookupModal, setShowLookupModal] = useState(false)

  const contentMap = [
    {
      type: "Offering",
      meta: OfferingSearchMeta,
      metaName: "OfferingSearchMeta",
      searchFunc: getOfferingTableColumns().searchFunc,
      columns: getOfferingTableColumns().columns,
      key: "OfferingID"
    },
    {
      type: "Section",
      meta: SectionSearchMeta,
      metaName: "SectionSearchMeta",
      searchFunc: getSectionTableColumns().searchFunc,
      columns: getSectionTableColumns().columns,
      key: "SectionID"
    },
    {
      type: "Program",
      meta: ProgramSearchMeta,
      metaName: "ProgramSearchMeta",
      searchFunc: getProgramTableColumns().searchFunc,
      columns: getProgramTableColumns().columns,
      key: "ProgramID"
    },
    {
      type: "Marketing Code",
      meta: MarketingCodeRepositorySearchMeta,
      metaName: "MarketingCodeRepositorySearchMeta",
      searchFunc: getMarketingCodeRepositoryTableColumns().searchFunc,
      columns: getMarketingCodeRepositoryTableColumns().columns,
      key: "MarketingCodeID"
    }
  ]

  const menus = (
    <Menu>
      {contentMap.map((x, i) => (
        <Menu.Item
          key={i}
          onClick={() => {
            setEntityType(x)
            setShowLookupModal(true)
          }}
        >
          {x.type}
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <>
      <Dropdown.Button overlay={menus} type="primary" style={props.style}>
        Select
      </Dropdown.Button>
      {showLookupModal && (
        <LookupModal
          title={`Select ${entityType.type}`}
          closeModal={(items) => {
            if (items && items.length > 0) {
              const promises = items?.map((x) => {
                return addTagIntoEntity({
                  EntityType: entityType.type,
                  EntityID: x[entityType.key],
                  TagID: props.TagID
                })
              })

              if (promises) {
                Promise.all(promises).finally(() => {
                  eventBus.publish(props.eventName)
                  setShowLookupModal(false)
                  setEntityType(undefined)
                })
              }
            } else {
              setShowLookupModal(false)
            }
          }}
          searchFunc={entityType.searchFunc}
          isArray={true}
          columns={entityType.columns}
          meta={entityType.meta}
          metaName={entityType.metaName}
        />
      )}
    </>
  )
}
