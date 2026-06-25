import { useState } from 'react'
import Header from '../components/Header'
import Sidebar2 from '../components/Sidebar'
import {
  PencilIcon, CalendarIcon, CheckIcon,
  HeartIcon, PulseIcon, ChevronDownIcon
} from '../components/Icons'

// ------- Read-only field component -------
function Field({
  label, value, icon, colSpan = 1,
}: {
  label: string
  value: string
  icon?: React.ReactNode
  colSpan?: number
}) {
  return (
    <div style={{ gridColumn: `span ${colSpan}` }}>
      <label style={{
        fontSize: '12.5px', fontWeight: 500, color: '#666',
        display: 'block', marginBottom: '5px',
      }}>
        {label}
      </label>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        backgroundColor: '#F3F4F6', border: '1px solid #e0e0e0',
        borderRadius: '6px', padding: '9px 12px',
        fontSize: '14px', color: '#444', userSelect: 'none',
        minHeight: '38px',
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
      fontSize: '11px', fontWeight: 700, color: '#666',
      letterSpacing: '0.08em', textTransform: 'uppercase',
      marginBottom: '14px', marginTop: '4px',
    }}>
      {children}
    </p>
  )
}

export default function ConfirmacionDatos({ onConfirm }: { onConfirm: (represented: string, category: string, cuit: string) => void }) {
  const [confirmed, setConfirmed] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Modal states
  const [represented, setRepresented] = useState<'camila' | 'sanatorio' | null>(null)
  const [category, setCategory] = useState<'profesional' | 'institucion' | 'discapacidad' | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const CIDI_URL = 'https://cidi.cba.gov.ar'

  const handleRepresentedChange = (val: 'camila' | 'sanatorio') => {
    setRepresented(val)
    setCategory(null) // Reset category to make them choose after changing representation
    setDropdownOpen(false)
  }

  const handleModalConfirm = () => {
    if (!represented || !category) return
    const isCamila = represented === 'camila'
    onConfirm(
      isCamila ? 'Camila Gonzales' : 'Sanatorio Allende S.A.',
      category === 'profesional' ? 'Profesional de la salud' : category === 'institucion' ? 'Institución' : 'Prestador de discapacidad',
      isCamila ? '27-12345678-9' : '30-12345678-9' // Pass CUIT
    )
    setIsModalOpen(false)
  }

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
          }}>

            {/* Title */}
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a', marginBottom: '20px' }}>
              Confirmación de datos personales
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
              <a
                href={CIDI_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  backgroundColor: '#0284C7', color: '#fff',
                  border: 'none', borderRadius: '6px',
                  padding: '9px 16px', fontSize: '13.5px', fontWeight: 600,
                  cursor: 'pointer', textDecoration: 'none', flexShrink: 0,
                  whiteSpace: 'nowrap', justifyContent: 'center',
                }}
              >
                Modificar
                <PencilIcon />
              </a>
            </div>

            {/* ── DATOS PERSONALES GRID ── */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '16px', marginBottom: '28px',
            }}>
              <Field label="CUIL / CUIT" value="27-12345678-9" />
              <Field label="Nombre y Apellido" value="Gonzales" />
              <Field label="Fecha de Nacimiento" value="26/11/2000" icon={<CalendarIcon />} />
              <Field label="Sexo" value="Femenino" />
              <Field label="Teléfono Personal" value="3541-895621" />
              <Field label="Dirección de email (personal)" value="Camilagonzales@gmail.com" />
            </div>

            {/* Divider */}
            <hr style={{ border: 'none', borderTop: '1px solid #ebebeb', marginBottom: '24px' }} />

            {/* ── DOMICILIO PERSONAL ── */}
            <SectionTitle>Domicilio Personal</SectionTitle>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              gap: '16px', marginBottom: '16px',
            }}>
              <Field label="Calle" value="Los tordos" />
              <Field label="Nº (puerta)" value="231" />
              <Field label="Apartamento" value="N/A" />
              <Field label="Código Postal" value="5111" />
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '16px', marginBottom: '16px',
            }}>
              <Field label="Barrio" value="Flores" />
              <Field label="Localidad" value="Cordoba Capital" />
            </div>

            <div style={{ marginBottom: '28px' }}>
              <Field label="Otros Datos" value="N/A" colSpan={1} />
            </div>

            {/* ── CHECKBOX ── */}
            <div
              onClick={() => setConfirmed(!confirmed)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                cursor: 'pointer', marginBottom: '32px', userSelect: 'none',
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
                Confirmo que los datos personales obtenidos desde CIDi son correctos y se encuentran actualizados.
              </span>
            </div>

            {/* ── ACTION BUTTONS ── */}
            <div style={{
              borderTop: '1px solid #ebebeb', paddingTop: '24px',
              display: 'flex', gap: '12px', justifyContent: 'space-between',
            }}>
              <button style={{
                flex: 1, padding: '11px 24px', borderRadius: '6px',
                border: '1px solid #d0d0d0', backgroundColor: '#fff',
                color: '#555', fontSize: '14px', fontWeight: 500,
                cursor: 'pointer',
              }}>
                Cancelar
              </button>

              <button
                disabled={!confirmed}
                onClick={() => setIsModalOpen(true)}
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

      {/* ── MODAL POPUP (CENTERED) ── */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.45)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            backgroundColor: '#fff', borderRadius: '12px',
            padding: '40px 48px', width: '1200px', maxWidth: '95%',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
            boxSizing: 'border-box',
          }}>
            {/* Modal Title */}
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
              Titular de la postulación
            </h2>
            <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '24px', lineHeight: '1.5' }}>
              Utilizaremos esta información para adaptar el formulario y la documentación solicitada.
            </p>

            {/* Dropdown Section */}
            <div style={{ marginBottom: '28px', position: 'relative' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                ¿A quién vas a representar en este trámite? <span style={{ color: '#EF4444' }}>*</span>
              </label>

              {/* Custom Selector Trigger */}
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  border: '1px solid #D1D5DB', borderRadius: '6px',
                  padding: '10px 14px', cursor: 'pointer', backgroundColor: '#fff',
                  fontSize: '13.5px', color: '#1F2937', userSelect: 'none',
                }}
              >
                <span>
                  {represented === 'camila'
                    ? '(27452521770) Camila Gonzales'
                    : represented === 'sanatorio'
                    ? '(30452521770) Sanatorio Allende S.A'
                    : 'Seleccione...'}
                </span>
                <span style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease', color: '#6B7280' }}>
                  <ChevronDownIcon />
                </span>
              </div>

              {/* Dropdown Options List */}
              {dropdownOpen && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, right: 0,
                  marginTop: '4px', backgroundColor: '#fff', border: '1px solid #D1D5DB',
                  borderRadius: '6px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  zIndex: 1010, overflow: 'hidden',
                }}>
                  <div
                    onClick={() => handleRepresentedChange('camila')}
                    style={{
                      padding: '10px 14px', fontSize: '13.5px', cursor: 'pointer',
                      backgroundColor: represented === 'camila' ? '#00AC99' : '#fff',
                      color: represented === 'camila' ? '#fff' : '#1F2937',
                    }}
                  >
                    (27452521770) Camila Gonzales
                  </div>
                  <div
                    onClick={() => handleRepresentedChange('sanatorio')}
                    style={{
                      padding: '10px 14px', fontSize: '13.5px', cursor: 'pointer',
                      backgroundColor: represented === 'sanatorio' ? '#00AC99' : '#fff',
                      color: represented === 'sanatorio' ? '#fff' : '#1F2937',
                    }}
                  >
                    (30452521770) Sanatorio Allende S.A
                  </div>
                </div>
              )}
            </div>

            {/* Category Title */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#374151', display: 'block', letterSpacing: '0.05em', marginBottom: '14px', textTransform: 'uppercase' }}>
                ¿EN QUE CATEGORÍA DESEAS INSCRIBIRTE?
              </label>

              {/* Dynamic Category Cards */}
              <div className="responsive-flex-col" style={{ display: 'flex', gap: '16px' }}>
                {represented === null ? (
                  <div style={{
                    flex: 1,
                    fontSize: '13px',
                    color: '#6B7280',
                    fontStyle: 'italic',
                    padding: '24px',
                    border: '1px dashed #D1D5DB',
                    borderRadius: '8px',
                    textAlign: 'center',
                    backgroundColor: '#F9FAFB'
                  }}>
                    Seleccione primero a quién representar para habilitar la elección de la categoría.
                  </div>
                ) : represented === 'camila' ? (
                  <>
                    {/* Profesional de la salud */}
                    <div
                      onClick={() => setCategory('profesional')}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        border: category === 'profesional' ? '2px solid #00AC99' : '1px solid #E5E7EB',
                        borderRadius: '8px', padding: category === 'profesional' ? '13px 15px' : '14px 16px',
                        cursor: 'pointer', flex: 1, backgroundColor: '#fff',
                        userSelect: 'none', transition: 'border 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '50%',
                          backgroundColor: '#E6F6F4', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          color: '#00AC99', marginRight: '10px',
                        }}>
                          <PulseIcon />
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937' }}>
                          Profesional de la salud
                        </span>
                      </div>
                      <div style={{
                        width: '18px', height: '18px', borderRadius: '50%',
                        border: category === 'profesional' ? '2px solid #00AC99' : '2px solid #D1D5DB',
                        backgroundColor: category === 'profesional' ? '#E6F6F4' : '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {category === 'profesional' && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00AC99" strokeWidth="4">
                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Prestador de discapacidad */}
                    <div
                      onClick={() => setCategory('discapacidad')}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        border: category === 'discapacidad' ? '2px solid #00AC99' : '1px solid #E5E7EB',
                        borderRadius: '8px', padding: category === 'discapacidad' ? '13px 15px' : '14px 16px',
                        cursor: 'pointer', flex: 1, backgroundColor: '#fff',
                        userSelect: 'none', transition: 'border 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '50%',
                          backgroundColor: '#EEF2FF', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          color: '#2563EB', marginRight: '10px',
                        }}>
                          <HeartIcon />
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937' }}>
                          Prestador de discapacidad
                        </span>
                      </div>
                      <div style={{
                        width: '18px', height: '18px', borderRadius: '50%',
                        border: category === 'discapacidad' ? '2px solid #00AC99' : '2px solid #D1D5DB',
                        backgroundColor: category === 'discapacidad' ? '#E6F6F4' : '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {category === 'discapacidad' && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00AC99" strokeWidth="4">
                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Institución */}
                    <div
                      onClick={() => setCategory('institucion')}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        border: category === 'institucion' ? '2px solid #00AC99' : '1px solid #E5E7EB',
                        borderRadius: '8px', padding: category === 'institucion' ? '13px 15px' : '14px 16px',
                        cursor: 'pointer', flex: 1, backgroundColor: '#fff',
                        userSelect: 'none', transition: 'border 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '50%',
                          backgroundColor: '#E6F6F4', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          color: '#00AC99', marginRight: '10px',
                        }}>
                          <PulseIcon />
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937' }}>
                          Institución
                        </span>
                      </div>
                      <div style={{
                        width: '18px', height: '18px', borderRadius: '50%',
                        border: category === 'institucion' ? '2px solid #00AC99' : '2px solid #D1D5DB',
                        backgroundColor: category === 'institucion' ? '#E6F6F4' : '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {category === 'institucion' && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00AC99" strokeWidth="4">
                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Prestador de discapacidad */}
                    <div
                      onClick={() => setCategory('discapacidad')}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        border: category === 'discapacidad' ? '2px solid #00AC99' : '1px solid #E5E7EB',
                        borderRadius: '8px', padding: category === 'discapacidad' ? '13px 15px' : '14px 16px',
                        cursor: 'pointer', flex: 1, backgroundColor: '#fff',
                        userSelect: 'none', transition: 'border 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '50%',
                          backgroundColor: '#EEF2FF', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          color: '#2563EB', marginRight: '10px',
                        }}>
                          <HeartIcon />
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937' }}>
                          Prestador de discapacidad
                        </span>
                      </div>
                      <div style={{
                        width: '18px', height: '18px', borderRadius: '50%',
                        border: category === 'discapacidad' ? '2px solid #00AC99' : '2px solid #D1D5DB',
                        backgroundColor: category === 'discapacidad' ? '#E6F6F4' : '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {category === 'discapacidad' && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00AC99" strokeWidth="4">
                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '36px' }}>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  flex: 1, padding: '11px 24px', borderRadius: '6px',
                  border: '1px solid #D1D5DB', backgroundColor: '#fff',
                  color: '#374151', fontSize: '14px', fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>

              <button
                disabled={represented === null || category === null}
                onClick={handleModalConfirm}
                style={{
                  flex: 1, padding: '11px 24px', borderRadius: '6px',
                  border: 'none',
                  backgroundColor: represented === null || category === null ? '#e5e5e5' : '#00AC99',
                  color: represented === null || category === null ? '#a3a3a3' : '#fff',
                  fontSize: '14px', fontWeight: 600,
                  cursor: represented === null || category === null ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.25s ease, color 0.25s ease',
                }}
              >
                Confirmar
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}
