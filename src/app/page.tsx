'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const carouselItems = [
  {
    image: 'https://catracalivre.com.br/wp-content/uploads/2024/01/salta-tolar-grande-01-1.jpg',
    legend: 'Explora lugares paradisíacos',
  },
  {
    image: 'https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2022/01/28/61f3c17b4171c.r_d.1056-639-5666.jpeg',
    legend: 'Descubre culturas fascinantes',
  },
  {
    image: 'https://eldiariodeviaje.ar/media/k2/items/cache/15812787389d5e520282cfe444c2e037_L.jpg',
    legend: 'Vive aventuras en la naturaleza',
  },
  {
    image: 'https://www.clarin.com/img/2021/05/21/F_JceNUx8_720x0__1.jpg',
    legend: 'Disfruta de la gastronomía local',
  },
  {
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/29/84/5a/balcon-de-la-plaza.jpg?w=1200&h=-1&s=1',
    legend: 'Relájate en resorts de lujo',
  },
  {
    image: 'https://www.equusargentina.com/wp-content/uploads/2021/08/cabalgata-salta-equus-argentina-1440x793-1.jpg',
    legend: 'Crea recuerdos inolvidables',
  },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">VacacionesIdeales</div>
            <div className="space-x-4">
              <Link href="/about" className="text-gray-700 hover:text-blue-600">Acerca de</Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600">Blog</Link>
              <Link href="/login" className="text-gray-700 hover:text-blue-600 transition duration-300">Login</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Crea tus vacaciones ideales
        </h1>

        <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-xl mb-12">
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <img
                src={item.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <p className="text-xl font-semibold">{item.legend}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            ¿Listo para planear tu próxima aventura?
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Diseña unas vacaciones perfectas que se ajusten a tus deseos y presupuesto.
          </p>
          <Link
            href="/planner-vacation"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Comenzar a planear
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Destinos únicos</h3>
            <p className="text-gray-600">Descubre lugares increíbles que se adaptan a tus preferencias.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Experiencias personalizadas</h3>
            <p className="text-gray-600">Crea un itinerario que refleje tus intereses y estilo de viaje.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Planificación sin estrés</h3>
            <p className="text-gray-600">Simplificamos el proceso para que disfrutes cada paso del camino.</p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 VacacionesIdeales. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}