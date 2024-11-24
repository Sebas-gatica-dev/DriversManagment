import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">VacacionesIdeales</div>
            <div className="space-x-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition duration-300">Inicio</Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition duration-300">Blog</Link>
              <Link href="/login" className="text-gray-700 hover:text-blue-600 transition duration-300">Login</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Acerca de VacacionesIdeales</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-lg text-gray-700 mb-4">
            VacacionesIdeales nació de la pasión por viajar y el deseo de hacer que la planificación de vacaciones sea una experiencia emocionante y sin estrés para todos.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Nuestra misión es proporcionar a los viajeros las herramientas y la inspiración necesarias para crear experiencias de viaje únicas y personalizadas que se ajusten perfectamente a sus deseos y presupuestos.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Con un equipo de expertos en viajes y tecnología, trabajamos constantemente para mejorar nuestra plataforma y ofrecer las mejores recomendaciones y servicios a nuestros usuarios.
          </p>
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