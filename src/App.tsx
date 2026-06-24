import { useState } from 'react'
import ConfirmacionDatos from './pages/ConfirmacionDatos'
import ConfirmacionInstitucion from './pages/ConfirmacionInstitucion'
import AltaPostulante from './pages/AltaPostulante'

function App() {
  const [page, setPage] = useState<'confirmacion' | 'confirmacion-institucion' | 'alta'>('confirmacion')
  const [cidiData, setCidiData] = useState<{ represented: string; category: string } | null>(null)

  const handleConfirmCidi = (represented: string, category: string) => {
    setCidiData({ represented, category })
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
    setPage('confirmacion')
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

  return <AltaPostulante cidiData={cidiData} onGoBack={handleGoBack} />
}

export default App
