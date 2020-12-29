import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { searchProducts } from "~/ApiServices/Service/ProductService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getProductDetailsMeta } from "~/FormMeta/Product/ProductDetailsMeta"

export default function ProductDetailsPage(props: RouteComponentProps<{ productID: string }>) {
  const ProductID = Number(props?.match?.params?.productID)
  return (
    <DetailsPage
      getMeta={getProductDetailsMeta}
      getDetails={() =>
        searchProducts({ ProductID }).then((x) => {
          if (x.success) x.data = x.data[0]
          return x
        })
      }
      entityType="Product"
      entityID={ProductID}
    />
  )
}
