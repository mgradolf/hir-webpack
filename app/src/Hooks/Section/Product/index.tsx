import { useState, useEffect } from "react"
import { searchProducts } from "~/ApiServices/Service/ProductService"

const IProductFilterValue = {
  ProductName: "",
  ProductCategoryID: ""
}

export function useProductFilterState(state = IProductFilterValue) {
  const [filterData, updateFilterData] = useState<any>(state)
  return { filterData, updateFilterData }
}

export function useProducts(filterData: any): [boolean, any[]] {
  const [productItems, setProductItems] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadProducts = async function () {
      setLoading(true)

      const params: { [key: string]: any } = {}

      params["ProductName"] = filterData.ProductName !== "" ? filterData.ProductName : "*"
      params["ProductCategoryID"] =
        filterData.ProductCategoryID !== "" ? Number(filterData.ProductCategoryID) : undefined

      const objectKeys = Object.keys(params)
      objectKeys.forEach((key) => {
        if (params[key] === undefined) {
          delete params[key]
        }
      })

      const result = await searchProducts(params)

      if (result && result.success) {
        setProductItems(result.data)
      }
      setLoading(false)
    }
    loadProducts()
  }, [filterData])

  return [loading, productItems]
}
