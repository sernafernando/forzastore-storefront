"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square w-full overflow-hidden bg-white rounded-2xl shadow-md flex items-center justify-center">
        <span className="text-gray-400">Sin imagen</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image */}
      <div className="relative aspect-[4/3] w-full max-w-md mx-auto overflow-hidden bg-white rounded-xl shadow-md">
        {images[selectedImage]?.url && (
          <Image
            src={images[selectedImage].url}
            priority
            className="absolute inset-0 object-contain p-4"
            alt={`Imagen del producto`}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
          />
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 justify-center overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className={`relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                selectedImage === index
                  ? "border-forza-primary shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {image.url && (
                <Image
                  src={image.url}
                  className="object-contain p-1"
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="64px"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
