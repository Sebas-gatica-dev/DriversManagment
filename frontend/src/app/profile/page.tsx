'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useUser } from '@/contexts/UserContext'
import { Camera, Edit2, Key, LogOut } from 'lucide-react'

export default function Profile() {
  const { user, setUser } = useUser()
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  const handleLogout = () => {
    setUser(null)
    router.push('/login')
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
        <div className="text-2xl font-semibold text-blue-600">Cargando perfil...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">VacacionesIdeales</div>
            <div className="space-x-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition duration-300">Inicio</Link>
              <Link href="/planner-vacation" className="text-gray-700 hover:text-blue-600 transition duration-300">Planear Vacaciones</Link>
              <button onClick={handleLogout} className="text-gray-700 hover:text-blue-600 transition duration-300">Cerrar Sesión</button>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Perfil de Usuario</h1>
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                {imageUrl ? (
                  <Image src={imageUrl} alt="Foto de perfil" width={80} height={80} className="rounded-full" />
                ) : (
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 cursor-pointer hover:bg-blue-600 transition duration-300">
                  <Camera size={16} className="text-white" />
                </label>
                <input id="profile-image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{user.username}</h2>
                <p className="text-gray-600">ivan@mail.com</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Información de la cuenta</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Miembro desde</p>
                  <p className="font-medium">{user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vacaciones planeadas</p>
                  <p className="font-medium">{user.vacationsPlanned ?? 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Permisos de usuario</h3>
              <div className="flex flex-wrap gap-2">
                {user.authorities.map((auth, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {auth.authority}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                <Edit2 size={18} className="mr-2" /> Editar Perfil
              </button>
              <button className="flex items-center justify-center bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300">
                <Key size={18} className="mr-2" /> Cambiar Contraseña
              </button>
            </div>
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