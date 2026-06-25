import { useState } from 'react'
import LandingPostulante from './pages/LandingPostulante'
import ConfirmacionDatos from './pages/ConfirmacionDatos'
import ConfirmacionInstitucion from './pages/ConfirmacionInstitucion'
import AltaPostulante from './pages/AltaPostulante'

function App() {
  const [page, setPage] = useState<'landing' | 'confirmacion' | 'confirmacion-institucion' | 'alta'>('landing')
  const [cidiData, setCidiData] = useState<{ represented: string; category: string; cuit: string } | null>(null)
  const [submittedList, setSubmittedList] = useState<Array<{
    categoria: string
    profesion: string
    estado: string
  }>>([])

  const handleStartPostulacion = () => {
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
    setPage('landing')
  }

  const handleCompletePostulacion = (profesion: string) => {
    setSubmittedList(prev => [
      ...prev,
      {
        categoria: cidiData?.category || 'Profesional de la salud',
        profesion: profesion || 'Médico',
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

