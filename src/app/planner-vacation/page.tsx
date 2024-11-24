'use client'

import { useState } from 'react'

interface VacationPlan {
  destination: string;
  startDate: string;
  endDate: string;
  activities: string[];
}

export default function VacationPlanner() {
  const [plan, setPlan] = useState<VacationPlan>({
    destination: '',
    startDate: '',
    endDate: '',
    activities: []
  })
  const [activity, setActivity] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPlan(prev => ({ ...prev, [name]: value }))
  }

  const handleActivityAdd = () => {
    if (activity.trim()) {
      setPlan(prev => ({ ...prev, activities: [...prev.activities, activity.trim()] }))
      setActivity('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Plan de vacaciones:', plan)
    // Aquí iría la lógica para guardar el plan de vacaciones
    alert('¡Plan de vacaciones creado con éxito!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl w-full">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-white">Planifica tus vacaciones ideales</h2>
          <p className="mt-2 text-green-100">Crea el viaje de tus sueños</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destino</label>
            <input
              id="destination"
              name="destination"
              type="text"
              required
              value={plan.destination}
              onChange={handleChange}
              placeholder="Ej: Playa del Carmen"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Fecha de inicio</label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                required
                value={plan.startDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Fecha de fin</label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                required
                value={plan.endDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
              />
            </div>
          </div>
          <div>
            <label htmlFor="activity" className="block text-sm font-medium text-gray-700">Actividades</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="activity"
                id="activity"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="flex-1 rounded-none rounded-l-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                placeholder="Ej: Visitar las pirámides"
              />
              <button
                type="button"
                onClick={handleActivityAdd}
                className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
              >
                Añadir
              </button>
            </div>
            <ul className="mt-2 space-y-2">
              {plan.activities.map((act, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md">
                  <span>{act}</span>
                  <button
                    type="button"
                    onClick={() => setPlan(prev => ({ ...prev, activities: prev.activities.filter((_, i) => i !== index) }))}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Crear plan de vacaciones
          </button>
        </form>
      </div>
    </div>
  )
}