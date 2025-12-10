import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  // Parse description to separate intro from specs
  const parseDescription = (desc: string | null | undefined) => {
    if (!desc) return { intro: "", specs: [] }

    const lines = desc.split("\n").filter((line) => line.trim())

    // Check if first line looks like an intro (no colon)
    const introLine = lines[0]?.includes(":") ? "" : lines[0] || ""
    const specLines = introLine ? lines.slice(1) : lines

    // Parse specs that have "Key: Value" format
    const specs = specLines
      .filter((line) => line.includes(":"))
      .map((line) => {
        const [key, ...valueParts] = line.split(":")
        return { key: key.trim(), value: valueParts.join(":").trim() }
      })
      .slice(0, 6) // Show max 6 specs in summary

    return { intro: introLine, specs }
  }

  const { intro, specs } = parseDescription(product.description)

  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-3">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-xs text-forza-primary hover:text-forza-secondary font-medium uppercase tracking-wide"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h1"
          className="text-xl leading-7 text-gray-800 font-bold"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        {intro && (
          <Text className="text-sm text-gray-600" data-testid="product-description">
            {intro}
          </Text>
        )}

        {specs.length > 0 && (
          <div className="mt-2 space-y-2">
            {specs.map((spec, idx) => (
              <div key={idx} className="flex text-sm">
                <span className="text-gray-500 w-32 flex-shrink-0">{spec.key}:</span>
                <span className="text-gray-800 font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductInfo
