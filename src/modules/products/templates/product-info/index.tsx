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

    // Keys to skip (not useful for display)
    const skipKeys = [
      "impuesto", "iva", "código universal", "sku", "condición",
      "características adicionales", "dispositivos aptos"
    ]

    // Priority keys to show first
    const priorityKeys = [
      "modelo", "potencia", "voltaje", "tipo", "línea", "peso"
    ]

    // Parse specs that have "Key: Value" format
    const allSpecs = specLines
      .filter((line) => line.includes(":"))
      .map((line) => {
        const [key, ...valueParts] = line.split(":")
        return { key: key.trim(), value: valueParts.join(":").trim() }
      })
      .filter((spec) => {
        const keyLower = spec.key.toLowerCase()
        // Skip unwanted keys and empty values
        return !skipKeys.some(skip => keyLower.includes(skip)) && spec.value
      })

    // Sort by priority
    const sortedSpecs = allSpecs.sort((a, b) => {
      const aIndex = priorityKeys.findIndex(k => a.key.toLowerCase().includes(k))
      const bIndex = priorityKeys.findIndex(k => b.key.toLowerCase().includes(k))
      if (aIndex === -1 && bIndex === -1) return 0
      if (aIndex === -1) return 1
      if (bIndex === -1) return -1
      return aIndex - bIndex
    })

    return { intro: introLine, specs: sortedSpecs.slice(0, 6) }
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
