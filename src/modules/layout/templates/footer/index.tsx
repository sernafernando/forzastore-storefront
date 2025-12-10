import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="bg-forza-dark text-white w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-8 xsmall:flex-row items-start justify-between py-16">
          <div className="flex flex-col gap-4">
            <LocalizedClientLink
              href="/"
              className="flex items-center"
            >
              <Image
                src="/images/logo-forza-footer.png"
                alt="FORZA Power Technologies"
                width={150}
                height={50}
                className="h-[50px] w-auto brightness-0 invert"
              />
            </LocalizedClientLink>
            <p className="text-white/70 text-sm max-w-xs">
              Soluciones de energía inteligentes para hogares y empresas. Protegemos lo que más importa.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-2">
              <a href="https://facebook.com/forzaups" target="_blank" rel="noreferrer" className="text-white/70 hover:text-forza-accent transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/></svg>
              </a>
              <a href="https://instagram.com/forzaups" target="_blank" rel="noreferrer" className="text-white/70 hover:text-forza-accent transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.35.2-6.78,2.62-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.36,2.62,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.35-.2,6.78-2.62,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.35-2.62-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z"/></svg>
              </a>
              <a href="https://youtube.com/forzaups" target="_blank" rel="noreferrer" className="text-white/70 hover:text-forza-accent transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.5,6.19a3.02,3.02,0,0,0-2.12-2.14C19.5,3.5,12,3.5,12,3.5s-7.5,0-9.38.55A3.02,3.02,0,0,0,.5,6.19,31.64,31.64,0,0,0,0,12a31.64,31.64,0,0,0,.5,5.81,3.02,3.02,0,0,0,2.12,2.14c1.88.55,9.38.55,9.38.55s7.5,0,9.38-.55a3.02,3.02,0,0,0,2.12-2.14A31.64,31.64,0,0,0,24,12,31.64,31.64,0,0,0,23.5,6.19ZM9.55,15.57V8.43L15.82,12Z"/></svg>
              </a>
            </div>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus text-white font-semibold">
                  Categorías
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 text-white/70 txt-small"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-forza-accent transition-colors",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-forza-accent transition-colors"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus text-white font-semibold">
                  Colecciones
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-white/70 txt-small",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-forza-accent transition-colors"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus text-white font-semibold">Contacto</span>
              <ul className="grid grid-cols-1 gap-y-2 text-white/70 txt-small">
                <li>
                  <a
                    href="mailto:ventas@forzaups.com"
                    className="hover:text-forza-accent transition-colors"
                  >
                    ventas@forzaups.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+541155551234"
                    className="hover:text-forza-accent transition-colors"
                  >
                    +54 11 5555-1234
                  </a>
                </li>
                <li>
                  <span>Buenos Aires, Argentina</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full py-6 justify-between text-white/50 border-t border-white/10">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} FORZA Power Technologies. Todos los derechos reservados.
          </Text>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-forza-accent transition-colors">Términos</a>
            <a href="#" className="hover:text-forza-accent transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
