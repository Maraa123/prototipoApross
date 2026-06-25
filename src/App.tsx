import { useState } from 'react'
import LandingPostulante from './pages/LandingPostulante'
import ConfirmacionDatos from './pages/ConfirmacionDatos'
import ConfirmacionInstitucion from './pages/ConfirmacionInstitucion'
import AltaPostulante from './pages/AltaPostulante'

function App() {
  const [page, setPage] = useState<'landing' | 'confirmacion' | 'confirmacion-institucion' | 'alta'>('landing')
  const [cidiData, setCidiData] = useState<{ represented: string; category: string; cuit: string } | null>(null)
  const [submittedList, setSubmittedList] = useState<Array<{
    cuit: string
    represented: string
    categoria: string
    profesion?: string
    nivelAtencion?: string
    tipoInstitucionNivel?: string
    tipoInstitucion?: string
    estado: string
  }>>([
    {
      cuit: '27-457475-9',
      represented: 'Camila Gonzales',
      categoria: 'Profesional de la salud',
      profesion: 'Medico',
      estado: 'En revisión'
    },
    {
      cuit: '27-457475-9',
      represented: 'Camila Gonzales',
      categoria: 'Profesional de la salud',
      profesion: 'Bioquímico',
      estado: 'En revisión'
    },
    {
      cuit: '30-12345678-9',
      represented: 'Sanatorio Allende S.A.',
      categoria: 'Prestador de discapacidad',
      tipoInstitucion: 'Centro de Rehabilitación',
      estado: 'En revisión'
    }
  ])

  const handleStartPostulacion = () => {
    try {
      const keysToRemove: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith('apross_draft_')) {
          keysToRemove.push(key)
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k))
    } catch (e) {
      console.error(e)
    }
    setPage('confirmacion')
  }

  const handleConfirmCidi = (represented: string, category: string, cuit: string) => {
    setCidiData({ represented, category, cuit })
    if (represented === 'Sanatorio Allende S.A.') {
      setPage('confirmacion-institucion')
    } else {
      setPage('alta')
    }
  }

  const handleConfirmInstitution = () => {
    setPage('alta')
  }

  const handleCancelInstitution = () => {
    setPage('confirmacion')
  }

  const handleGoBack = () => {
    try {
      const keysToRemove: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith('apross_draft_')) {
          keysToRemove.push(key)
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k))
    } catch (e) {
      console.error(e)
    }
    setPage('landing')
  }

  const handleCompletePostulacion = (data: {
    cuit: string
    represented: string
    categoria: string
    profesion?: string
    nivelAtencion?: string
    tipoInstitucionNivel?: string
    tipoInstitucion?: string
  }) => {
    setSubmittedList(prev => [
      ...prev,
      {
        cuit: data.cuit,
        represented: data.represented,
        categoria: data.categoria,
        profesion: data.profesion,
        nivelAtencion: data.nivelAtencion,
        tipoInstitucionNivel: data.tipoInstitucionNivel,
        tipoInstitucion: data.tipoInstitucion,
        estado: 'En revisión'
      }
    ])
    setPage('landing')
  }

  if (page === 'landing') {
    return <LandingPostulante onStart={handleStartPostulacion} submittedList={submittedList} />
  }

  if (page === 'confirmacion') {
    return <ConfirmacionDatos onConfirm={handleConfirmCidi} />
  }

  if (page === 'confirmacion-institucion') {
    return (
      <ConfirmacionInstitucion
        onConfirm={handleConfirmInstitution}
        onCancel={handleCancelInstitution}
      />
    )
  }

  return (
    <AltaPostulante
      cidiData={cidiData}
      onGoBack={handleGoBack}
      onComplete={handleCompletePostulacion}
    />
  )
}

export default App

