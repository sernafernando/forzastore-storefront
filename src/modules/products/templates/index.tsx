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
        className="content-container py-8"
        data-testid="product-container"
      >
        {/* Main product section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Gallery - Left side */}
          <div className="w-full lg:w-3/5">
            <ImageGallery images={images} />
          </div>

          {/* Product Info & Actions - Right side */}
          <div className="w-full lg:w-2/5">
            <div className="bg-white rounded-2xl p-6 shadow-md lg:sticky lg:top-24">
              <ProductInfo product={product} />

              <div className="my-6 border-t border-gray-100" />

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

        {/* Product Details Tabs - Below */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <ProductTabs product={product} />
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
