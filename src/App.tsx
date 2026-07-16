import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import LandingPostulante from './pages/LandingPostulante'
import ConfirmacionDatos from './pages/ConfirmacionDatos'
import ConfirmacionInstitucion from './pages/ConfirmacionInstitucion'
import AltaPostulante from './pages/AltaPostulante'
import Backoffice from './pages/Backoffice'

function App() {
  const navigate = useNavigate()
  const [cidiData, setCidiData] = useState<{ represented: string; category: string; cuit: string } | null>(null)
  const [submittedPostulaciones, setSubmittedPostulaciones] = useState<{
    cuit: string
    represented: string
    categoria: string
    profesion?: string
    especialidades?: string[]
    nivelAtencion?: string
    tipoInstitucionNivel?: string
    tipoInstitucion?: string
    estado: string
  }[]>([])

  const [fase, setFase] = useState<'borrador' | 'aceptado'>('borrador')
  // Tracks which postulacion is being inscripted (null = new postulacion flow)
  const [activeInscripcionIndex, setActiveInscripcionIndex] = useState<number | null>(null)

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
    setActiveInscripcionIndex(null)
    setFase('borrador')
    navigate('/confirmacion')
  }

  const handleConfirmCidi = (represented: string, category: string, cuit: string) => {
    setCidiData({ represented, category, cuit })
    if (represented === 'Sanatorio Allende S.A.') {
      navigate('/alta/datos-institucion')
    } else {
      navigate('/alta/datos-perfil')
    }
  }

  const handleConfirmInstitution = () => {
    navigate('/alta/datos-perfil')
  }

  const handleCancelInstitution = () => {
    navigate('/confirmacion')
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
    navigate('/')
  }

  const handleCompletePostulacion = (data: {
    cuit: string
    represented: string
    categoria: string
    profesion?: string
    especialidades?: string[]
    nivelAtencion?: string
    tipoInstitucionNivel?: string
    tipoInstitucion?: string
  }) => {
    if (fase === 'aceptado' && activeInscripcionIndex !== null) {
      // Completing the inscription flow → mark that postulacion as 'Inscripto'
      setSubmittedPostulaciones(prev => {
        const next = [...prev]
        if (next[activeInscripcionIndex]) {
          next[activeInscripcionIndex] = { ...next[activeInscripcionIndex], estado: 'Inscripto' }
        }
        return next
      })
      setActiveInscripcionIndex(null)
    } else {
      // New postulacion flow → append to list
      setSubmittedPostulaciones(prev => [...prev, {
        cuit: data.cuit,
        represented: data.represented,
        categoria: data.categoria,
        profesion: data.profesion,
        especialidades: data.especialidades,
        nivelAtencion: data.nivelAtencion,
        tipoInstitucionNivel: data.tipoInstitucionNivel,
        tipoInstitucion: data.tipoInstitucion,
        estado: 'En revisión'
      }])
    }
    navigate('/')
  }

  const handleSimularAprobacion = (index: number = 0) => {
    setSubmittedPostulaciones(prev => {
      const next = [...prev]
      if (next[index]) next[index] = { ...next[index], estado: 'Aceptado' }
      return next
    })
  }

  const handleSimularNuevo = () => {
    setSubmittedPostulaciones([])
  }

  const handleStartInscripcion = (index: number = 0) => {
    const postulacion = submittedPostulaciones[index]
    if (postulacion) {
      setCidiData({ represented: postulacion.represented, category: postulacion.categoria, cuit: postulacion.cuit })
      setActiveInscripcionIndex(index)
      setFase('aceptado')
      navigate('/alta/datos-fiscales')
    }
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPostulante onStart={handleStartPostulacion} submittedPostulaciones={submittedPostulaciones} onSimularAprobacion={handleSimularAprobacion} onSimularNuevo={handleSimularNuevo} onStartInscripcion={handleStartInscripcion} />} />
      <Route path="/confirmacion" element={<ConfirmacionDatos onConfirm={handleConfirmCidi} />} />
      <Route path="/confirmacion-institucion" element={
        <ConfirmacionInstitucion
          onConfirm={handleConfirmInstitution}
          onCancel={handleCancelInstitution}
        />
      } />
      <Route path="/alta/*" element={
        <AltaPostulante
          cidiData={cidiData}
          onGoBack={handleGoBack}
          onComplete={handleCompletePostulacion}
          fase={fase}
        />
      } />
      <Route path="/backoffice" element={<Backoffice submittedPostulaciones={submittedPostulaciones} />} />
    </Routes>
  )
}

export default App
