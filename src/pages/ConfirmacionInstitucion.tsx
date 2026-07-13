import { useState } from 'react'
import Header from '../components/Header'
import Sidebar2 from '../components/Sidebar2'
import { PencilIcon, CheckIcon } from '../components/Icons'

// ------- Read-only field component -------
function Field({
  label, value, icon, colSpan = 1, required = false
}: {
  label: string
  value: string
  icon?: React.ReactNode
  colSpan?: number
  required?: boolean
}) {
  return (
    <div style={{ gridColumn: `span ${colSpan}` }}>
      <label style={{
        fontSize: '12.5px', fontWeight: 600, color: '#374151',
        display: 'block', marginBottom: '5px',
      }}>
        {label} {required && <span style={{ color: '#EF4444' }}>*</span>}
      </label>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        backgroundColor: '#F3F4F6', border: '1px solid #dcdcdc',
        borderRadius: '6px', padding: '9px 12px',
        fontSize: '14px', color: '#1F2937', userSelect: 'none',
        minHeight: '38px', boxSizing: 'border-box'
      }}>
        {icon && <span style={{ color: '#888', display: 'flex', alignItems: 'center' }}>{icon}</span>}
        <span>{value}</span>
      </div>
    </div>
  )
}

// ------- Section title -------
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: '11px', fontWeight: 700, color: '#4B5563',
      letterSpacing: '0.08em', textTransform: 'uppercase',
      marginBottom: '14px', marginTop: '24px',
    }}>
      {children}
    </p>
  )
}

interface ConfirmacionInstitucionProps {
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmacionInstitucion({
  onConfirm,
  onCancel
}: ConfirmacionInstitucionProps) {
  const [confirmed, setConfirmed] = useState(false)
  const [isCidiModalOpen, setIsCidiModalOpen] = useState(false)
  const CIDI_URL = 'https://cidi.cba.gov.ar'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f4f4f4', position: 'relative' }}>
      <Header />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar2 />

        {/* Main content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
          <div style={{
            backgroundColor: '#fff', borderRadius: '8px',
            border: '1px solid #e8e8e8', padding: '28px 32px',
            width: '100%', maxWidth: '1200px',
            margin: '0 auto',
            boxSizing: 'border-box'
          }}>

            {/* Title */}
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', marginBottom: '20px' }}>
              Confirmación de datos de la institucion
            </h1>

            {/* Info banner */}
            <div
              className="responsive-flex-col"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: '24px', marginBottom: '28px',
              }}
            >
              <div style={{
                backgroundColor: '#fff', border: '1px solid #C7E6F8',
                borderRadius: '4px', padding: '14px 18px', flex: 1,
                width: '100%', boxSizing: 'border-box',
              }}>
                <p style={{ fontSize: '13.5px', color: '#374151', lineHeight: '1.6', margin: 0 }}>
                  Los datos personales fueron obtenidos desde CiDi. Verificá que la información sea correcta antes de continuar.
                  <br />
                  Si necesitás realizar modificaciones, realizalo desde el portal de CiDi y luego actualizá la información.
                </p>
              </div>
              <button
                onClick={() => {
                  window.open(CIDI_URL, '_blank')
                  setIsCidiModalOpen(true)
                }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  backgroundColor: '#0284C7', color: '#fff',
                  border: 'none', borderRadius: '6px',
                  padding: '9px 16px', fontSize: '13.5px', fontWeight: 600,
                  cursor: 'pointer', flexShrink: 0,
                  whiteSpace: 'nowrap', justifyContent: 'center',
                }}
              >
                Modificar
                <PencilIcon />
              </button>
            </div>

            {/* ── IDENTIFICADORES DEL ESTABLECIMIENTO ── */}
            <SectionTitle>IDENTIFICADORES DEL ESTABLECIMIENTO</SectionTitle>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '16px', marginBottom: '20px',
            }}>
              <Field label="REFES" value="34254322" required />
              <Field label="Registro Provincial" value="AL58742" required />
              <Field label="RNP" value="20458778" required />
              <Field label="Resolucion/Disposición" value="1547895" required />
            </div>

            {/* ── DATOS DEL DIRECTOR TECNICO/MEDICO ── */}
            <SectionTitle>DATOS DEL DIRECTOR TECNICO/MEDICO</SectionTitle>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              gap: '16px', marginBottom: '20px',
            }}>
              <Field label="CUIT/CUIL" value="20413238770" />
              <Field label="Nombre y Apellido" value="Franco, Gustamante" />
              <Field label="Numero de matricula profesional" value="234145" />
            </div>

            {/* ── DATOS DEL REPRESENTANTE LEGAL ── */}
            <SectionTitle>DATOS DEL REPRESENTANTE LEGAL</SectionTitle>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              gap: '16px', marginBottom: '16px',
            }}>
              {/* Representative Row 1 */}
              <Field label="CUIT/CUIL" value="20413238770" />
              <Field label="Nombre y Apellido" value="Camila, Gonzales" />
              <Field label="Rol" value="Presidente" />

              {/* Representative Row 2 */}
              <Field label="CUIT/CUIL" value="20413238770" />
              <Field label="Nombre y Apellido" value="Mateo, Oliva" />
              <Field label="Rol" value="Vicepresidente" />
            </div>

            {/* ── CHECKBOX ── */}
            <div
              onClick={() => setConfirmed(!confirmed)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                cursor: 'pointer', marginTop: '32px', marginBottom: '32px', userSelect: 'none',
              }}
            >
              {/* Custom checkbox */}
              <div style={{
                width: '18px', height: '18px', borderRadius: '4px',
                border: confirmed ? '2px solid #00AC99' : '2px solid #bbb',
                backgroundColor: confirmed ? '#00AC99' : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}>
                {confirmed && <CheckIcon />}
              </div>
              <span style={{ fontSize: '13.5px', color: '#555', lineHeight: 1.5 }}>
                Confirmo que los datos personales obtenidos desde CiDi son correctos y se encuentran actualizados.
              </span>
            </div>

            {/* ── ACTION BUTTONS ── */}
            <div style={{
              borderTop: '1px solid #ebebeb', paddingTop: '24px',
              display: 'flex', gap: '12px', justifyContent: 'space-between',
            }}>
              <button
                onClick={onCancel}
                style={{
                  flex: 1, padding: '11px 24px', borderRadius: '6px',
                  border: '1px solid #d0d0d0', backgroundColor: '#fff',
                  color: '#555', fontSize: '14px', fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>

              <button
                disabled={!confirmed}
                onClick={onConfirm}
                style={{
                  flex: 1, padding: '11px 24px', borderRadius: '6px',
                  border: 'none', fontSize: '14px', fontWeight: 600,
                  cursor: confirmed ? 'pointer' : 'not-allowed',
                  backgroundColor: confirmed ? '#00AC99' : '#c5c5c5',
                  color: '#fff',
                  transition: 'background-color 0.25s ease',
                }}
              >
                Confirmar
              </button>
            </div>

          </div>
        </main>
      </div>
      {/* ── CIDI MODAL POPUP (CENTERED) ── */}
      {isCidiModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.45)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            backgroundColor: '#fff', borderRadius: '16px',
            padding: '40px', width: '480px', maxWidth: '95%',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
            boxSizing: 'border-box',
            textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              backgroundColor: '#F0FDF4', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginBottom: '24px'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00AC99" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
              Actualización de datos de CiDi
            </h2>
            <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '32px', lineHeight: '1.5', maxWidth: '380px' }}>
              Una vez que hayas modificado tus datos en el portal de CiDi, por favor hacé clic en "Actualizar" para refrescar la información en esta pantalla
            </p>
            <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
              <button
                onClick={() => setIsCidiModalOpen(false)}
                style={{
                  flex: 1, padding: '12px 0', borderRadius: '8px',
                  border: '1px solid #D1D5DB', backgroundColor: '#fff',
                  color: '#374151', fontSize: '14px', fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  // Simulate refresh by just closing it for now
                  setIsCidiModalOpen(false)
                }}
                style={{
                  flex: 1, padding: '12px 0', borderRadius: '8px',
                  border: 'none', backgroundColor: '#00AC99',
                  color: '#fff', fontSize: '14px', fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
