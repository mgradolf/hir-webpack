import React, { useState } from "react"
import { Button, Dropdown, Menu } from "antd"
import {
  addOfferingFinancials,
  addInstructorFinancials,
  addMarketingProgramFinancials,
  addResourceFinancials
} from "~/ApiServices/Service/SectionService"
import { eventBus, REFRESH_SECTION_BUDGET_PAGE } from "~/utils/EventBus"
import { AddInstructorModal } from "~/Component/Offering/QualifiedInstructor/AddInstructorModal"
import AddResourceModal from "~/Component/Resource/AddResourceModal"
import AddMarketingProgramModal from "~/Component/MarketingProgram/AddMarketingProgramModal"

interface IFinancialMenuProp {
  dataLoaded: { [key: string]: any }
}

export default function FinancialMenu(props: IFinancialMenuProp) {
  const [loading, setLoading] = useState<boolean>(false)
  const [showInstructor, setShowInstructor] = useState<boolean>(false)
  const [showResource, setShowResource] = useState<boolean>(false)
  const [showMarketingProgram, setShowMarketingProgram] = useState<boolean>(false)

  const addOfferingFinancial = async (SectionID: number) => {
    if (props.dataLoaded) {
      setLoading(true)
      const response = await addOfferingFinancials({ SectionID })
      if (response.success) {
        eventBus.publish(REFRESH_SECTION_BUDGET_PAGE)
      }
      setLoading(false)
    }
  }

  const onCloseInstructorFinancials = (selectedItems?: any[]) => {
    if (selectedItems) {
      selectedItems.map((x) => {
        addInstructorFinancials({ FacultyID: x.FacultyID, SectionID: props.dataLoaded.SectionID }).then((x) => {
          if (x.success) eventBus.publish(REFRESH_SECTION_BUDGET_PAGE)
        })
        return true
      })
      setShowInstructor(false)
    } else {
      setShowInstructor(false)
    }
  }

  const onCloseResourceFinancials = (selectedItems?: any[]) => {
    if (selectedItems) {
      selectedItems.map((x) => {
        addResourceFinancials({ ResourceID: x.ResourceID, SectionID: props.dataLoaded.SectionID }).then((x) => {
          if (x.success) eventBus.publish(REFRESH_SECTION_BUDGET_PAGE)
        })
        return true
      })
      setShowResource(false)
    } else {
      setShowResource(false)
    }
  }

  const onCloseMarketingProgramFinancials = (selectedItems?: any[]) => {
    if (selectedItems) {
      selectedItems.map((x) => {
        addMarketingProgramFinancials({
          MarketingProgramID: x.MarketingProgramID,
          SectionID: props.dataLoaded.SectionID
        }).then((x) => {
          if (x.success) eventBus.publish(REFRESH_SECTION_BUDGET_PAGE)
        })
        return true
      })
      setShowMarketingProgram(false)
    } else {
      setShowMarketingProgram(false)
    }
  }

  const getMenu = (dataInfo: { [key: string]: any }) => {
    return (
      <Menu>
        <Menu.Item>
          <Button loading={loading} type="link" onClick={() => addOfferingFinancial(dataInfo.SectionID)}>
            Offering
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button type="link" onClick={() => setShowInstructor(true)}>
            Instructor
          </Button>
          {showInstructor && <AddInstructorModal {...props} onClose={onCloseInstructorFinancials} />}
        </Menu.Item>
        <Menu.Item>
          <Button type="link" onClick={() => setShowResource(true)}>
            Resource
          </Button>
          {showResource && <AddResourceModal onClose={onCloseResourceFinancials} />}
        </Menu.Item>
        <Menu.Item>
          <Button type="link" onClick={() => setShowMarketingProgram(true)}>
            Marketing Program
          </Button>
          {showMarketingProgram && <AddMarketingProgramModal onClose={onCloseMarketingProgramFinancials} />}
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <Dropdown.Button overlay={getMenu(props.dataLoaded)} type="primary">
      Add Financials
    </Dropdown.Button>
  )
}
