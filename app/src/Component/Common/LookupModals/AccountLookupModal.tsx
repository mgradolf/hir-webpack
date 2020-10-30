import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showPersonLookupModal } from "~/Store/ModalState"
import SearchFilters from "~/Component/Common/SearchFilters"
import { Row, Card, Button } from "antd"
import { eventBus, EVENT_PERSON_SELECTED } from "~/utils/EventBus"
import AccountTable from "~/Component/Account/AccountTable"
import FilterOpenButton from "~/Component/Person/PersonFilterOpenButton"
import AccountSearchFilterMeta from "~/FormMeta/Account/AccountSearchFilterMeta"
import { findAccountForLookUp } from "~/ApiServices/BizApi/account/accountIF"
import { useEffect, useState } from "react"
import { IParamsToBeDispatched } from "~/FormMeta/WaitlistEntries/WaitlistSearchCustomLookupFilter"

interface IAccountLookupModal {
  type?: string
  closePersonLookupModal?: () => void
}

enum ModalPages {
  FilterPage,
  PersonList
}

function AccountLookupModal(props: IAccountLookupModal) {
  const [filterData, updateFilterData] = useState<{ [key: string]: any }>({})
  const [filterCount, updateFilterCount] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [accounts, setAccounts] = useState<any[]>([])
  const [modalSelectedPage, setModalPage] = useState<ModalPages>(ModalPages.FilterPage)
  const [selectedAccount, setselectedAccount] = useState<{ [key: string]: any }>({})

  useEffect(() => {
    setLoading(true)
    findAccountForLookUp([filterData]).then((x) => {
      if (x.success) setAccounts(x.data)
      setLoading(false)
    })
  }, [filterData])

  const rowSelection = {
    type: "radio",
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setselectedAccount(selectedRows[0])
    },
    getCheckboxProps: (record: { name: string }) => ({
      name: record.name
    })
  }

  function handleSelect() {
    const selected: IParamsToBeDispatched = {
      NameToDisplay: "",
      Params: {}
    }
    selected.NameToDisplay = selectedAccount.AccountName
    selected.Params = { AccountID: selectedAccount.AccountID }

    eventBus.publish(EVENT_PERSON_SELECTED, selected)
    props.closePersonLookupModal && props.closePersonLookupModal()
  }

  return (
    <Modal showModal={true} width="1000px" closable={true} closeModal={() => console.log("moyna chora")}>
      {(modalSelectedPage === ModalPages.FilterPage && (
        <Row justify="center">
          <SearchFilters
            meta={AccountSearchFilterMeta}
            isModalView={true}
            initialFilter={filterData}
            title="Account Filter"
            visible
            hideFilters={() => props.closePersonLookupModal && props.closePersonLookupModal()}
            onApplyChanges={(newFilterValues, newFilterCount) => {
              Object.keys(newFilterValues).forEach((x) => {
                if (newFilterValues[x] === "") delete newFilterValues[x]
              })
              updateFilterData({
                ...filterData,
                ...newFilterValues
              })

              updateFilterCount(newFilterCount)
              setModalPage(ModalPages.PersonList)
            }}
          />
        </Row>
      )) ||
        (modalSelectedPage === ModalPages.PersonList && (
          <Card
            title="Select Account"
            actions={[
              <Button type="ghost" onClick={props.closePersonLookupModal}>
                Cancel
              </Button>,
              <Button type="primary" disabled={selectedAccount.length === 0} onClick={handleSelect}>
                Select
              </Button>
            ]}
          >
            <FilterOpenButton
              filterCount={filterCount as number}
              filterColumnVisible={false}
              toggleFilter={() => setModalPage(ModalPages.FilterPage)}
              hideCreateButton
            />

            <AccountTable dataSource={accounts} loading={loading} isModal={true} rowSelection={rowSelection} />
          </Card>
        )) || <></>}
    </Modal>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closePersonLookupModal: () => dispatch(showPersonLookupModal(false))
  }
}

export default connect(undefined, mapDispatchToProps)(AccountLookupModal)
