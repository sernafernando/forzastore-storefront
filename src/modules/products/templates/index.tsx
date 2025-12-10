import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div
        className="content-container flex flex-col lg:flex-row lg:items-start py-8 gap-8 relative"
        data-testid="product-container"
      >
        {/* Gallery - Main area */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2">
          <ImageGallery images={images} />
        </div>

        {/* Product Info - Left sidebar */}
        <div className="flex flex-col lg:sticky lg:top-24 lg:w-1/4 w-full gap-y-6 order-2 lg:order-1">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <ProductInfo product={product} />
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <ProductTabs product={product} />
          </div>
        </div>

        {/* Actions - Right sidebar */}
        <div className="flex flex-col lg:sticky lg:top-24 lg:w-1/4 w-full gap-y-6 order-3">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <ProductOnboardingCta />
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>
        </div>
      </div>

      <div
        className="content-container my-16"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductTemplate
