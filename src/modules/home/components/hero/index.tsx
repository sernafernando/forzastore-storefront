import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="min-h-[80vh] w-full relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0066cc 0%, #003d7a 50%, #001f3f 100%)'
    }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-6 small:px-32 gap-8">
        <div className="max-w-4xl">
          <Heading
            level="h1"
            className="text-4xl small:text-5xl md:text-6xl leading-tight text-white font-bold mb-4"
          >
            Soluciones de Energía{" "}
            <span className="text-forza-accent">Inteligentes</span>
          </Heading>
          <p className="text-lg small:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Protegé tu hogar y empresa con la tecnología líder en UPS, reguladores de voltaje e inversores solares.
          </p>

          <div className="flex flex-col small:flex-row gap-4 justify-center">
            <LocalizedClientLink
              href="/store"
              className="btn-forza-primary text-lg"
            >
              Ver Productos
            </LocalizedClientLink>
            <a
              href="https://forzastore.com.ar/#contacto"
              className="inline-block py-3 px-8 bg-transparent border-2 border-white text-white font-medium rounded-full transition-all duration-300 hover:bg-white hover:text-forza-primary text-lg"
            >
              Contactanos
            </a>
          </div>
        </div>

        {/* Features badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <div className="flex items-center gap-2 text-white/90">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            <span>Envío a todo el país</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            <span>Garantía oficial</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            <span>Soporte técnico</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
