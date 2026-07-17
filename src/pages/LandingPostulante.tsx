import Header from '../components/Header'
import Sidebar2 from '../components/Sidebar2'

interface LandingPostulanteProps {
  onStart: () => void
  submittedPostulaciones?: Array<{
    cuit?: string
    represented?: string
    categoria: string
    profesion?: string
    especialidades?: string[]
    nivelAtencion?: string
    tipoInstitucionNivel?: string
    tipoInstitucion?: string
    estado: string
    isPreinscrito?: boolean
  }>
  onSimularAprobacion?: (index?: number) => void
  onSimularNuevo?: () => void
  onStartInscripcion?: (index?: number) => void
}

export default function LandingPostulante({ onStart, submittedPostulaciones = [], onSimularAprobacion, onSimularNuevo, onStartInscripcion }: LandingPostulanteProps) {
  const lastPostulacion = submittedPostulaciones[submittedPostulaciones.length - 1] || null
  const isBioquimico = lastPostulacion?.profesion === 'Bioquímico' || lastPostulacion?.profesion === 'Bioquimico'
  const first = submittedPostulaciones[0] || null
  const firstEstado = first?.estado === 'Inscripto' ? 'En revisión' : first?.estado
  const firstIsPreinscrito = first?.isPreinscrito || first?.estado === 'Inscripto'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f4f4f4' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar2 />
        <main style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
          <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto' }}>

            {/* Title Row */}
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 400, color: '#333', margin: 0, fontFamily: 'Arial, sans-serif' }}>
                Registro Postulantes
              </h1>
              <span style={{ fontSize: '15px', color: '#6B7280', fontWeight: 400 }}>
                Iniciá tu postulación para formar parte de la red de prestadores
              </span>
            </div>

            {/* ── HERO BANNER (empty state) ── */}
            {submittedPostulaciones.length === 0 && (
              <div style={{
                background: 'linear-gradient(135deg, #00AC99 0%, #007B8A 100%)',
                borderRadius: '16px', overflow: 'hidden', display: 'flex',
                alignItems: 'stretch', minHeight: '220px',
                boxShadow: '0 6px 20px rgba(0, 172, 153, 0.20)', position: 'relative',
              }}>
                <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '180px', height: '180px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-40px', left: '280px', width: '200px', height: '200px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
                <div style={{ flex: 1, padding: '28px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: '0 0 8px 0', lineHeight: 1.2 }}>Iniciá tu postulación</h2>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.92)', lineHeight: 1.5, margin: '0 0 16px 0', maxWidth: '540px', fontWeight: 500 }}>
                    Ahora podés postularte como prestador/a de Apross a través de un formulario online.
                  </p>
                  <div style={{ backgroundColor: 'rgba(0,0,0,0.18)', borderLeft: '3px solid rgba(255,255,255,0.5)', borderRadius: '0 6px 6px 0', padding: '10px 14px', marginBottom: '20px', maxWidth: '560px' }}>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, margin: 0 }}>
                      <strong style={{ color: 'rgba(255,255,255,0.95)' }}>Importante:</strong>{' '}
                      Este formulario es solo una postulación de interés. No implica alta ni vinculación contractual con APROSS.
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={onStart}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#fff', color: '#007B8A', border: 'none', borderRadius: '8px', padding: '10px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.15)', transition: 'transform 0.15s ease, box-shadow 0.15s ease' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 16px rgba(0,0,0,0.20)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 10px rgba(0,0,0,0.15)' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      Iniciar postulación
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── LIST VIEW ── */}
            {submittedPostulaciones.length > 0 && first && (
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1.2fr)', gap: '24px', alignItems: 'start' }}>

                {/* LEFT col */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                  {/* Single unified card */}
                  <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px 28px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>

                    {/* Header — once */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #F3F4F6' }}>
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                        backgroundColor: firstEstado === 'Seleccionado' ? '#D1FAE5' : '#FEF3C7',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: firstEstado === 'Seleccionado' ? '#10B981' : '#D97706',
                      }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          {firstEstado === 'Seleccionado'
                            ? <path d="M20 6L9 17l-5-5" />
                            : <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>}
                        </svg>
                      </div>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1F2937', margin: '0 0 2px 0' }}>
                          {firstIsPreinscrito ? 'Tu pre-inscripción está en revisión' : firstEstado === 'Seleccionado' ? 'Tu postulación fue seleccionada' : `Tu postulación está ${firstEstado?.toLowerCase()}`}
                        </h3>
                        <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>
                          {firstIsPreinscrito
                            ? 'Nuestro equipo está evaluando la documentación de tu pre-inscripción.'
                            : firstEstado === 'Seleccionado'
                            ? 'Podés continuar con la inscripción.'
                            : 'Nuestro equipo está evaluando tus datos iniciales.'}
                        </p>
                      </div>
                    </div>

                    {/* Rows — one per postulacion */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {submittedPostulaciones.map((p, index) => {
                        const estado = p.estado === 'Inscripto' ? 'En revisión' : p.estado
                        const isPreinscrito = p.isPreinscrito || p.estado === 'Inscripto'
                        const isProfessional = p.categoria === 'Profesional de la salud'
                        const isInstitution = p.categoria === 'Institución'
                        const isDisability = p.categoria === 'Prestador de discapacidad'
                        return (
                          <div key={index}>
                            {index > 0 && <div style={{ height: '1px', backgroundColor: '#F3F4F6', margin: '14px 0' }} />}
                            <div style={{ backgroundColor: '#F9FAFB', borderRadius: '10px', border: '1px solid #F3F4F6', padding: '14px 18px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                              <div style={{ paddingRight: '135px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '14px', color: '#374151', fontWeight: 600 }}>{p.represented || 'Camila Gonzales'}</span>
                                {isPreinscrito && (
                                  <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    padding: '2px 8px',
                                    backgroundColor: '#EFF6FF',
                                    border: '1px solid #BFDBFE',
                                    borderRadius: '4px',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    color: '#1D4ED8'
                                  }}>
                                    Pre-inscripción
                                  </span>
                                )}
                              </div>
                              <span style={{ fontSize: '13px', color: '#6B7280' }}>CUIT/CUIL: <strong style={{ color: '#1F2937' }}>{p.cuit || '27-457475-9'}</strong></span>
                              <span style={{ fontSize: '13px', color: '#6B7280' }}>Categoría: <strong style={{ color: '#1F2937' }}>{p.categoria}</strong></span>
                              {isProfessional && p.profesion && (
                                <span style={{ fontSize: '13px', color: '#6B7280' }}>Profesión/Tipo: <strong style={{ color: '#1F2937' }}>{p.profesion}</strong></span>
                              )}
                              {isProfessional && p.profesion === 'Medico' && p.especialidades && p.especialidades.length > 0 && (
                                <span style={{ fontSize: '13px', color: '#6B7280' }}>Especialidad: <strong style={{ color: '#1F2937' }}>{p.especialidades.join(', ')}</strong></span>
                              )}
                              {isInstitution && p.nivelAtencion && (
                                <span style={{ fontSize: '13px', color: '#6B7280' }}>Clasificación: <strong style={{ color: '#1F2937' }}>{p.nivelAtencion}</strong></span>
                              )}
                              {isDisability && (
                                <span style={{ fontSize: '13px', color: '#6B7280' }}>Tipo: <strong style={{ color: '#1F2937' }}>{p.tipoInstitucion || 'Centro de Rehabilitación'}</strong></span>
                              )}

                              {/* Status pill */}
                              <div style={{ position: 'absolute', right: '18px', top: '14px' }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: estado === 'Seleccionado' ? '#D1FAE5' : '#FFFBEB', border: `1px solid ${estado === 'Seleccionado' ? '#A7F3D0' : '#FDE68A'}`, borderRadius: '24px', padding: '5px 12px' }}>
                                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: estado === 'Seleccionado' ? '#10B981' : '#F59E0B' }} />
                                  <span style={{ fontSize: '11px', fontWeight: 700, color: estado === 'Seleccionado' ? '#065F46' : '#B45309', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{estado}</span>
                                </div>
                              </div>

                              {/* Inscripcion button OR completion banner */}
                              {isPreinscrito ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', padding: '10px 14px', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px' }}>
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                  <span style={{ fontSize: '13px', color: '#065F46', fontWeight: 600 }}>Fin del flujo — Pre-inscripción enviada correctamente.</span>
                                </div>
                              ) : estado === 'Seleccionado' && onStartInscripcion && !(p.profesion === 'Bioquímico' || p.profesion === 'Bioquimico') ? (
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                                  <button
                                    onClick={() => onStartInscripcion(index)}
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '9px 18px', backgroundColor: '#00AC99', color: 'white', fontWeight: 600, fontSize: '13px', borderRadius: '8px', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,172,153,0.25)', transition: 'all 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#009584'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#00AC99'; e.currentTarget.style.transform = 'translateY(0)' }}
                                  >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                    Iniciar Pre-inscripción
                                  </button>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Thin "nueva postulacion" banner */}
                  <button
                    onClick={onStart}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', padding: '14px 20px', backgroundColor: '#fff', border: '2px dashed #D1D5DB', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s ease', color: '#6B7280' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#00AC99'; e.currentTarget.style.backgroundColor = '#F0FDF9'; e.currentTarget.style.color = '#00AC99' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#6B7280' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>Agregar otra postulación</span>
                  </button>
                </div>

                {/* RIGHT: single side panel */}
                <div style={{ position: 'sticky', top: '24px' }}>
                  {isBioquimico ? (
                    <div style={{ backgroundColor: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284C7' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                        </div>
                        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Trámite Excepcional</h4>
                      </div>
                      <p style={{ margin: 0, fontSize: '13.5px', color: '#475569', lineHeight: 1.5 }}>
                        Por tu profesión, no necesitas realizar la etapa de inscripción en este portal. La validación y alta final se gestionará directamente a través de tu Colegio Profesional.
                      </p>
                    </div>
                  ) : (
                    <div style={{ backgroundColor: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284C7' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                        </div>
                        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Próximos Pasos</h4>
                      </div>
                      <p style={{ margin: 0, fontSize: '13.5px', color: '#475569', lineHeight: 1.5 }}>
                        Una vez que tu postulación sea aprobada, deberás completar la etapa de inscripción. Ten a mano la siguiente información:
                      </p>
                      <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                          { label: 'Datos Fiscales:', desc: 'CUIT, Condición de AFIP e Ingresos Brutos.' },
                          { label: 'Seguros y Habilitaciones:', desc: 'Póliza de mala praxis y certificado de habilitación correspondiente.' },
                          { label: 'Documentación Legal:', desc: 'Archivos y permisos vigentes según tu categoría.' },
                          { label: 'Datos Bancarios:', desc: 'CBU para la gestión de pagos.' },
                        ].map(item => (
                          <li key={item.label} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><polyline points="20 6 9 17 4 12" /></svg>
                            <span style={{ fontSize: '13px', color: '#334155', lineHeight: 1.4 }}>
                              <strong style={{ color: '#0F172A' }}>{item.label}</strong> {item.desc}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Secret Admin Menu */}
      <div
        style={{ position: 'fixed', top: '50%', right: 0, transform: 'translateY(-50%) translateX(calc(100% - 16px))', width: '200px', backgroundColor: '#1F2937', padding: '24px 16px', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', zIndex: 9999, boxShadow: '-4px 0 15px rgba(0,0,0,0.2)' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-50%) translateX(0)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(-50%) translateX(calc(100% - 16px))'}
      >
        <div style={{ position: 'absolute', left: '-20px', top: 0, bottom: 0, width: '20px', cursor: 'pointer' }} />
        <div style={{ position: 'absolute', left: '6px', top: '50%', transform: 'translateY(-50%)', width: '4px', height: '40px', backgroundColor: '#4B5563', borderRadius: '4px' }} />
        <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Admin Tools</p>
        {onSimularNuevo && (
          <button onClick={onSimularNuevo} style={{ padding: '8px 12px', backgroundColor: '#374151', color: 'white', border: '1px solid #4B5563', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
            Simular Nuevo
          </button>
        )}
        {onSimularAprobacion && submittedPostulaciones.map((p, i) => {
          const estado = p.estado === 'Inscripto' ? 'En revisión' : p.estado
          const isPreinscrito = p.isPreinscrito || p.estado === 'Inscripto'
          return (estado === 'En revisión' && !isPreinscrito) ? (
            <button
              key={i}
              onClick={() => onSimularAprobacion(i)}
              style={{ padding: '8px 12px', backgroundColor: '#F59E0B', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}
            >
              Aprobar #{i + 1} ({p.profesion || p.categoria})
            </button>
          ) : null
        })}
        <button onClick={() => window.location.href = '/backoffice'} style={{ padding: '8px 12px', backgroundColor: '#00AC99', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
          Ir al Backoffice
        </button>
      </div>
    </div>
  )
}
