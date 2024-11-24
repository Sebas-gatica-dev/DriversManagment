import Link from 'next/link'

const blogPosts = [
  {
    title: "Los 10 destinos más populares para 2024",
    excerpt: "Descubre los lugares que están en la lista de deseos de todos los viajeros este año.",
    date: "2024-03-15"
  },
  {
    title: "Cómo ahorrar en tu próximo viaje",
    excerpt: "Consejos prácticos para hacer que tu presupuesto de viaje rinda más.",
    date: "2024-03-10"
  },
  {
    title: "Viajando de forma sostenible: Guía para el viajero consciente",
    excerpt: "Aprende cómo puedes disfrutar de tus vacaciones mientras cuidas el planeta.",
    date: "2024-03-05"
  }
]

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">VacacionesIdeales</div>
            <div className="space-x-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition duration-300">Inicio</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition duration-300">Acerca de</Link>
              <Link href="/login" className="text-gray-700 hover:text-blue-600 transition duration-300">Login</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Blog de Viajes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <p className="text-sm text-gray-500">{post.date}</p>
              <a href="#" className="mt-4 inline-block text-blue-600 hover:text-blue-800 transition duration-300">Leer más</a>
            </div>
          ))}
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