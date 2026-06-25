import Header from '../components/Header'
import Sidebar2 from '../components/Sidebar'

interface LandingPostulanteProps {
  onStart: () => void
  submittedList?: Array<{
    cuit?: string
    represented?: string
    categoria: string
    profesion?: string
    nivelAtencion?: string
    tipoInstitucionNivel?: string
    tipoInstitucion?: string
    estado: string
  }>
}

export default function LandingPostulante({ onStart, submittedList = [] }: LandingPostulanteProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f4f4f4' }}>
      <Header />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar2 />

        <main style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
          <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto' }}>



            {/* Title Row */}
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 400, color: '#333', margin: 0, fontFamily: 'Arial, sans-serif' }}>
                Portal de Prestadores - Home
              </h1>
              <span style={{ fontSize: '15px', color: '#6B7280', fontWeight: 400 }}>
                Bienvenido al Nuevo Sistema de Autogestión de Prestadores
              </span>
            </div>

            {/* ── HERO BANNER (THINNER) ── */}
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

            {/* ── STATUS REVIEW BANNER (Only when submittedList has items) ── */}
            {submittedList.length > 0 && (
              <div style={{
                marginTop: '50px',
                backgroundColor: '#fff',
                borderRadius: '16px',
                border: '1px solid #E5E7EB',
                padding: '24px 32px',
                marginBottom: '24px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px', borderBottom: '1px solid #F3F4F6', paddingBottom: '12px' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    backgroundColor: '#FEF3C7', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    color: '#D97706',
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1F2937', margin: 0 }}>
                    Tus postulaciones en revisión ({submittedList.length})
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {submittedList.map((info, idx) => {
                    const isProfessional = info.categoria === 'Profesional de la salud'
                    const isInstitution = info.categoria === 'Institución'
                    const isDisability = info.categoria === 'Prestador de discapacidad'
                    
                    return (
                      <div key={idx} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        backgroundColor: '#F9FAFB',
                        padding: '16px 20px',
                        borderRadius: '8px',
                        border: '1px solid #F3F4F6',
                        position: 'relative'
                      }}>
                        {/* Upper row: CUIT/CUIL and Represented name */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', paddingRight: '120px' }}>
                          <span style={{ fontSize: '12px', color: '#6B7280' }}>
                            CUIT/CUIL: <strong style={{ color: '#4B5563' }}>{info.cuit || '27-457475-9'}</strong>
                          </span>
                          <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#D1D5DB' }} />
                          <span style={{ fontSize: '12.5px', color: '#374151', fontWeight: 600 }}>
                            {info.represented || 'Camila Gonzales'}
                          </span>
                        </div>

                        {/* Lower row: Category and details */}
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', paddingRight: '120px' }}>
                          <span style={{ fontSize: '13px', color: '#4B5563' }}>
                            Categoría: <strong style={{ color: '#1F2937' }}>{info.categoria}</strong>
                          </span>
                          
                          {isProfessional && (
                            <>
                              <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#D1D5DB' }} />
                              <span style={{ fontSize: '13px', color: '#4B5563' }}>
                                Profesión/Tipo: <strong style={{ color: '#1F2937' }}>{info.profesion || 'Medico'}</strong>
                              </span>
                            </>
                          )}

                          {isInstitution && (
                            <>
                              {info.nivelAtencion && (
                                <>
                                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#D1D5DB' }} />
                                  <span style={{ fontSize: '13px', color: '#4B5563' }}>
                                    Clasificación: <strong style={{ color: '#1F2937' }}>{info.nivelAtencion}</strong>
                                  </span>
                                </>
                              )}
                              {info.tipoInstitucionNivel && (
                                <>
                                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#D1D5DB' }} />
                                  <span style={{ fontSize: '13px', color: '#4B5563' }}>
                                    Tipo: <strong style={{ color: '#1F2937' }}>{info.tipoInstitucionNivel}</strong>
                                  </span>
                                </>
                              )}
                            </>
                          )}

                          {isDisability && (
                            <>
                              <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#D1D5DB' }} />
                              <span style={{ fontSize: '13px', color: '#4B5563' }}>
                                Tipo: <strong style={{ color: '#1F2937' }}>{info.tipoInstitucion || 'Centro de Rehabilitación'}</strong>
                              </span>
                            </>
                          )}
                        </div>

                        {/* Status pill on the absolute top-right / right */}
                        <div style={{
                          position: 'absolute',
                          right: '20px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: '#FFFBEB',
                          border: '1px solid #FDE68A',
                          borderRadius: '20px',
                          padding: '4px 12px',
                        }}>
                          <span style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: '#F59E0B',
                          }} />
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                            {info.estado}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}


          </div>
        </main>
      </div>
    </div>
  )
}
