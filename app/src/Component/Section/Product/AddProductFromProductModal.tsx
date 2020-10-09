import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showAddSectionProductModal } from "~/Store/ModalState"
import { Row, Col, Card, Button } from "antd"
import { eventBus, REFRESH_SECTION_PRODUCT_PAGE } from "~/utils/EventBus"
import ProductSearchFilters from "~/Component/Common/SearchFilters"
import { addSectionProduct } from "~/ApiServices/BizApi/product/productIf"
import { ProductTable } from "~/Component/Section/Product/ProductTable"
import { FilterOpenButton } from "~/Component/Offering/OfferingFilterOpenButton"
import ProductSearchFilterMeta from "~/FormMeta/Section/Product/ProductSearchFilterMeta"
import { useProductFilterState, useProducts } from "~/Hooks/Section/Product"

const { useState } = React

interface IProductProps {
  sectionId: number
  closeAddProductFromProductModal: () => void
}

enum ModalPages {
  FilterPage,
  ProductsList
}

function AddProductFromProductModal({ sectionId, closeAddProductFromProductModal }: IProductProps) {
  const { filterData, updateFilterData } = useProductFilterState()
  const [loading, productItems] = useProducts(filterData)
  const [filterCount, updateFilterCount] = useState<number>(0)

  const [modalSelectedPage, setModalPage] = useState<ModalPages>(ModalPages.FilterPage)
  const [selectedProduct, setSelectedProduct] = useState<any[]>([])

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedProduct(selectedRows)
    },
    getCheckboxProps: (record: { name: string }) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name
    })
  }

  function handleSelect() {
    const selectedProductId = selectedProduct.map((product) => product.ProductID)

    addSectionProduct([sectionId, selectedProductId])
      .then(() => eventBus.publish(REFRESH_SECTION_PRODUCT_PAGE))
      .finally(closeAddProductFromProductModal)
  }

  const actions = []
  actions.push(<Button onClick={closeAddProductFromProductModal}>Cancel</Button>)
  actions.push(
    <Button disabled={selectedProduct.length === 0} onClick={handleSelect}>
      Select
    </Button>
  )

  return (
    <Modal showModal={true} width="1000px">
      {(modalSelectedPage === ModalPages.FilterPage && (
        <Row justify="center">
          <ProductSearchFilters
            initialFilter={filterData}
            visible
            isModalView
            meta={ProductSearchFilterMeta}
            title="Product Filter"
            toggleVisiibility={() => {
              closeAddProductFromProductModal()
              setSelectedProduct([])
            }}
            onApplyChanges={(newFilterValues, newFilterCount) => {
              updateFilterData({ ...filterData, ...newFilterValues })
              updateFilterCount(newFilterCount)
              setModalPage(ModalPages.ProductsList)
            }}
          />
        </Row>
      )) ||
        (modalSelectedPage === ModalPages.ProductsList && (
          <Card title={"Select Products"} actions={actions}>
            <FilterOpenButton
              filterCount={filterCount}
              filterColumnVisible={false}
              toggleFilter={() => setModalPage(ModalPages.FilterPage)}
              hideCreateButton
            />
            <Col>
              <ProductTable dataSource={productItems} loading={loading} isModal rowSelection={rowSelection} />
            </Col>
          </Card>
        )) || <></>}
    </Modal>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeAddProductFromProductModal: () => dispatch(showAddSectionProductModal(false))
  }
}

export default connect(undefined, mapDispatchToProps)(AddProductFromProductModal)
