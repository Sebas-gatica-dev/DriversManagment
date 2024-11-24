'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUser } from '@/contexts/UserContext'

interface FormData {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
}

const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    if (response.ok) {
      const userData = await response.json()
      return { success: true, message: 'Login exitoso', user: userData }
    } else if (response.status === 401) {
      return { success: false, message: 'Credenciales inválidas' }
    } else {
      throw new Error('Error en el servidor')
    }
  } catch (error) {
    console.error('Error durante el login:', error)
    return { success: false, message: 'Error de conexión' }
  }
}

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const router = useRouter()
  const { setUser } = useUser()

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Por favor, introduce un email válido."
    }
    if (formData.password.length < 4) {
      newErrors.password = "La contraseña debe tener al menos 4 caracteres."
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setApiError(null)
    if (validateForm()) {
      setIsSubmitting(true)
      const result = await loginUser(formData.email, formData.password)
      setIsSubmitting(false)
      if (result.success && result.user) {
        setUser(result.user)
        router.push('/profile')
      } else {
        setApiError(result.message)
      }
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <header className="absolute top-0 left-0 right-0 bg-white shadow-md">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">VacacionesIdeales</div>
            <div className="space-x-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition duration-300">Inicio</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition duration-300">Acerca de</Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition duration-300">Blog</Link>
            </div>
          </div>
        </nav>
      </header>
      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md w-full">  
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-white">Iniciar sesión</h2>
          <p className="mt-2 text-blue-100">Accede para planificar tus vacaciones ideales</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>
          {apiError && <p className="text-sm text-red-600">{apiError}</p>}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Recordarme
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition duration-150 ease-in-out transform hover:scale-105"
          >
            {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>
        <div className="px-6 sm:px-8 py-4 bg-gray-50 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}