"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Información del Producto",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Envío y Devoluciones",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-small-regular py-4">
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold text-gray-700">Material</span>
            <p className="text-gray-600">{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">País de origen</span>
            <p className="text-gray-600">{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Tipo</span>
            <p className="text-gray-600">{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold text-gray-700">Peso</span>
            <p className="text-gray-600">{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Dimensiones</span>
            <p className="text-gray-600">
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}A x ${product.height}H`
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-4">
      <div className="grid grid-cols-1 gap-y-6">
        <div className="flex items-start gap-x-3">
          <div className="text-forza-primary">
            <FastDelivery />
          </div>
          <div>
            <span className="font-semibold text-gray-700">Envío rápido</span>
            <p className="max-w-sm text-gray-600">
              Tu pedido llegará en 3-5 días hábiles a tu domicilio o punto de retiro en todo el país.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-3">
          <div className="text-forza-primary">
            <Refresh />
          </div>
          <div>
            <span className="font-semibold text-gray-700">Cambios simples</span>
            <p className="max-w-sm text-gray-600">
              ¿No es lo que esperabas? No hay problema, cambiamos tu producto por uno nuevo.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-3">
          <div className="text-forza-primary">
            <Back />
          </div>
          <div>
            <span className="font-semibold text-gray-700">Devoluciones fáciles</span>
            <p className="max-w-sm text-gray-600">
              Devolvé tu producto y te reembolsamos el dinero. Sin preguntas, sin complicaciones.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
