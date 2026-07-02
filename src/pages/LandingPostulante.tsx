import Header from '../components/Header'
import Sidebar2 from '../components/Sidebar2'

interface LandingPostulanteProps {
  onStart: () => void
  submittedPostulacion?: {
    cuit?: string
    represented?: string
    categoria: string
    profesion?: string
    nivelAtencion?: string
    tipoInstitucionNivel?: string
    tipoInstitucion?: string
    estado: string
  } | null
  onSimularAprobacion?: () => void
  onSimularNuevo?: () => void
  onStartInscripcion?: () => void
}

export default function LandingPostulante({ onStart, submittedPostulacion, onSimularAprobacion, onSimularNuevo, onStartInscripcion }: LandingPostulanteProps) {
  const isProfessional = submittedPostulacion?.categoria === 'Profesional de la salud'
  const isInstitution = submittedPostulacion?.categoria === 'Institución'
  const isDisability = submittedPostulacion?.categoria === 'Prestador de discapacidad'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f4f4f4' }}>
      <Header />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar2 />

        <main style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
          <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto' }}>



            {/* Title Row */}
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 400, color: '#333', margin: 0, fontFamily: 'Arial, sans-serif' }}>
                  Registro Postulantes
                </h1>
                <span style={{ fontSize: '15px', color: '#6B7280', fontWeight: 400 }}>
                  Iniciá tu postulación para formar parte de la red de prestadores
                </span>
              </div>

              {/* Simulation Buttons in Header */}
              {submittedPostulacion && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  {onSimularNuevo && (
                    <button
                      onClick={onSimularNuevo}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#F3F4F6',
                        color: '#4B5563',
                        fontWeight: 600,
                        fontSize: '13px',
                        borderRadius: '6px',
                        border: '1px solid #D1D5DB',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E5E7EB'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                    >
                      Simular Nuevo
                    </button>
                  )}
                  {submittedPostulacion.estado === 'En revisión' && onSimularAprobacion && (
                    <button
                      onClick={onSimularAprobacion}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#F59E0B',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '13px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(245, 158, 11, 0.2)',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#D97706'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F59E0B'}
                    >
                      Simular Aprobación
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* ── HERO BANNER (Only when no submittedPostulacion exists) ── */}
            {!submittedPostulacion && (
              <div className="responsive-hero" style={{
                background: 'linear-gradient(135deg, #00AC99 0%, #007B8A 100%)',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'stretch',
                minHeight: '220px',
                boxShadow: '0 6px 20px rgba(0, 172, 153, 0.20)',
                position: 'relative',
              }}>

                {/* Decorative circles */}
                <div style={{
                  position: 'absolute', top: '-50px', left: '-50px',
                  width: '180px', height: '180px', borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute', bottom: '-40px', left: '280px',
                  width: '200px', height: '200px', borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  pointerEvents: 'none',
                }} />

                {/* ── LEFT: Text content ── */}
                <div style={{
                  flex: 1,
                  padding: '28px 36px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}>

                  {/* Title */}
                  <h2 style={{
                    fontSize: '22px', fontWeight: 800, color: '#fff',
                    margin: '0 0 8px 0', lineHeight: 1.2,
                  }}>
                    Registro de Postulantes a Prestadores
                  </h2>

                  {/* Subtitle */}
                  <p style={{
                    fontSize: '14px', color: 'rgba(255,255,255,0.92)',
                    lineHeight: 1.5, margin: '0 0 16px 0', maxWidth: '540px',
                    fontWeight: 500,
                  }}>
                    Ahora podés postularte como prestador/a de Apross a través de un formulario online.
                  </p>

                  {/* Disclaimer */}
                  <div style={{
                    backgroundColor: 'rgba(0,0,0,0.18)',
                    borderLeft: '3px solid rgba(255,255,255,0.5)',
                    borderRadius: '0 6px 6px 0',
                    padding: '10px 14px',
                    marginBottom: '20px',
                    maxWidth: '560px',
                  }}>
                    <p style={{
                      fontSize: '12px', color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.5, margin: 0,
                    }}>
                      <strong style={{ color: 'rgba(255,255,255,0.95)' }}>Importante:</strong>{' '}
                      La aplicación mediante este formulario no implica la incorporación del prestador,
                      el cual deberá cumplimentar con los datos solicitados y aguardar la evaluación.
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div>
                    <button
                      onClick={onStart}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        backgroundColor: '#fff', color: '#007B8A',
                        border: 'none', borderRadius: '8px',
                        padding: '10px 24px', fontSize: '14px', fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'
                          ; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 16px rgba(0,0,0,0.20)'
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
                          ; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 10px rgba(0,0,0,0.15)'
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                      Iniciar postulación
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* ── STATUS REVIEW BANNER (Only when submittedPostulacion exists) ── */}
            {submittedPostulacion && (
              <div style={{
                marginTop: '10px',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1.2fr)',
                gap: '24px',
                marginBottom: '24px',
                alignItems: 'start',
              }}>

                {/* Main Card */}
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB',
                  padding: '28px 32px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '1px solid #F3F4F6', paddingBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '44px', height: '44px', borderRadius: '50%',
                        backgroundColor: submittedPostulacion.estado === 'Aceptado' ? '#D1FAE5' : '#FEF3C7', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        color: submittedPostulacion.estado === 'Aceptado' ? '#10B981' : '#D97706',
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          {submittedPostulacion.estado === 'Aceptado' ? (
                            <>
                              <path d="M20 6L9 17l-5-5" />
                            </>
                          ) : (
                            <>
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="8" x2="12" y2="12" />
                              <line x1="12" y1="16" x2="12.01" y2="16" />
                            </>
                          )}
                        </svg>
                      </div>
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1F2937', margin: '0 0 4px 0' }}>
                          Tu postulación está {submittedPostulacion.estado.toLowerCase()}
                        </h3>
                        <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>
                          {submittedPostulacion.estado === 'Aceptado'
                            ? (submittedPostulacion.profesion === 'Bioquímico' || submittedPostulacion.profesion === 'Bioquimico')
                              ? 'Felicidades, tu trámite continuará mediante validación de tu Colegio.'
                              : 'Felicidades, puedes continuar con la inscripción.'
                            : 'Nuestro equipo está evaluando tus datos iniciales.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1F2937', margin: 0 }}>
                      Nº de Expediente: 012345
                    </h4>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    backgroundColor: '#F9FAFB',
                    padding: '20px 24px',
                    borderRadius: '12px',
                    border: '1px solid #F3F4F6',
                    position: 'relative',
                    marginBottom: '16px'
                  }}>
                    {/* Row 1: Name */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', paddingRight: '140px' }}>
                      <span style={{ fontSize: '15px', color: '#374151', fontWeight: 600 }}>
                        {submittedPostulacion.represented || 'Camila Gonzales'}
                      </span>
                    </div>

                    {/* Row 2: CUIT/CUIL */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '14px', color: '#6B7280' }}>
                        CUIT/CUIL: <strong style={{ color: '#1F2937' }}>{submittedPostulacion.cuit || '27-457475-9'}</strong>
                      </span>
                    </div>

                    {/* Row 3: Categoria */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '14px', color: '#6B7280' }}>
                        Categoría: <strong style={{ color: '#1F2937' }}>{submittedPostulacion.categoria}</strong>
                      </span>
                    </div>

                    {/* Extra Rows depending on Category */}
                    {isProfessional && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '14px', color: '#6B7280' }}>
                          Profesión/Tipo: <strong style={{ color: '#1F2937' }}>{submittedPostulacion.profesion || 'Medico'}</strong>
                        </span>
                      </div>
                    )}

                    {isInstitution && (
                      <>
                        {submittedPostulacion.nivelAtencion && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '14px', color: '#6B7280' }}>
                              Clasificación: <strong style={{ color: '#1F2937' }}>{submittedPostulacion.nivelAtencion}</strong>
                            </span>
                          </div>
                        )}
                        {submittedPostulacion.tipoInstitucionNivel && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginLeft: '4px' }}>
                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#D1D5DB' }} />
                            <span style={{ fontSize: '14px', color: '#6B7280' }}>
                              Tipo: <strong style={{ color: '#1F2937' }}>{submittedPostulacion.tipoInstitucionNivel}</strong>
                            </span>
                          </div>
                        )}
                      </>
                    )}

                    {isDisability && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '14px', color: '#6B7280' }}>
                          Tipo: <strong style={{ color: '#1F2937' }}>{submittedPostulacion.tipoInstitucion || 'Centro de Rehabilitación'}</strong>
                        </span>
                      </div>
                    )}

                    {/* Status pill on the top right */}
                    <div style={{
                      position: 'absolute',
                      right: '24px',
                      top: '20px',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: submittedPostulacion.estado === 'Aceptado' ? '#D1FAE5' : '#FFFBEB',
                        border: `1px solid ${submittedPostulacion.estado === 'Aceptado' ? '#A7F3D0' : '#FDE68A'}`,
                        borderRadius: '24px',
                        padding: '6px 14px',
                      }}>
                        <span style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: submittedPostulacion.estado === 'Aceptado' ? '#10B981' : '#F59E0B',
                          boxShadow: `0 0 0 2px ${submittedPostulacion.estado === 'Aceptado' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`
                        }} />
                        <span style={{ fontSize: '12px', fontWeight: 700, color: submittedPostulacion.estado === 'Aceptado' ? '#065F46' : '#B45309', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {submittedPostulacion.estado}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button Below Grey Card */}
                  {submittedPostulacion.estado === 'Aceptado' && onStartInscripcion && !(submittedPostulacion.profesion === 'Bioquímico' || submittedPostulacion.profesion === 'Bioquimico') && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        onClick={onStartInscripcion}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 20px',
                          backgroundColor: '#00AC99',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '14px',
                          borderRadius: '8px',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(0, 172, 153, 0.25)',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.backgroundColor = '#009584'
                          e.currentTarget.style.transform = 'translateY(-1px)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.backgroundColor = '#00AC99'
                          e.currentTarget.style.transform = 'translateY(0)'
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        Iniciar inscripción
                      </button>
                    </div>
                  )}
                </div>

                {/* Side Info Card */}
                {(submittedPostulacion.profesion === 'Bioquímico' || submittedPostulacion.profesion === 'Bioquimico') ? (
                  <div style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                  }}>
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
                  <div style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284C7' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                      </div>
                      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Próximos Pasos</h4>
                    </div>

                    <p style={{ margin: 0, fontSize: '13.5px', color: '#475569', lineHeight: 1.5 }}>
                      Una vez que tu postulación sea aprobada, deberás completar la etapa de inscripción. Ten a mano la siguiente información:
                    </p>

                    <ul style={{
                      margin: 0,
                      paddingLeft: '0',
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}>
                      <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><polyline points="20 6 9 17 4 12" /></svg>
                        <span style={{ fontSize: '13px', color: '#334155', lineHeight: 1.4 }}>
                          <strong style={{ color: '#0F172A' }}>Datos Fiscales:</strong> CUIT, Condición de AFIP e Ingresos Brutos.
                        </span>
                      </li>
                      <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><polyline points="20 6 9 17 4 12" /></svg>
                        <span style={{ fontSize: '13px', color: '#334155', lineHeight: 1.4 }}>
                          <strong style={{ color: '#0F172A' }}>Seguros y Habilitaciones:</strong> Póliza de mala praxis y certificado de habilitación correspondiente.
                        </span>
                      </li>
                      <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><polyline points="20 6 9 17 4 12" /></svg>
                        <span style={{ fontSize: '13px', color: '#334155', lineHeight: 1.4 }}>
                          <strong style={{ color: '#0F172A' }}>Documentación Legal:</strong> Archivos y permisos vigentes según tu categoría.
                        </span>
                      </li>
                      <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><polyline points="20 6 9 17 4 12" /></svg>
                        <span style={{ fontSize: '13px', color: '#334155', lineHeight: 1.4 }}>
                          <strong style={{ color: '#0F172A' }}>Datos Bancarios:</strong> CBU para la gestión de pagos.
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}


          </div>
        </main>
      </div>
    </div>
  )
}
