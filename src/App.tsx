import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import LandingPostulante from './pages/LandingPostulante'
import ConfirmacionDatos from './pages/ConfirmacionDatos'
import ConfirmacionInstitucion from './pages/ConfirmacionInstitucion'
import AltaPostulante from './pages/AltaPostulante'
import FinPrototipo from './pages/FinPrototipo'
import Backoffice from './pages/Backoffice'

function App() {
  const navigate = useNavigate()
  const [cidiData, setCidiData] = useState<{ represented: string; category: string; cuit: string } | null>(null)
  const [submittedPostulacion, setSubmittedPostulacion] = useState<{
    cuit: string
    represented: string
    categoria: string
    profesion?: string
    especialidades?: string[]
    nivelAtencion?: string
    tipoInstitucionNivel?: string
    tipoInstitucion?: string
    estado: string
  } | null>(null)

  const [fase, setFase] = useState<'borrador' | 'aceptado'>('borrador')

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
    setSubmittedPostulacion({
      cuit: data.cuit,
      represented: data.represented,
      categoria: data.categoria,
      profesion: data.profesion,
      especialidades: data.especialidades,
      nivelAtencion: data.nivelAtencion,
      tipoInstitucionNivel: data.tipoInstitucionNivel,
      tipoInstitucion: data.tipoInstitucion,
      estado: 'En revisión'
    })
    navigate('/')
  }

  const handleSimularAprobacion = () => {
    if (submittedPostulacion) {
      setSubmittedPostulacion({ ...submittedPostulacion, estado: 'Aceptado' })
    }
  }

  const handleSimularNuevo = () => {
    setSubmittedPostulacion(null)
  }

  const handleStartInscripcion = () => {
    if (submittedPostulacion) {
      setCidiData({ represented: submittedPostulacion.represented, category: submittedPostulacion.categoria, cuit: submittedPostulacion.cuit })
      setFase('aceptado')
      navigate('/alta/datos-fiscales')
    }
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPostulante onStart={handleStartPostulacion} submittedPostulacion={submittedPostulacion} onSimularAprobacion={handleSimularAprobacion} onSimularNuevo={handleSimularNuevo} onStartInscripcion={handleStartInscripcion} />} />
      <Route path="/confirmacion" element={<ConfirmacionDatos onConfirm={handleConfirmCidi} />} />
      <Route path="/confirmacion-institucion" element={
        <ConfirmacionInstitucion
          onConfirm={handleConfirmInstitution}
          onCancel={handleCancelInstitution}
        />
      } />
      <Route path="/fin-prototipo" element={<FinPrototipo />} />
      <Route path="/alta/*" element={
        <AltaPostulante
          cidiData={cidiData}
          onGoBack={handleGoBack}
          onComplete={handleCompletePostulacion}
          fase={fase}
        />
      } />
      <Route path="/backoffice" element={<Backoffice />} />
    </Routes>
  )
}

export default App


