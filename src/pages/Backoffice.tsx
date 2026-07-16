import { useState } from 'react'
import { ChevronDownIcon } from '../components/Icons'

interface BackofficeProps {
  submittedPostulaciones?: Array<{
    cuit?: string
    represented?: string
    categoria?: string
    profesion?: string
    especialidades?: string[]
    nivelAtencion?: string
    tipoInstitucionNivel?: string
    tipoInstitucion?: string
    estado?: string
  }>
}

function BackofficeHeader() {
  return (
    <header style={{
      height: '60px', backgroundColor: '#fff', borderBottom: '1px solid #e8e8e8',
      display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0,
      gap: '10px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img src="/Group 781.png" alt="Equipo Apross" style={{ height: '32px', objectFit: 'contain' }} />
      </div>
    </header>
  )
}

function AdminSidebarTools({ AREAS, currentAdminView, setCurrentAdminView, setView }: any) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: `translate(-50%, ${isOpen ? '0' : '-100%'})`,
        backgroundColor: '#262F3D', // Color of the image
        width: 'max-content',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 9999,
        padding: '16px 24px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '16px'
      }}
    >
      {/* Toggler tab */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'absolute',
          bottom: '-16px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '64px',
          height: '16px',
          backgroundColor: '#262F3D',
          borderBottomLeftRadius: '6px',
          borderBottomRightRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ width: '24px', height: '4px', backgroundColor: '#4B5563', borderRadius: '2px' }} />
      </div>

      <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        ADMIN TOOLS
      </p>

      <div style={{ display: 'flex', gap: '8px' }}>
        {AREAS.map((area: string, idx: number) => (
          <button 
            key={area}
            onClick={() => { setCurrentAdminView(idx); setView('list'); }}
            style={{ 
              padding: '8px 12px', borderRadius: '4px', border: '1px solid',
              borderColor: currentAdminView === idx ? '#00AC99' : '#374151', 
              backgroundColor: currentAdminView === idx ? '#00AC99' : '#374151', 
              color: '#fff', cursor: 'pointer', fontSize: '12px',
              fontWeight: currentAdminView === idx ? 600 : 500,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}>
            Simular {area}
          </button>
        ))}
      </div>
    </div>
  )
}

function BackofficeSidebar() {
  const menuItems = [
    'Usuarios',
    'Prestadores',
    'Comunicaciones',
    'Tramites Web',
    'Credencial Digital'
  ]
  return (
    <aside style={{ width: '220px', minWidth: '220px', backgroundColor: '#fff', borderRight: '1px solid #e8e8e8', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '24px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', backgroundColor: '#D1D5DB', borderRadius: '4px' }}></div>
        <span style={{ fontSize: '13px', color: '#374151', fontWeight: 600 }}>Gonzales, Camila</span>
      </div>
      <div style={{ height: '1px', backgroundColor: '#F3F4F6', margin: '0 16px 16px 16px' }} />
      <nav style={{ padding: '0 8px' }}>
        <p style={{ fontSize: '10px', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.08em', padding: '0 8px 8px 8px', margin: 0 }}>MENÚ</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {menuItems.map(item => (
            <button key={item} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 12px', fontSize: '13.5px', fontWeight: 600, color: '#374151',
              backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '6px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                {item}
              </div>
              <ChevronDownIcon />
            </button>
          ))}
        </div>
      </nav>
    </aside>
  )
}

const AREAS = ['Convenios', 'Investigación y desarrollo', 'Prestaciones Médicas', 'Despacho', 'Administrativa', 'Tesorería']

const AREA_TASKS = [
  ['Validar datos personales y de contacto', 'Validar especialidad declarada'],
  ['Validar constancia de DNI', 'Validar constancia de inscripcion vigente'],
  ['Validar número de matrícula', 'Validar constancia de matrícula'],
  ['Validar Constancia de CUIT/AFIP', 'Validar Constancia de IIBB'],
  ['Validar Póliza de Seguros', 'Validar Seguro de Mala Praxis'],
  ['Validar certificado de CBU', 'Validar titularidad de cuenta']
]

export default function Backoffice({ submittedPostulaciones = [] }: BackofficeProps) {
  const submittedPostulacion = submittedPostulaciones[0] || null
  const [view, setView] = useState<'list' | 'ficha'>('list')
  const [activeTab, setActiveTab] = useState('Datos del perfil')

  // Simulador Admin
  const [applicantStage, setApplicantStage] = useState(1) // Inicia en Investigación y desarrollo (índice 1)
  const [currentAdminView, setCurrentAdminView] = useState(1) // Inicia viendo Investigación y desarrollo

  const isAprobadoFinal = applicantStage > currentAdminView
  const isVisible = currentAdminView <= applicantStage

  const [valDni, setValDni] = useState<'default' | 'rechazado' | 'aprobado'>('default')
  const [valInsc, setValInsc] = useState<'default' | 'rechazado' | 'aprobado'>('default')
  const [dniReason, setDniReason] = useState('')
  const [inscReason, setInscReason] = useState('')
  const [docCargado, setDocCargado] = useState(false)

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showAprobarModal, setShowAprobarModal] = useState(false)
  const [isRechazadoFinal, setIsRechazadoFinal] = useState(false)
  const [isRowChecked, setIsRowChecked] = useState(false)

  const canInteract = currentAdminView === applicantStage && !isRechazadoFinal
  const canRechazar = valDni === 'rechazado' || valInsc === 'rechazado'
  const canAprobar = (valDni === 'aprobado' || valInsc === 'aprobado') && !canRechazar && !isAprobadoFinal

  if (view === 'ficha') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F3F4F6', fontFamily: 'Inter, sans-serif' }}>
        <BackofficeHeader />
        <AdminSidebarTools AREAS={AREAS} currentAdminView={currentAdminView} setCurrentAdminView={setCurrentAdminView} setView={setView} />
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <BackofficeSidebar />
          <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto', backgroundColor: '#ffffff' }}>

            {/* Header Ficha */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <button onClick={() => setView('list')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#fff', cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#1F2937', margin: 0 }}>Revisión de postulante</h1>
            </div>

            {/* Stepper Areas */}
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '24px 32px 0 32px', marginBottom: '32px', width: '100%', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative' }}>
                {/* Linea gris de base */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', backgroundColor: '#E5E7EB' }}></div>

                {AREAS.map((area, idx) => {
                  const isPast = idx < applicantStage
                  const isCurrent = idx === currentAdminView

                  return (
                    <div key={area} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', paddingBottom: '12px', position: 'relative', flex: 1 }}>
                      {isPast || (isCurrent && isAprobadoFinal) ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#00AC99" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10" stroke="none" /><path d="m9 12 2 2 4-4" /></svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><circle cx="12" cy="12" r="10" /></svg>
                      )}
                      
                      <span style={{ fontSize: '11px', fontWeight: 600, color: isCurrent ? '#00AC99' : '#374151' }}>{area}</span>
                      
                      {isCurrent && (
                        <div style={{ position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '2px', backgroundColor: '#00AC99', zIndex: 1 }}></div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '24px' }}>

              {/* Main Content (Left) */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#F6F6F6', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '24px' }}>

                <div style={{ padding: '0 0 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#6B7280', fontWeight: 500 }}>Ficha de expediente</p>
                    <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#1F2937' }}>Profesional {submittedPostulacion?.represented || 'Gonzales, Camila'}</h2>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#fff', color: '#374151', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                      Ver Ficha de Expediente
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', borderBottom: '1px solid #D1D5DB', marginBottom: '24px', gap: '8px', overflowX: 'auto' }}>
                  {['Datos del perfil', 'Lugar de Atención', 'Datos Fiscales', 'Seguros', 'Documentación Legal', 'CBU'].map(tab => (
                    <div key={tab} onClick={() => setActiveTab(tab)} style={{
                      padding: '12px 16px',
                      fontSize: '13px',
                      fontWeight: activeTab === tab ? 600 : 500,
                      color: activeTab === tab ? '#00AC99' : '#6B7280',
                      borderBottom: activeTab === tab ? '3px solid #00AC99' : '3px solid transparent',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}>
                      {tab}
                    </div>
                  ))}
                </div>

                {/* Form Card */}
                <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '32px' }}>

                  {activeTab === 'Lugar de Atención' && (
                    <>
                      <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: 700, color: '#1F2937' }}>Lugar de atención</h3>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E6F6F4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00AC99' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                        </div>
                        <span style={{ fontSize: '18px', fontWeight: 700, color: '#1F2937' }}>Sanatorio Allende - Cerro de las rosas</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Nombre Fantasía <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#374151', boxSizing: 'border-box' }}>
                            Sanatorio Allende - Cerro de las rosas
                          </div>
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Tiene Servicio de Guardia</label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 0' }}>
                            <input type="checkbox" checked readOnly style={{ width: '16px', height: '16px' }} />
                            <span style={{ fontSize: '13.5px', color: '#374151' }}>Si</span>
                          </div>
                        </div>
                      </div>

                      <h4 style={{ margin: '0 0 16px 0', fontSize: '13px', fontWeight: 700, color: '#374151', textTransform: 'uppercase' }}>DIRECCION</h4>

                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Calle <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13px', color: '#374151' }}>Los tordos</div>
                        </div>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Nº (puerta) <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13px', color: '#374151' }}>231</div>
                        </div>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Apartamento</label>
                          <div style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13px', color: '#374151' }}>N/A</div>
                        </div>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Código Postal <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13px', color: '#374151' }}>5111</div>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Barrio</label>
                          <div style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13px', color: '#374151' }}>Flores</div>
                        </div>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Localidad</label>
                          <div style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13px', color: '#374151' }}>Cordoba Capital</div>
                        </div>
                      </div>

                      <div style={{ marginBottom: '32px' }}>
                        <label style={{ fontSize: '11px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Otros Datos</label>
                        <div style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13px', color: '#374151' }}>N/A</div>
                      </div>

                      <h4 style={{ margin: '0 0 16px 0', fontSize: '13px', fontWeight: 700, color: '#374151', textTransform: 'uppercase' }}>CONTACTO</h4>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Teléfono para turnos</label>
                          <div style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13px', color: '#374151' }}>351-13222432</div>
                        </div>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Teléfono para emergencias</label>
                          <div style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13px', color: '#374151' }}>3541-123432</div>
                        </div>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Dirección de email (Institucional)</label>
                          <div style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13px', color: '#374151' }}>consultas@hospital.com</div>
                        </div>
                      </div>

                      <h4 style={{ margin: '0 0 16px 0', fontSize: '13px', fontWeight: 700, color: '#374151', textTransform: 'uppercase' }}>HORARIOS DE ATENCION</h4>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Dias de la semana</label>
                          <div style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13px', color: '#374151' }}>Lunes</div>
                        </div>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Hora de inicio</label>
                          <div style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13px', color: '#374151' }}>08:00hs</div>
                        </div>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Hora de fin</label>
                          <div style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13px', color: '#374151' }}>18:00hs</div>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'Datos del perfil' && (
                    <>
                      <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: 700, color: '#1F2937' }}>Datos del perfil</h3>

                      <h4 style={{ margin: '0 0 16px 0', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>MATRICULA</h4>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Tipo profesion <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#374151', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            Acompañante terapéutico
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                          </div>
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Ámbito de la Matrícula <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#374151', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            Nacional
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '16px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Número de Matrícula Profesional o Registro Provincial <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#374151', boxSizing: 'border-box' }}>
                            222311
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Constancia de Matrícula</label>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                              <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: '12px', color: '#0066CC', textDecoration: 'underline', fontWeight: 500, fontFamily: 'inherit' }}>constancia_de_matricula_firmada.pdf</a>
                            </div>
                            <button style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #00AC99', backgroundColor: '#E6F6F4', fontSize: '12px', color: '#00AC99', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: 600 }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                              Ver Archivo
                            </button>
                          </div>
                        </div>
                      </div>


                    </>
                  )}

                  {activeTab === 'Datos Fiscales' && (
                    <>
                      <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: 700, color: '#1F2937' }}>Datos fiscales</h3>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '16px', columnGap: '28px', marginBottom: '24px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <div>
                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>Nombre / Razón Social <span style={{ color: '#EF4444' }}>*</span></label>
                            <div style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #E5E7EB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#9CA3AF', boxSizing: 'border-box' }}>Gonzales, Camila</div>
                          </div>
                          <div>
                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>CUIT <span style={{ color: '#EF4444' }}>*</span></label>
                            <div style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #E5E7EB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#9CA3AF', boxSizing: 'border-box' }}>27-12345678-9</div>
                          </div>
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>Inicio de Actividades <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#374151', boxSizing: 'border-box' }}>2018-03-15</div>
                        </div>

                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>Responsabilidad Fiscal <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#374151', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            Monotributista
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                              <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: '12px', color: '#0066CC', textDecoration: 'underline', fontWeight: 500, fontFamily: 'inherit' }}>constancia_inscripcion_arca.pdf</a>
                            </div>
                            <button style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #00AC99', backgroundColor: '#E6F6F4', fontSize: '12px', color: '#00AC99', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: 600 }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                              Ver Archivo
                            </button>
                          </div>
                        </div>

                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>Nº Ingresos Brutos <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#374151', boxSizing: 'border-box' }}>34992123</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                              <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: '12px', color: '#0066CC', textDecoration: 'underline', fontWeight: 500, fontFamily: 'inherit' }}>constancia_de_ingresos_brutos_iibb.pdf</a>
                            </div>
                            <button style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #00AC99', backgroundColor: '#E6F6F4', fontSize: '12px', color: '#00AC99', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: 600 }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                              Ver Archivo
                            </button>
                          </div>
                        </div>

                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '8px' }}>Poseo extension IIBB</label>
                          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', height: '36px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', userSelect: 'none' }}>
                              <div style={{ width: '16px', height: '16px', borderRadius: '3px', border: '2px solid #bbb', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
                              <span style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>Sí</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', userSelect: 'none' }}>
                              <div style={{ width: '16px', height: '16px', borderRadius: '3px', border: '2px solid #00AC99', backgroundColor: '#00AC99', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                              </div>
                              <span style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>No</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                          <div style={{ minHeight: '38px' }} />
                        </div>

                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>Teléfono Administrativo <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#374151', boxSizing: 'border-box' }}>3513222333</div>
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>E-Mail Administrativo <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#374151', boxSizing: 'border-box' }}>administracion@ejemplo.com</div>
                        </div>
                      </div>

                      <hr style={{ border: 'none', borderTop: '1px solid #ebebeb', marginBottom: '24px' }} />

                      <h4 style={{ margin: '0 0 16px 0', fontSize: '13px', fontWeight: 700, color: '#374151', textTransform: 'uppercase' }}>Domicilio Fiscal</h4>

                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 500, color: '#666', display: 'block', marginBottom: '5px' }}>Calle <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#1F2937', boxSizing: 'border-box' }}>Rivadavia</div>
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 500, color: '#666', display: 'block', marginBottom: '5px' }}>Nº (puerta) <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#1F2937', boxSizing: 'border-box' }}>1500</div>
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 500, color: '#666', display: 'block', marginBottom: '5px' }}>Apartamento</label>
                          <div style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#1F2937', boxSizing: 'border-box' }}>N/A</div>
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 500, color: '#666', display: 'block', marginBottom: '5px' }}>Código Postal <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#1F2937', boxSizing: 'border-box' }}>5000</div>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 500, color: '#666', display: 'block', marginBottom: '5px' }}>Barrio</label>
                          <div style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#1F2937', boxSizing: 'border-box' }}>Centro</div>
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 500, color: '#666', display: 'block', marginBottom: '5px' }}>Localidad</label>
                          <div style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#1F2937', boxSizing: 'border-box' }}>Córdoba Capital</div>
                        </div>
                      </div>

                      <div style={{ marginBottom: '24px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 500, color: '#666', display: 'block', marginBottom: '5px' }}>Otros Datos</label>
                        <div style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#1F2937', boxSizing: 'border-box' }}>N/A</div>
                      </div>
                    </>
                  )}

                  {activeTab === 'Seguros' && (
                    <>
                      <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: 700, color: '#1F2937' }}>Seguros <span style={{ color: '#EF4444' }}>*</span></h3>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '16px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>Razón Social de la Aseguradora <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#374151', boxSizing: 'border-box' }}>Sancor Seguros</div>
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>CUIT de la Aseguradora <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#374151', boxSizing: 'border-box' }}>30-50000000-1</div>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>Vencimiento de la Póliza <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#374151', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            31/12/2027
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                          </div>
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>Nº Póliza <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#374151', boxSizing: 'border-box' }}>POL-123456</div>
                        </div>
                      </div>

                      <div style={{ marginBottom: '32px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>Póliza de Seguro de Responsabilidad Civil Profesional</label>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                            <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: '12px', color: '#0066CC', textDecoration: 'underline', fontWeight: 500, fontFamily: 'inherit' }}>poliza_de_seguro_de_responsabilidad_civil_profesional_firmado.pdf</a>
                          </div>
                          <button style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #00AC99', backgroundColor: '#E6F6F4', fontSize: '12px', color: '#00AC99', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: 600 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            Ver Archivo
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'Documentación Legal' && (
                    <>
                      <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: 700, color: '#1F2937' }}>Documentación legal</h3>

                      <h4 style={{ margin: '0 0 16px 0', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>EXPERIENCIA PROFESIONAL</h4>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                        <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid #E5E7EB', backgroundColor: '#F9FAFB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <h5 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 600, color: '#1F2937' }}>Médico Clínico de Guardia</h5>
                            <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>
                              Establecimiento: Colegio San Antonio | CUIT: 30-12343212 | Período: 26/11/2010 - 26/11/2025
                            </p>
                          </div>
                          {/* En modo revisión no mostramos botones de acción según tu solicitud */}
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'CBU' && (
                    <>
                      <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: 700, color: '#1F2937' }}>Datos Bancarios (CBU)</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Titular de la cuenta <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#374151', boxSizing: 'border-box' }}>Gonzales, Camila</div>
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Nombre del banco <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#374151', boxSizing: 'border-box' }}>Banco de la Provincia de Córdoba</div>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>CBU <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#374151', boxSizing: 'border-box' }}>0200000000000000000000</div>
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Alias <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#374151', boxSizing: 'border-box' }}>CAMILA.BANCOR</div>
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Moneda <span style={{ color: '#EF4444' }}>*</span></label>
                          <div style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', fontSize: '13.5px', color: '#374151', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            ARS
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                          </div>
                        </div>
                      </div>
                      <div style={{ marginBottom: '32px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>Constancia de CBU</label>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                            <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: '12px', color: '#0066CC', textDecoration: 'underline', fontWeight: 500, fontFamily: 'inherit' }}>constancia_de_cbu_firmada.pdf</a>
                          </div>
                          <button style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #00AC99', backgroundColor: '#E6F6F4', fontSize: '12px', color: '#00AC99', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: 600 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            Ver Archivo
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                </div>
              </div>

              {/* Side Panels (Right) */}
              <div style={{ width: '380px', display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '24px', maxHeight: 'calc(100vh - 120px)', alignSelf: 'flex-start' }}>

                {/* Acciones Área Panel */}
                {isRechazadoFinal ? (
                  <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '24px' }}>
                      <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#6B7280', fontWeight: 500 }}>Acciones área</p>
                      <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: 700, color: '#1F2937' }}>Investigación y desarrollo</h3>

                      <div>
                        <h4 style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: 700, color: '#1F2937', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Motivo de rechazo:</h4>
                        <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#4B5563', lineHeight: '1.5' }}>
                          Las siguientes observaciones no se encuentran en el estado esperado.
                        </p>
                        <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '13px', color: '#4B5563', lineHeight: '1.6' }}>
                          {valDni === 'rechazado' && <li>Validar constancia de DNI {dniReason ? `- ${dniReason}` : ''}</li>}
                          {valInsc === 'rechazado' && <li>Validar constancia de inscripcion vigente {inscReason ? `- ${inscReason}` : ''}</li>}
                        </ul>
                      </div>
                    </div>

                    <div style={{ padding: '24px', borderTop: '1px solid #E5E7EB', backgroundColor: '#fff', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
                      <button onClick={() => setIsRechazadoFinal(false)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#fff', color: '#374151', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                        Solicitar Revisión de Rechazo
                      </button>
                    </div>
                  </div>
                ) : isAprobadoFinal ? (
                  <div style={{ backgroundColor: '#EAF8F5', borderRadius: '12px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '24px' }}>
                      <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#6B7280', fontWeight: 500 }}>Acciones área</p>
                      <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: 700, color: '#1F2937' }}>{AREAS[currentAdminView]}</h3>

                      <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#1F2937', fontWeight: 600, lineHeight: '1.5' }}>
                        Ficha de expediente de Profesional Gonzales, Camila fué Aprobada.
                      </p>

                      <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#4B5563', lineHeight: '1.5' }}>
                        Las siguientes observaciones se encuentran aprobadas.
                      </p>
                      <ul style={{ margin: '0 0 24px 0', paddingLeft: '20px', fontSize: '13px', color: '#4B5563', lineHeight: '1.6' }}>
                        <li>{AREA_TASKS[currentAdminView][0]} - Aprobado</li>
                        <li>{AREA_TASKS[currentAdminView][1]} - Aprobado</li>
                      </ul>

                      <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#374151', fontWeight: 500 }}>
                        Documento de Tabla de revisión y observaciones:
                      </p>
                      <button style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#fff', color: '#374151', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                        Ver Documento
                      </button>
                    </div>

                    <div style={{ padding: '24px', borderTop: '1px solid #E5E7EB', backgroundColor: '#fff', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
                      <button onClick={() => setApplicantStage(currentAdminView)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#fff', color: '#374151', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                        Solicitar Revisión de Aprobación
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                    <div style={{ padding: '24px 24px 0 24px', flexShrink: 0 }}>
                      <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#6B7280', fontWeight: 500 }}>Acciones área</p>
                      <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: 700, color: '#1F2937' }}>{AREAS[currentAdminView]}</h3>
                      <div style={{ height: '1px', backgroundColor: '#E5E7EB', marginBottom: '24px' }}></div>
                    </div>

                    <div style={{ padding: '0 24px 24px 24px', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto', flex: 1 }}>

                      {/* Cargar Documento de Tabla */}
                      <div>
                        <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#374151', fontWeight: 500 }}>{AREA_TASKS[currentAdminView][0]}</p>
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                          <button
                            onClick={() => setValDni(valDni === 'rechazado' ? 'default' : 'rechazado')}
                            style={{
                              flex: 1, padding: '8px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer',
                              backgroundColor: valDni === 'rechazado' ? '#FF3300' : 'transparent',
                              color: valDni === 'rechazado' ? '#fff' : '#FF3300',
                              border: `1px solid #FF3300`
                            }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>
                            Rechazado
                          </button>
                          <button
                            onClick={() => setValDni(valDni === 'aprobado' ? 'default' : 'aprobado')}
                            style={{
                              flex: 1, padding: '8px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer',
                              backgroundColor: valDni === 'aprobado' ? '#00AC99' : 'transparent',
                              color: valDni === 'aprobado' ? '#fff' : '#00AC99',
                              border: `1px solid #00AC99`
                            }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                            Aprobado
                          </button>
                        </div>
                        {valDni === 'rechazado' && (
                          <div style={{ position: 'relative' }}>
                            <select
                              value={dniReason}
                              onChange={(e) => setDniReason(e.target.value)}
                              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#fff', fontSize: '13px', color: '#374151', appearance: 'none', outline: 'none' }}
                            >
                              <option value="">Seleccionar motivo</option>
                              <option value="Ilegible">Ilegible</option>
                              <option value="Vencido">Vencido</option>
                            </select>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><path d="m6 9 6 6 6-6" /></svg>
                          </div>
                        )}
                      </div>

                      {/* Validar constancia de inscripcion vigente */}
                      <div>
                        <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#374151', fontWeight: 500 }}>{AREA_TASKS[currentAdminView][1]}</p>
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                          <button
                            onClick={() => setValInsc(valInsc === 'rechazado' ? 'default' : 'rechazado')}
                            style={{
                              flex: 1, padding: '8px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer',
                              backgroundColor: valInsc === 'rechazado' ? '#FF3300' : 'transparent',
                              color: valInsc === 'rechazado' ? '#fff' : '#FF3300',
                              border: `1px solid #FF3300`
                            }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>
                            Rechazado
                          </button>
                          <button
                            onClick={() => setValInsc(valInsc === 'aprobado' ? 'default' : 'aprobado')}
                            style={{
                              flex: 1, padding: '8px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer',
                              backgroundColor: valInsc === 'aprobado' ? '#00AC99' : 'transparent',
                              color: valInsc === 'aprobado' ? '#fff' : '#00AC99',
                              border: `1px solid #00AC99`
                            }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                            Aprobado
                          </button>
                        </div>
                        {valInsc === 'rechazado' && (
                          <div style={{ position: 'relative' }}>
                            <select
                              value={inscReason}
                              onChange={(e) => setInscReason(e.target.value)}
                              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#fff', fontSize: '13px', color: '#374151', appearance: 'none', outline: 'none' }}
                            >
                              <option value="">Seleccionar motivo</option>
                              <option value="Vencido">Vencido</option>
                              <option value="Ilegible">Ilegible</option>
                            </select>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><path d="m6 9 6 6 6-6" /></svg>
                          </div>
                        )}
                      </div>

                      {/* Cargar Documento de Tabla */}
                      <div>
                        <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#374151', fontWeight: 500 }}>Cargar Documento de Tabla de revisión y observaciones</p>
                        {docCargado ? (
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <button style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #00AC99', backgroundColor: '#fff', fontSize: '13px', color: '#00AC99', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 500, cursor: 'pointer' }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                              Documentación cargada
                            </button>
                            <button onClick={() => setDocCargado(false)} style={{ width: '40px', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => setDocCargado(true)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#fff', fontSize: '13px', color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', fontWeight: 500 }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                            Adjuntar
                          </button>
                        )}
                      </div>

                      <div style={{ height: '1px', backgroundColor: '#E5E7EB' }}></div>

                      {/* MOTIVO DE RECHAZO */}
                      <div>
                        <h4 style={{ margin: '0 0 12px 0', fontSize: '11px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Motivo de rechazo:</h4>
                        <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#4B5563', lineHeight: '1.5' }}>
                          Las siguientes observaciones no se encuentran en el estado esperado.
                        </p>
                        <ul style={{ margin: '0 0 16px 0', paddingLeft: '20px', fontSize: '12px', color: '#4B5563', lineHeight: '1.6' }}>
                          {valDni === 'rechazado' && <li>Validar constancia de DNI {dniReason ? `- ${dniReason}` : ''}</li>}
                          {valInsc === 'rechazado' && <li>Validar constancia de inscripcion vigente {inscReason ? `- ${inscReason}` : ''}</li>}
                        </ul>
                        <textarea
                          placeholder="Desarrolla más el motivo de rechazo..."
                          style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', color: '#374151', minHeight: '80px', boxSizing: 'border-box', outline: 'none', resize: 'vertical' }}
                        />
                      </div>
                    </div>

                    {/* Sticky footer */}
                    <div style={{ padding: '16px 24px', borderTop: '1px solid #E5E7EB', backgroundColor: '#F9FAFB', display: 'flex', gap: '12px', flexShrink: 0 }}>
                      <button
                        disabled={!canRechazar}
                        onClick={() => setShowConfirmModal(true)}
                        style={{
                          flex: 1, padding: '10px', borderRadius: '6px', border: 'none',
                          backgroundColor: canRechazar ? '#EF4444' : '#D1D5DB',
                          color: '#fff', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                          cursor: canRechazar ? 'pointer' : 'not-allowed', transition: 'background-color 0.2s'
                        }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>
                        Rechazar postulante
                      </button>
                      <button
                        disabled={!canAprobar}
                        onClick={() => setShowAprobarModal(true)}
                        style={{
                          flex: 1, padding: '10px', borderRadius: '6px', border: 'none',
                          backgroundColor: canAprobar ? '#00AC99' : '#D1D5DB',
                          color: '#fff', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: canAprobar ? 'pointer' : 'not-allowed', transition: 'background-color 0.2s'
                        }}>
                        Aprobar postulante
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>


          </main>
        </div>

        {/* Modal de Confirmación de Rechazo */}
        {showConfirmModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '48px 32px', width: '560px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#FF3300', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              </div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1F2937', lineHeight: '1.4' }}>
                ¿Estás seguro de rechazar la postulación de<br />la Profesional Gonzales, Camila?
              </h3>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '8px' }}>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  style={{ width: '160px', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#fff', color: '#374151', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  No, volver
                </button>
                <button
                  onClick={() => {
                    setShowConfirmModal(false);
                    setIsRechazadoFinal(true);
                  }}
                  style={{ width: '160px', padding: '10px', borderRadius: '6px', border: 'none', backgroundColor: '#FF3300', color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  Confirmar rechazo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Confirmación de Aprobación */}
        {showAprobarModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '48px 32px', width: '560px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#00AC99', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><path d="M9 15h6" /><path d="M12 12l3 3-3 3" /></svg>
              </div>
              <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 700, color: '#1F2937', lineHeight: '1.4' }}>
                  ¿Confirmas la aprobación de la Profesional<br />Gonzales, Camila?
                </h3>
                <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>Si es correcto, el expediente avanzará al área de Prestaciones Médicas.</p>
              </div>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '8px' }}>
                <button
                  onClick={() => setShowAprobarModal(false)}
                  style={{ width: '160px', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#fff', color: '#374151', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  No, volver
                </button>
                <button
                  onClick={() => {
                    setShowAprobarModal(false);
                    if (applicantStage < AREAS.length - 1) {
                      setApplicantStage(applicantStage + 1);
                    }
                  }}
                  style={{ width: '160px', padding: '10px', borderRadius: '6px', border: 'none', backgroundColor: '#00AC99', color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  Confirmar aprobación
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F3F4F6', fontFamily: 'Inter, sans-serif' }}>
      <BackofficeHeader />
      <AdminSidebarTools AREAS={AREAS} currentAdminView={currentAdminView} setCurrentAdminView={setCurrentAdminView} setView={setView} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <BackofficeSidebar />

        <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 600, color: '#374151', margin: '0 0 24px 0' }}>Postulantes a prestadores</h1>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#4B5563', margin: 0 }}>4256 Postulaciones</h2>
            <div style={{ position: 'relative', width: '400px' }}>
              <input type="text" placeholder="Buscar por Nombre, CUIT, Matrícula, profesión o departamento..."
                style={{ width: '100%', padding: '10px 36px 10px 16px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              <svg style={{ position: 'absolute', right: '12px', top: '10px', color: '#9CA3AF' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'flex-end', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', marginBottom: '6px', display: 'block' }}>Tipo</label>
              <div style={{ position: 'relative' }}>
                <select style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#fff', fontSize: '13px', color: '#1F2937', appearance: 'none', outline: 'none' }}>
                  <option>Seleccionar Tipo</option>
                </select>
                <div style={{ position: 'absolute', right: '10px', top: '10px', pointerEvents: 'none', color: '#6B7280' }}><ChevronDownIcon /></div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', marginBottom: '6px', display: 'block' }}>Especialidad</label>
              <div style={{ position: 'relative' }}>
                <select style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#fff', fontSize: '13px', color: '#1F2937', appearance: 'none', outline: 'none' }}>
                  <option>Seleccionar Especialidad</option>
                </select>
                <div style={{ position: 'absolute', right: '10px', top: '10px', pointerEvents: 'none', color: '#6B7280' }}><ChevronDownIcon /></div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', marginBottom: '6px', display: 'block' }}>Departamento</label>
              <div style={{ position: 'relative' }}>
                <select style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#fff', fontSize: '13px', color: '#1F2937', appearance: 'none', outline: 'none' }}>
                  <option>Seleccionar Departamento</option>
                </select>
                <div style={{ position: 'absolute', right: '10px', top: '10px', pointerEvents: 'none', color: '#6B7280' }}><ChevronDownIcon /></div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', marginBottom: '6px', display: 'block' }}>Orden</label>
              <div style={{ position: 'relative' }}>
                <select style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#fff', fontSize: '13px', color: '#1F2937', appearance: 'none', outline: 'none' }}>
                  <option>Seleccionar Orden</option>
                </select>
                <div style={{ position: 'absolute', right: '10px', top: '10px', pointerEvents: 'none', color: '#6B7280' }}><ChevronDownIcon /></div>
              </div>
            </div>
            <div>
              <button style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '6px',
                border: '1px solid #FECACA', backgroundColor: '#FEF2F2', color: '#EF4444', fontSize: '13px', fontWeight: 600, cursor: 'pointer'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                Limpiar Filtros
              </button>
            </div>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB', padding: '0', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #E5E7EB', gap: '24px' }}>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#374151', minWidth: '120px' }}>1 resultado</span>
              <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
                {['Todos', 'Nuevo', 'A Revisar', 'En Espera', 'Observado', 'Aprobado', 'Corregido', 'Activo'].map(tab => (
                  <button key={tab} style={{
                    flex: 1,
                    padding: '10px 16px',
                    borderRadius: '4px',
                    border: tab === 'Todos' ? 'none' : '1px solid #D1D5DB',
                    backgroundColor: tab === 'Todos' ? '#00AC99' : '#fff',
                    color: tab === 'Todos' ? '#fff' : '#4B5563',
                    fontSize: '13px',
                    fontWeight: tab === 'Todos' ? 600 : 500,
                    cursor: 'pointer'
                  }}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => setIsRowChecked(!isRowChecked)}
                  style={{ padding: '8px 16px', borderRadius: '16px', border: '1px solid #D1D5DB', backgroundColor: '#fff', color: '#4B5563', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}
                >
                  Seleccionar todos
                </button>
                <button
                  disabled={!isRowChecked || !canInteract}
                  onClick={() => setShowAprobarModal(true)}
                  style={{
                    padding: '8px 16px', borderRadius: '4px', border: 'none',
                    backgroundColor: (isRowChecked && canInteract) ? '#00AC99' : '#BCC1C6',
                    color: '#fff', fontSize: '12px', fontWeight: 600,
                    cursor: (isRowChecked && canInteract) ? 'pointer' : 'not-allowed'
                  }}>
                  Aprobar
                </button>
                <button
                  disabled={!isRowChecked || !canInteract}
                  onClick={() => setShowConfirmModal(true)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '4px', border: 'none',
                    backgroundColor: (isRowChecked && canInteract) ? '#EF4444' : '#BCC1C6',
                    color: '#fff', fontSize: '12px', fontWeight: 600,
                    cursor: (isRowChecked && canInteract) ? 'pointer' : 'not-allowed'
                  }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>
                  Rechazar postulante
                </button>
              </div>
              <button style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #D1D5DB', backgroundColor: '#fff', color: '#374151', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Exportar selección</button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '12px', fontWeight: 700, color: '#4B5563', borderRight: '1px solid #E5E7EB', width: '40px' }}>
                    <input 
                      type="checkbox" 
                      disabled={!canInteract} 
                      checked={isRowChecked} 
                      onChange={(e) => setIsRowChecked(e.target.checked)} 
                      style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #D1D5DB', cursor: canInteract ? 'pointer' : 'not-allowed' }} 
                    />
                  </th>
                  <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#4B5563', borderRight: '1px solid #E5E7EB' }}>Estado</th>
                  <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#4B5563', borderRight: '1px solid #E5E7EB' }}>Postulante</th>
                  <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#4B5563', borderRight: '1px solid #E5E7EB' }}>Profesión</th>
                  <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#4B5563', borderRight: '1px solid #E5E7EB' }}>Lugar de atención</th>
                  <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#4B5563', borderRight: '1px solid #E5E7EB' }}>Fecha de Postulación</th>
                  <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '12px', fontWeight: 700, color: '#4B5563', borderRight: '1px solid #E5E7EB' }}>Área actual</th>
                  <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '12px', fontWeight: 700, color: '#4B5563' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {isVisible ? (
                  <>
                    <tr style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: '#fff' }}>
                      <td style={{ padding: '16px 20px', textAlign: 'center', borderRight: '1px solid #E5E7EB' }}>
                        <input type="checkbox" disabled={!canInteract} checked={isRowChecked} onChange={(e) => setIsRowChecked(e.target.checked)} style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #D1D5DB', cursor: canInteract ? 'pointer' : 'not-allowed' }} />
                      </td>
                      <td style={{ padding: '16px 20px', borderRight: '1px solid #E5E7EB' }}>
                        <span style={{
                          display: 'inline-block', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600,
                          backgroundColor: isAprobadoFinal ? '#E6F6F4' : isRechazadoFinal ? '#FEE2E2' : '#fff',
                          color: isAprobadoFinal ? '#00AC99' : isRechazadoFinal ? '#FF3300' : '#4B5563',
                          border: isAprobadoFinal ? '1px solid #00AC99' : isRechazadoFinal ? '1px solid #FF3300' : '1px solid #D1D5DB'
                        }}>
                          {isAprobadoFinal ? 'Aprobado' : isRechazadoFinal ? 'Rechazado' : 'Nuevo'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px', fontSize: '13px', color: '#6B7280', borderRight: '1px solid #E5E7EB' }}>
                        Fernando Javie Hidalgo<br />
                        201234567
                      </td>
                      <td style={{ padding: '16px 20px', fontSize: '13px', color: '#6B7280', borderRight: '1px solid #E5E7EB' }}>
                        Fonoaudióloga
                      </td>
                      <td style={{ padding: '16px 20px', fontSize: '13px', color: '#6B7280', borderRight: '1px solid #E5E7EB' }}>
                        Sanatorio Allende - Cerro de las rosas
                      </td>
                      <td style={{ padding: '16px 20px', fontSize: '13px', color: '#6B7280', borderRight: '1px solid #E5E7EB' }}>
                        25/05/2021
                      </td>
                      <td style={{ padding: '16px 20px', textAlign: 'center', borderRight: '1px solid #E5E7EB' }}>
                        <span style={{ padding: '6px 12px', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '11px', color: '#4B5563', whiteSpace: 'nowrap' }}>
                          {AREAS[applicantStage]}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <button onClick={() => setView('ficha')} style={{ width: '100%', padding: '10px 16px', borderRadius: '4px', border: '1px solid #374151', backgroundColor: '#fff', color: '#374151', fontSize: '13px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', justifyContent: 'center' }}>
                          Ver Ficha de postulante
                        </button>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: '#fff' }}>
                      <td style={{ padding: '16px 20px', textAlign: 'center', borderRight: '1px solid #E5E7EB' }}>
                        <input type="checkbox" disabled={!canInteract} checked={isRowChecked} onChange={(e) => setIsRowChecked(e.target.checked)} style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #D1D5DB', cursor: canInteract ? 'pointer' : 'not-allowed' }} />
                      </td>
                      <td style={{ padding: '16px 20px', borderRight: '1px solid #E5E7EB' }}>
                        <span style={{
                          display: 'inline-block', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600,
                          backgroundColor: isAprobadoFinal ? '#E6F6F4' : isRechazadoFinal ? '#FEE2E2' : '#fff',
                          color: isAprobadoFinal ? '#00AC99' : isRechazadoFinal ? '#FF3300' : '#4B5563',
                          border: isAprobadoFinal ? '1px solid #00AC99' : isRechazadoFinal ? '1px solid #FF3300' : '1px solid #D1D5DB'
                        }}>
                          {isAprobadoFinal ? 'Aprobado' : isRechazadoFinal ? 'Rechazado' : 'Nuevo'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px', fontSize: '13px', color: '#6B7280', borderRight: '1px solid #E5E7EB' }}>
                        María Florencia Gomez<br />
                        2734567891
                      </td>
                      <td style={{ padding: '16px 20px', fontSize: '13px', color: '#6B7280', borderRight: '1px solid #E5E7EB' }}>
                        Psicóloga
                      </td>
                      <td style={{ padding: '16px 20px', fontSize: '13px', color: '#6B7280', borderRight: '1px solid #E5E7EB' }}>
                        Hospital Privado Universitario de Córdoba
                      </td>
                      <td style={{ padding: '16px 20px', fontSize: '13px', color: '#6B7280', borderRight: '1px solid #E5E7EB' }}>
                        26/05/2021
                      </td>
                      <td style={{ padding: '16px 20px', textAlign: 'center', borderRight: '1px solid #E5E7EB' }}>
                        <span style={{ padding: '6px 12px', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '11px', color: '#4B5563', whiteSpace: 'nowrap' }}>
                          {AREAS[applicantStage]}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <button onClick={() => setView('ficha')} style={{ width: '100%', padding: '10px 16px', borderRadius: '4px', border: '1px solid #374151', backgroundColor: '#fff', color: '#374151', fontSize: '13px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', justifyContent: 'center' }}>
                          Ver Ficha de postulante
                        </button>
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan={9} style={{ padding: '40px 20px', textAlign: 'center', color: '#6B7280', fontSize: '14px' }}>
                      No hay postulantes pendientes en esta área.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Modal de Confirmación de Rechazo */}
          {showConfirmModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
              <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '48px 32px', width: '560px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                <div style={{ width: '64px', height: '64px', backgroundColor: '#FF3300', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                </div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1F2937', lineHeight: '1.4' }}>
                  ¿Estás seguro de rechazar la postulación de<br />la Profesional Gonzales, Camila?
                </h3>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '8px' }}>
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    style={{ width: '160px', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#fff', color: '#374151', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                    No, volver
                  </button>
                  <button
                    onClick={() => {
                      setShowConfirmModal(false);
                      setIsRechazadoFinal(true);
                      setIsRowChecked(false);
                    }}
                    style={{ width: '160px', padding: '10px', borderRadius: '6px', border: 'none', backgroundColor: '#FF3300', color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                    Confirmar rechazo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal de Confirmación de Aprobación */}
          {showAprobarModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
              <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '48px 32px', width: '560px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                <div style={{ width: '64px', height: '64px', backgroundColor: '#00AC99', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><path d="M9 15h6" /><path d="M12 12l3 3-3 3" /></svg>
                </div>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 700, color: '#1F2937', lineHeight: '1.4' }}>
                    ¿Confirmas la aprobación de la Profesional<br />Gonzales, Camila?
                  </h3>
                  <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>Si es correcto, el expediente avanzará al área de Prestaciones Médicas.</p>
                </div>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '8px' }}>
                  <button
                    onClick={() => setShowAprobarModal(false)}
                    style={{ width: '160px', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#fff', color: '#374151', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                    No, volver
                  </button>
                  <button
                    onClick={() => {
                      setShowAprobarModal(false);
                      if (applicantStage < AREAS.length - 1) {
                        setApplicantStage(applicantStage + 1);
                      }
                      setIsRowChecked(false);
                    }}
                    style={{ width: '160px', padding: '10px', borderRadius: '6px', border: 'none', backgroundColor: '#00AC99', color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                    Confirmar aprobación
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
