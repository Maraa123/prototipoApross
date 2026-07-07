import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar2 from '../components/Sidebar2'
import {
  CalendarIcon, UploadIcon, FileIcon, ChevronDownIcon, CheckIcon,
  TrashIcon, PencilEditIcon, PersonIcon
} from '../components/Icons'

interface AltaPostulanteProps {
  cidiData: { represented: string; category: string; cuit: string } | null
  onGoBack: () => void
  onComplete?: (data: {
    cuit: string
    represented: string
    categoria: string
    profesion?: string
    especialidades?: string[]
    nivelAtencion?: string
    tipoInstitucionNivel?: string
    tipoInstitucion?: string
  }) => void
  fase?: 'borrador' | 'aceptado'
}

const steps = [
  { num: 1, name: 'Datos Fiscales' },
  { num: 2, name: 'Datos del perfil' },
  { num: 3, name: 'Staff' },
  { num: 4, name: 'Lugar de atencion' },
  { num: 5, name: 'Seguro y Habilitaciones' },
  { num: 6, name: 'Documentacion legal' },
  { num: 7, name: 'CBU' },
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: '11.5px', fontWeight: 700, color: '#4B5563',
      letterSpacing: '0.08em', textTransform: 'uppercase',
      marginBottom: '14px', marginTop: '4px',
    }}>
      {children}
    </p>
  )
}

function AttachmentRow({
  title,
  required = false,
  fileName,
  onAttach,
}: {
  title: string
  required?: boolean
  fileName?: string | null
  onAttach: () => void
}) {
  return (
    <div>
      <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
        {title} {required && <span style={{ color: '#EF4444' }}>*</span>}
      </label>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        border: fileName ? '1px solid #00AC99' : '1px solid #D1D5DB',
        borderRadius: '6px', padding: '8px 16px',
        backgroundColor: fileName ? '#F0FDF4' : '#fff',
        minHeight: '38px', boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: fileName ? '#00AC99' : '#9CA3AF', display: 'flex', alignItems: 'center' }}>
            <FileIcon />
          </span>
          {fileName ? (
            <span style={{ fontSize: '13px', color: '#0056b3', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer', wordBreak: 'break-all' }}>
              {fileName}
            </span>
          ) : (
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#374151' }}>
              {title}
            </span>
          )}
        </div>

        <button
          onClick={onAttach}
          style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            border: '1px solid #D1D5DB', borderRadius: '6px',
            padding: '4px 10px', fontSize: '12px', fontWeight: 500,
            color: '#374151', backgroundColor: '#fff', cursor: 'pointer',
            flexShrink: 0
          }}
        >
          <UploadIcon />
          Adjuntar
        </button>
      </div>
    </div>
  )
}

function CollegeIcon() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
      <div style={{
        position: 'relative',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: '#00AC99',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <div style={{
          position: 'absolute',
          bottom: '-2px',
          right: '-2px',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          border: '1.5px solid #00AC99',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00AC99',
          fontSize: '8px',
          fontWeight: 'bold',
        }}>
          ✓
        </div>
      </div>

      <div style={{
        width: '32px',
        height: '2px',
        backgroundColor: '#E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#00AC99',
          border: '2px solid #fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      <div style={{
        width: '74px',
        height: '74px',
        borderRadius: '50%',
        backgroundColor: '#E6F6F4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #E6F6F4',
      }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00AC99" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 2-10 5v2h20V7L12 2Z" />
          <path d="M4 9v11h16V9" />
          <path d="M12 14v6" />
          <path d="M8 14v6" />
          <path d="M16 14v6" />
          <circle cx="12" cy="7" r="1.5" fill="#00AC99" />
        </svg>
      </div>
    </div>
  )
}

function BigUploadIcon() {
  return (
    <div style={{
      width: '42px',
      height: '42px',
      borderRadius: '50%',
      backgroundColor: '#F3F4F6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#4B5563',
      marginBottom: '8px',
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    </div>
  )
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

const especialidadesMedicas = [
  { isHeader: true, label: '— Clínicas (Base) —' },
  { isHeader: false, label: 'Clínica Médica (o Medicina Interna)' },
  { isHeader: false, label: 'Pediatría' },
  { isHeader: false, label: 'Medicina General y/o Medicina de Familia' },
  { isHeader: false, label: 'Geriatría' },

  { isHeader: true, label: '— Clínicas Específicas —' },
  { isHeader: false, label: 'Alergia e Inmunología' },
  { isHeader: false, label: 'Cardiología' },
  { isHeader: false, label: 'Dermatología' },
  { isHeader: false, label: 'Endocrinología' },
  { isHeader: false, label: 'Gastroenterología' },
  { isHeader: false, label: 'Genética Médica' },
  { isHeader: false, label: 'Hematología' },
  { isHeader: false, label: 'Infectología' },
  { isHeader: false, label: 'Nefrología' },
  { isHeader: false, label: 'Neumonología' },
  { isHeader: false, label: 'Neurología' },
  { isHeader: false, label: 'Nutrición (Médico Nutricionista)' },
  { isHeader: false, label: 'Oncología Clínica' },
  { isHeader: false, label: 'Psiquiatría (y Psiquiatría Infantojuvenil)' },
  { isHeader: false, label: 'Reumatología' },

  { isHeader: true, label: '— Quirúrgicas —' },
  { isHeader: false, label: 'Cirugía General' },
  { isHeader: false, label: 'Cirugía Cardiovascular' },
  { isHeader: false, label: 'Cirugía de Cabeza y Cuello' },
  { isHeader: false, label: 'Cirugía de Tórax (Torácica)' },
  { isHeader: false, label: 'Cirugía Infantil (Pediátrica)' },
  { isHeader: false, label: 'Cirugía Plástica y Reparadora' },
  { isHeader: false, label: 'Cirugía Vascular Periférica' },
  { isHeader: false, label: 'Neurocirugía' },
  { isHeader: false, label: 'Oftalmología' },
  { isHeader: false, label: 'Ortopedia y Traumatología' },
  { isHeader: false, label: 'Otorrinolaringología' },
  { isHeader: false, label: 'Urología' },
  { isHeader: false, label: 'Ginecología (o Tocoginecología al combinarse con Obstetricia)' },
  { isHeader: false, label: 'Obstetricia' },

  { isHeader: true, label: '— Diagnóstico y Tratamiento —' },
  { isHeader: false, label: 'Anestesiología' },
  { isHeader: false, label: 'Anatomía Patológica' },
  { isHeader: false, label: 'Diagnóstico por Imágenes (Radiología)' },
  { isHeader: false, label: 'Hemoterapia e Inmunohematología' },
  { isHeader: false, label: 'Medicina Nuclear' },
  { isHeader: false, label: 'Radioterapia (o Terapia Radiante)' },

  { isHeader: true, label: '— Cuidados Críticos y Emergencias —' },
  { isHeader: false, label: 'Terapia Intensiva (Medicina Crítica)' },
  { isHeader: false, label: 'Neonatología' },
  { isHeader: false, label: 'Emergentología' },

  { isHeader: true, label: '— Sanitarias y Legales —' },
  { isHeader: false, label: 'Medicina del Deporte' },
  { isHeader: false, label: 'Medicina del Trabajo (o Laboral)' },
  { isHeader: false, label: 'Medicina Legal' },
  { isHeader: false, label: 'Toxicología' },
  { isHeader: false, label: 'Salud Pública' },
  { isHeader: false, label: 'Auditoría Médica' }
]
const SummarySection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div style={{ marginBottom: '24px', backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
    <div style={{ backgroundColor: '#F9FAFB', padding: '12px 16px', borderBottom: '1px solid #E5E7EB' }}>
      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#374151', textTransform: 'uppercase' }}>{title}</h4>
    </div>
    <div style={{ padding: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        {children}
      </div>
    </div>
  </div>
);

const SummaryItem = ({ label, value }: { label: string, value: React.ReactNode }) => (
  <div>
    <p style={{ margin: '0 0 4px 0', fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>{label}</p>
    <p style={{ margin: 0, fontSize: '14px', color: '#111827', fontWeight: 500, wordBreak: 'break-word' }}>{value || '-'}</p>
  </div>
);

export default function AltaPostulante({ cidiData, onGoBack, onComplete, fase = 'borrador' }: AltaPostulanteProps) {
  const isDisabilityCategory = cidiData?.category === 'Prestador de discapacidad'
  const isInstitucionDiscapacidad = cidiData?.represented === 'Sanatorio Allende S.A.' && cidiData?.category === 'Prestador de discapacidad'
  const isInstitucionNivel = cidiData?.represented === 'Sanatorio Allende S.A.' && cidiData?.category === 'Institución'
  // Persona física = el representado NO es persona jurídica (Sanatorio). Staff solo aplica a personas jurídicas.
  const isPersonaJuridica = cidiData?.represented === 'Sanatorio Allende S.A.'
  const isPersonaFisica = !isPersonaJuridica

  const [estadoPostulacion, setEstadoPostulacion] = useState<'borrador' | 'en_revision' | 'aceptado'>(fase)

  const location = useLocation()
  const navigate = useNavigate()

  const postulacionTabs = isPersonaFisica
    ? [{ path: 'datos-perfil', name: 'Datos del Perfil' }, { path: 'lugar-atencion', name: 'Lugar de Atención' }, { path: 'revision-postulacion', name: 'Revisión' }]
    : [{ path: 'datos-institucion', name: 'Datos de la institucion' }, { path: 'datos-perfil', name: 'Datos del perfil' }, { path: 'staff', name: 'Staff' }, { path: 'lugar-atencion', name: 'Lugar de atencion' }, { path: 'seguro-habilitaciones', name: 'Seguro y Habilitaciones' }, { path: 'revision-postulacion', name: 'Revisión' }];

  const inscripcionTabs = isPersonaFisica
    ? [
      { path: 'datos-fiscales', name: 'Datos Fiscales' },
      { path: 'seguro-habilitaciones', name: 'Seguros' },
      { path: 'documentacion-legal', name: 'Documentación Legal' },
      { path: 'cbu', name: 'CBU' },
      { path: 'revision-inscripcion', name: 'Revisión' }
    ]
    : [
      { path: 'datos-fiscales', name: 'Datos Fiscales' },
      { path: 'documentacion-legal', name: 'Documentación Legal' },
      { path: 'cbu', name: 'CBU' },
      { path: 'revision-inscripcion', name: 'Revisión' }
    ];

  const activeTabs = estadoPostulacion === 'aceptado' ? inscripcionTabs : postulacionTabs;
  const stepPaths = activeTabs.map(t => t.path);

  const currentPath = location.pathname.split('/').pop() || (estadoPostulacion === 'aceptado' ? 'datos-fiscales' : (isPersonaFisica ? 'datos-perfil' : 'datos-institucion'));
  const activeStepIndex = stepPaths.indexOf(currentPath)

  const sectionMap: Record<string, number> = {
    'datos-fiscales': 1,
    'datos-perfil': 2,
    'staff': 3,
    'lugar-atencion': 4,
    'seguro-habilitaciones': 5,
    'documentacion-legal': 6,
    'cbu': 7,
    'revision-postulacion': 8,
    'revision-inscripcion': 9,
    'datos-institucion': 10,
  }
  const activeStep = sectionMap[currentPath] || (estadoPostulacion === 'aceptado' ? 1 : (isPersonaFisica ? 2 : 10))

  const setActiveStep = (_stepNum?: number) => {
    // Keep this function around to not break existing callbacks unexpectedly, but we'll modify handleNextStep to not use it
  }

  const [hasExtension, setHasExtension] = useState(true) // Poseo extension IIBB

  // Paso 10: Datos de la institucion state (Persona juridica)
  const [instRefes, setInstRefes] = useState('34254322')
  const [instRegistroProvincial, setInstRegistroProvincial] = useState('AL58742')
  const [instRnp, setInstRnp] = useState('20458778')
  const [instResolucion, setInstResolucion] = useState('1547895')
  const [instDirectorCuit, setInstDirectorCuit] = useState('20413238770')
  const [instDirectorNombre, setInstDirectorNombre] = useState('Franco, Gustamante')
  const [instDirectorMatricula, setInstDirectorMatricula] = useState('234145')
  const [instRepLegalCuit, setInstRepLegalCuit] = useState('20413238770')
  const [instRepLegalNombre, setInstRepLegalNombre] = useState('Camila, Gonzales')
  const [instRepLegalRol, setInstRepLegalRol] = useState('Presidente')

  // Paso 1: Fiscal fields state
  const [cuit] = useState(cidiData?.cuit || '')
  const [inicioActividades, setInicioActividades] = useState('2023-01-01')
  const [responsabilidadFiscal, setResponsabilidadFiscal] = useState('Responsable Inscripto')
  const [ingresosBrutos, setIngresosBrutos] = useState('123456789')
  const [telAdministrativo, setTelAdministrativo] = useState('3511234567')
  const [emailAdministrativo, setEmailAdministrativo] = useState('ejemplo@apross.gov.ar')

  // Paso 1: Domicilio Fiscal
  const [calle, setCalle] = useState('Av. Siempre Viva')
  const [puerta, setPuerta] = useState('123')
  const [apartamento, setApartamento] = useState('')
  const [codigoPostal, setCodigoPostal] = useState('5000')
  const [barrio, setBarrio] = useState('Centro')
  const [localidad, setLocalidad] = useState('Córdoba')
  const [otrosDatos, setOtrosDatos] = useState('')

  // Paso 2: Datos del Perfil fields state
  const [tipoProfesion, setTipoProfesion] = useState('Selecciona')
  const [ambitoMatricula, setAmbitoMatricula] = useState('Selecciona')
  const [numMatricula, setNumMatricula] = useState('222311')
  const [especialidadesData, setEspecialidadesData] = useState<Record<string, { matricula: string; constancia: string }>>({})

  const updateEspecialidadMatricula = (esp: string, value: string) => {
    setEspecialidadesData(prev => ({ ...prev, [esp]: { ...prev[esp], matricula: value } }))
  }
  const updateEspecialidadConstancia = (esp: string, fileName: string) => {
    setEspecialidadesData(prev => ({ ...prev, [esp]: { ...prev[esp], constancia: fileName } }))
  }
  const [especialidadMedica, setEspecialidadMedica] = useState<string[]>([])
  const [certificadoRnp, setCertificadoRnp] = useState('RNP-987654321')
  const [noTengoMatricula, setNoTengoMatricula] = useState(false)
  const [step2AttachedFiles, setStep2AttachedFiles] = useState<{ [key: string]: string }>({})

  // Paso 2 (Institución Discapacidad): Tipo de Institución & transport state
  const [tipoInstitucion, setTipoInstitucion] = useState('Selecciona')
  const [tipoInstitucionDropdownOpen, setTipoInstitucionDropdownOpen] = useState(false)
  const [disposicionAndis, setDisposicionAndis] = useState('DISP-ANDIS-12345')
  const [conductoresList, setConductoresList] = useState<any[]>([])
  const [showConductorModal, setShowConductorModal] = useState(false)
  const [conductorNombre, setConductorNombre] = useState('')
  const [conductorApellido, setConductorApellido] = useState('')
  const [conductorCuit, setConductorCuit] = useState('')
  const [conductorCargo, setConductorCargo] = useState('')

  // Paso 2 (Institución Nivel): clasificación, tipo, checkboxes
  const [nivelAtencion, setNivelAtencion] = useState('Selecciona')
  const [nivelAtencionOpen, setNivelAtencionOpen] = useState(false)
  const [tipoInstitucionNivel, setTipoInstitucionNivel] = useState('Selecciona')
  const [tipoInstitucionNivelOpen, setTipoInstitucionNivelOpen] = useState(false)
  const [opcionesChecks, setOpcionesChecks] = useState<Record<string, boolean>>({
    'Atención ambulatoria': false,
    'Medicina general': false,
    'Odontología general': false,
    'Enfermería permanente': false,
    'Consultoría especializada (psicología, nutrición).': false,
  })
  const [tecnologiaChecks, setTecnologiaChecks] = useState<Record<string, boolean>>({
    'Laboratorio': false,
    'Diagnóstico por imágenes': false,
    'Otros (Especifique)': false,
  })
  const [diagnosticoSubChecks, setDiagnosticoSubChecks] = useState<Record<string, boolean>>({
    'RX (Radiología simple)': false,
  })
  const [otrosTecnologiaText, setOtrosTecnologiaText] = useState('')

  // Paso 3: Staff State
  const [staffList, setStaffList] = useState<any[]>([])
  const [showStaffModal, setShowStaffModal] = useState(false)
  const [editingStaffIndex, setEditingStaffIndex] = useState<number | null>(null)
  const [staffCuit, setStaffCuit] = useState('')
  const [staffNombre, setStaffNombre] = useState('')
  const [staffEspecialidad, setStaffEspecialidad] = useState('')
  const [staffPrescriptor, setStaffPrescriptor] = useState(false)
  const [staffMatricula, setStaffMatricula] = useState('')

  // Paso 4: Lugar de atención State
  const [locationsList, setLocationsList] = useState<any[]>([])
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [editingLocationIndex, setEditingLocationIndex] = useState<number | null>(null)

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false)
  const [itemToDeleteIndex, setItemToDeleteIndex] = useState<number | null>(null)
  const [itemToDeleteType, setItemToDeleteType] = useState<'lugar' | 'staff' | 'antecedente' | null>(null)

  // Modal input fields
  const [locNombre, setLocNombre] = useState('')
  const [locGuardia, setLocGuardia] = useState(false)
  const [locCalle, setLocCalle] = useState('')
  const [locPuerta, setLocPuerta] = useState('')
  const [locDepto, setLocDepto] = useState('')
  const [locCP, setLocCP] = useState('')
  const [locBarrio, setLocBarrio] = useState('')
  const [locLocalidad, setLocLocalidad] = useState('')
  const [locOtros, setLocOtros] = useState('')
  const [locTelTurnos, setLocTelTurnos] = useState('')
  const [locTelEmergencia, setLocTelEmergencia] = useState('')
  const [locEmail, setLocEmail] = useState('')
  const [locHorarios, setLocHorarios] = useState<{ dias: string[], inicio: string, fin: string, diaOpen: boolean }[]>([])

  // UI State
  const [respFiscalDropdownOpen, setRespFiscalDropdownOpen] = useState(false)
  const [tipoProfesionDropdownOpen, setTipoProfesionDropdownOpen] = useState(false)
  const [ambitoMatriculaDropdownOpen, setAmbitoMatriculaDropdownOpen] = useState(false)
  const [especialidadDropdownOpen, setEspecialidadDropdownOpen] = useState(false)
  const [especialidadSearch, setEspecialidadSearch] = useState('')
  const [showCollegeModal, setShowCollegeModal] = useState(false)

  // Paso 5: Seguro y Habilitaciones State
  const [aseguradoraRazonSocial, setAseguradoraRazonSocial] = useState('Sancor Seguros')
  const [aseguradoraCuit, setAseguradoraCuit] = useState('30-50000000-1')
  const [aseguradoraVencimiento, setAseguradoraVencimiento] = useState('2027-12-31')
  const [aseguradoraNoPoliza, setAseguradoraNoPoliza] = useState('POL-123456')
  const [step5AttachedFiles, setStep5AttachedFiles] = useState<{ [key: string]: string }>({
    'poliza': 'poliza_seguro.pdf',
    'certificado': 'certificado_habilitacion.pdf'
  })

  // Paso 6: Documentacion legal State
  const [antecedentesList, setAntecedentesList] = useState<any[]>([
    {
      descripcion: 'Médico Clínico de Guardia',
      periodoInicio: '26/11/2010',
      periodoFin: '26/11/2025',
      establecimiento: 'Colegio San Antonio',
      establecimientoCuit: '30-12343212'
    }
  ])
  const [showAntecedentesModal, setShowAntecedentesModal] = useState(false)
  const [editingAntecedenteIndex, setEditingAntecedenteIndex] = useState<number | null>(null)
  const [antecedenteDescripcion, setAntecedenteDescripcion] = useState('')
  const [antecedentePeriodoInicio, setAntecedentePeriodoInicio] = useState('')
  const [antecedentePeriodoFin, setAntecedentePeriodoFin] = useState('')
  const [antecedenteEstablecimiento, setAntecedenteEstablecimiento] = useState('')
  const [antecedenteEstablecimientoCuit, setAntecedenteEstablecimientoCuit] = useState('')
  const [step6AttachedFiles, setStep6AttachedFiles] = useState<{ [key: string]: string }>({})

  // Paso 7: CBU State
  const [cbuLoaded, setCbuLoaded] = useState(false)
  const [selectedCbuIndex, setSelectedCbuIndex] = useState(0)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [declaracionJuradaAceptada, setDeclaracionJuradaAceptada] = useState(false)

  const [cbuOption, setCbuOption] = useState<'cidi' | 'manual'>('manual')
  const [manualTitular, setManualTitular] = useState('Camila Gonzales')
  const [manualBanco, setManualBanco] = useState('BNA')
  const [manualCbu, setManualCbu] = useState('12345678910111222222')
  const [manualAlias, setManualAlias] = useState('carta.barco.avion')
  const [manualMoneda, setManualMoneda] = useState('Pesos')

  // Validation state
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  // --- AUTOSAVE DRAFT LOGIC ---
  const [isRestoring, setIsRestoring] = useState(true)
  const draftKey = `apross_draft_${cidiData?.cuit || 'default'}_${cidiData?.category || 'default'}`

  useEffect(() => {
    try {
      const saved = localStorage.getItem(draftKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed === 'object') {
          if (parsed.activeStep) setActiveStep(parsed.activeStep) // Legacy
          if (parsed.estadoPostulacion) setEstadoPostulacion(parsed.estadoPostulacion)
          if (parsed.hasExtension !== undefined) setHasExtension(parsed.hasExtension)
          if (parsed.inicioActividades) setInicioActividades(parsed.inicioActividades)
          if (parsed.responsabilidadFiscal) setResponsabilidadFiscal(parsed.responsabilidadFiscal)
          if (parsed.ingresosBrutos) setIngresosBrutos(parsed.ingresosBrutos)
          if (parsed.tipoProfesion) setTipoProfesion(parsed.tipoProfesion)
          if (parsed.numMatricula) setNumMatricula(parsed.numMatricula)
          if (parsed.especialidadesData && typeof parsed.especialidadesData === 'object') setEspecialidadesData(parsed.especialidadesData)
          if (parsed.especialidadMedica) {
            if (Array.isArray(parsed.especialidadMedica)) {
              setEspecialidadMedica(parsed.especialidadMedica)
            } else if (typeof parsed.especialidadMedica === 'string' && parsed.especialidadMedica !== 'Selecciona') {
              setEspecialidadMedica([parsed.especialidadMedica])
            }
          }
          if (parsed.certificadoRnp) setCertificadoRnp(parsed.certificadoRnp)
          if (parsed.tipoInstitucion) setTipoInstitucion(parsed.tipoInstitucion)
          if (parsed.disposicionAndis) setDisposicionAndis(parsed.disposicionAndis)
          if (parsed.conductoresList) setConductoresList(parsed.conductoresList)
          if (parsed.nivelAtencion) setNivelAtencion(parsed.nivelAtencion)
          if (parsed.tipoInstitucionNivel) setTipoInstitucionNivel(parsed.tipoInstitucionNivel)
          if (parsed.opcionesChecks) setOpcionesChecks(parsed.opcionesChecks)
          if (parsed.tecnologiaChecks) setTecnologiaChecks(parsed.tecnologiaChecks)
          if (parsed.diagnosticoSubChecks) setDiagnosticoSubChecks(parsed.diagnosticoSubChecks)
          if (parsed.otrosTecnologiaText) setOtrosTecnologiaText(parsed.otrosTecnologiaText)
          if (parsed.staffList) setStaffList(parsed.staffList)
          if (parsed.locationsList) setLocationsList(parsed.locationsList)
          if (parsed.aseguradoraRazonSocial) setAseguradoraRazonSocial(parsed.aseguradoraRazonSocial)
          if (parsed.aseguradoraCuit) setAseguradoraCuit(parsed.aseguradoraCuit)
          if (parsed.aseguradoraVencimiento) setAseguradoraVencimiento(parsed.aseguradoraVencimiento)
          if (parsed.aseguradoraNoPoliza) setAseguradoraNoPoliza(parsed.aseguradoraNoPoliza)
          if (parsed.antecedentesList) setAntecedentesList(parsed.antecedentesList)
          if (parsed.cbuLoaded !== undefined) setCbuLoaded(parsed.cbuLoaded)
          if (parsed.cbuOption) setCbuOption(parsed.cbuOption)
          if (parsed.manualTitular) setManualTitular(parsed.manualTitular)
          if (parsed.manualBanco) setManualBanco(parsed.manualBanco)
          if (parsed.manualCbu) setManualCbu(parsed.manualCbu)
          if (parsed.manualAlias) setManualAlias(parsed.manualAlias)
          if (parsed.manualMoneda) setManualMoneda(parsed.manualMoneda)
        }
      }
    } catch (e) {
      console.error("Error loading draft", e)
    } finally {
      setIsRestoring(false)
    }
  }, [draftKey])

  useEffect(() => {
    if (isRestoring) return;

    try {
      const draft = {
        estadoPostulacion, hasExtension, inicioActividades, responsabilidadFiscal, ingresosBrutos,
        tipoProfesion, ambitoMatricula, numMatricula, especialidadesData, especialidadMedica, certificadoRnp,
        tipoInstitucion, disposicionAndis, conductoresList, nivelAtencion,
        tipoInstitucionNivel, opcionesChecks, tecnologiaChecks, diagnosticoSubChecks,
        otrosTecnologiaText, staffList, locationsList, aseguradoraRazonSocial,
        aseguradoraCuit, aseguradoraVencimiento, aseguradoraNoPoliza, antecedentesList,
        cbuLoaded, cbuOption, manualTitular, manualBanco, manualCbu, manualAlias, manualMoneda
      }
      localStorage.setItem(draftKey, JSON.stringify(draft))
    } catch (e) {
      console.error("Error saving draft", e)
    }
  }, [
    draftKey, estadoPostulacion, hasExtension, inicioActividades, responsabilidadFiscal, ingresosBrutos,
    tipoProfesion, ambitoMatricula, numMatricula, especialidadesData, especialidadMedica, certificadoRnp,
    tipoInstitucion, disposicionAndis, conductoresList, nivelAtencion,
    tipoInstitucionNivel, opcionesChecks, tecnologiaChecks, diagnosticoSubChecks,
    otrosTecnologiaText, staffList, locationsList, aseguradoraRazonSocial,
    aseguradoraCuit, aseguradoraVencimiento, aseguradoraNoPoliza, antecedentesList,
    cbuLoaded, cbuOption, manualTitular, manualBanco, manualCbu, manualAlias, manualMoneda,
    isRestoring
  ])
  // --- END AUTOSAVE DRAFT LOGIC ---
  const respFiscalOptions = [
    'IVA Responsable Inscripto',
    'IVA Responsable no Inscripto',
    'IVA no Responsable',
    'IVA Sujeto Exento',
    'Responsable Monotributo',
    'Sujeto no Categorizado'
  ]

  const tipoProfesionHealthOptions = [
    'Acompañante terapéutico',
    'Bioquímico',
    'Kinesiólogo',
    'Medico',
    'Nutricionistas',
    'Odontólogos',
    'Psicólogos',
    'Psicomotricidad',
    'Psicopedagogía',
    'Terapista Ocupacional'
  ]

  const tipoProfesionDisabilityOptions = [
    'DAI (docente de apoyo a la integración)',
    'Kinesiología',
    'Neurokinesiologia',
    'Transporte de pacientes bajo tratamiento cronico',
    'Fonoaudiología',
    'Profesorado en educacion especial',
    'Profesorado en Educación de Sordos',
    'Profesorado en Educación de Ciegos',
    'Psicologos',
    'Psicomotricidad',
    'Psicopedagogía',
    'Terapista Ocupacional'
  ]

  const tipoInstitucionOptions = [
    'Centro de Rehabilitación',
    'Centro de apoyo escolar',
    'Centro de día',
    'Centro Educativo Terapéutico',
    'Hogar',
    'Transporte'
  ]

  const nivelAtencionOptions = [
    'SIN NIVEL',
    'Primer Nivel de Atención (Bajo Riesgo)',
    'Segundo Nivel de Atención (Mediano Riesgo)',
    'Tercer Nivel de Atención (Alto Riesgo / Alta Complejidad)',
  ]

  const tipoInstitucionPorNivel: Record<string, string[]> = {
    'SIN NIVEL': [
      'Centro de Hemodiálisis',
      'Diagnóstico por Imágenes',
      'Geriátrico',
      'Laboratorio',
      'Centro de Salud Mental',
      'Centro de Rehabilitación',
      'Otros',
    ],
    'Primer Nivel de Atención (Bajo Riesgo)': [
      'Consultorios externos sin internación',
      'Centro Médico',
      'Centros de Atención Primaria de la Salud (CAPS)',
    ],
    'Segundo Nivel de Atención (Mediano Riesgo)': [
      'Clínica',
      'Sanatorio',
      'Hospital',
    ],
    'Tercer Nivel de Atención (Alto Riesgo / Alta Complejidad)': [
      'Clínica',
      'Sanatorio DE ALTA COMPLEJIDAD',
      'Hospital ESPECIALIZADOS',
      'Instituto de Radio imagen',
      'Centro de Terapia Radiante',
    ],
  }

  const opcionesPorNivel: Record<string, string[]> = {
    'SIN NIVEL': [
      'Atención ambulatoria',
      'Medicina general',
      'Odontología general',
      'Enfermería permanente',
      'Consultoría especializada (psicología, nutrición).',
    ],
    'Primer Nivel de Atención (Bajo Riesgo)': [
      'Atención ambulatoria',
      'Medicina general',
      'Odontología general',
      'Enfermería permanente',
      'Consultoría especializada (psicología, nutrición).',
    ],
    'Segundo Nivel de Atención (Mediano Riesgo)': [
      'Atención ambulatoria',
      'Medicina general',
      'Odontología general',
      'Enfermería permanente',
      'Consultoría especializada (psicología, nutrición).',
      'Internación simple',
      'Internación con cuidados especiales (no intensivos).',
      'Servicios clínicos y quirúrgicos básicos (Clínica Médica, Cirugía General, Pediatría, Tocoginecología).',
    ],
    'Tercer Nivel de Atención (Alto Riesgo / Alta Complejidad)': [
      'Atención ambulatoria',
      'Medicina general',
      'Odontología general',
      'Enfermería permanente',
      'Consultoría especializada (psicología, nutrición).',
      'Internación simple',
      'Internación con cuidados especiales (no intensivos).',
      'Servicios clínicos y quirúrgicos básicos (Clínica Médica, Cirugía General, Pediatría, Tocoginecología).',
      'Terapia Intensiva (UTI),(UCI),(UCO),(UTIP),(UCIP),(UCOP).',
      'Servicios de apoyo diagnóstico y terapéutico de alta especialización, docencia e Investigación.',
    ],
  }

  const tecnologiasPorNivel: Record<string, string[]> = {
    'SIN NIVEL': [
      'Laboratorio',
      'Diagnóstico por imágenes',
      'Otros (Especifique)',
    ],
    'Primer Nivel de Atención (Bajo Riesgo)': [
      'Laboratorio',
      'Diagnóstico por imágenes',
      'Otros (Especifique)',
    ],
    'Segundo Nivel de Atención (Mediano Riesgo)': [
      'Medicina Nuclear',
      'Laboratorios de alta complejidad',
      'Diagnóstico por imágenes',
      'Otros (Especifique)',
    ],
    'Tercer Nivel de Atención (Alto Riesgo / Alta Complejidad)': [
      'Medicina Nuclear',
      'Laboratorios de alta complejidad',
      'Diagnóstico por imágenes',
      'Otros (Especifique)',
    ],
  }

  const diagnosticoSubPorNivel: Record<string, string[]> = {
    'SIN NIVEL': ['RX (Radiología simple)'],
    'Primer Nivel de Atención (Bajo Riesgo)': ['RX (Radiología simple)'],
    'Segundo Nivel de Atención (Mediano Riesgo)': [
      'RX (Radiología simple)',
      'ECO (Ecografía básica)',
      'TAC (Tomografía Axial Computarizada)',
    ],
    'Tercer Nivel de Atención (Alto Riesgo / Alta Complejidad)': [
      'RX (Radiología simple)',
      'ECO (Ecografía básica)',
      'TAC (Tomografía Axial Computarizada)',
      'RMN (Resonancia Magnética Nuclear).',
      'PET (Tomografía por Emisión de Positrones)',
    ],
  }

  // Fallback arrays for rendering
  const opcionesIzquierda = opcionesPorNivel[nivelAtencion] || opcionesPorNivel['SIN NIVEL']
  const tecnologiasDerecha = tecnologiasPorNivel[nivelAtencion] || tecnologiasPorNivel['SIN NIVEL']
  const diagnosticoSubOptions = diagnosticoSubPorNivel[nivelAtencion] || diagnosticoSubPorNivel['SIN NIVEL']


  const tipoProfesionOptions = isDisabilityCategory ? tipoProfesionDisabilityOptions : tipoProfesionHealthOptions

  const ambitoMatriculaOptions = [
    'Nacional',
    'Córdoba',
    'CABA Capital Federal',
    'Provincia de Buenos Aires',
    'Salta',
    'San Luis',
    'Entre Ríos',
    'La Rioja',
    'Santiago del Estero',
    'Chaco',
    'San Juan',
    'Catamarca',
    'La Pampa',
    'Mendoza',
    'Misiones',
    'Formosa',
    'Neuquén',
    'Río Negro',
    'Santa Fe',
    'Tucumán',
    'Chubut',
    'Tierra del Fuego',
    'Corrientes',
    'Jujuy',
    'Santa Cruz'
  ]

  const locDiaOptions = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
  ]

  const validateCurrentStep = (): string[] => {
    const errors: string[] = []

    if (activeStep === 10) {
      if (!instRefes.trim()) errors.push('REFES')
      if (!instRegistroProvincial.trim()) errors.push('Registro Provincial')
      if (!instRnp.trim()) errors.push('RNP')
      if (!instResolucion.trim()) errors.push('Resolución/Disposición')
      if (!instDirectorCuit.trim()) errors.push('CUIT del Director Técnico')
      if (!instDirectorNombre.trim()) errors.push('Nombre del Director Técnico')
      if (!instDirectorMatricula.trim()) errors.push('Matrícula del Director Técnico')
      if (!instRepLegalCuit.trim()) errors.push('CUIT del Representante Legal')
      if (!instRepLegalNombre.trim()) errors.push('Nombre del Representante Legal')
      if (!instRepLegalRol.trim()) errors.push('Rol del Representante Legal')
    }

    if (activeStep === 1) {
      if (!cuit.trim()) errors.push('CUIT')
      if (!inicioActividades.trim()) errors.push('Inicio de Actividades')
      if (!responsabilidadFiscal.trim()) errors.push('Responsabilidad Fiscal')
      if (!ingresosBrutos.trim()) errors.push('Ingresos Brutos')
      if (!telAdministrativo.trim()) errors.push('Teléfono Administrativo')
      if (!emailAdministrativo.trim()) errors.push('Email Administrativo')
      if (!calle.trim()) errors.push('Calle (Domicilio Fiscal)')
      if (!puerta.trim()) errors.push('Número de puerta (Domicilio Fiscal)')
      if (!codigoPostal.trim()) errors.push('Código Postal')
      if (!localidad.trim()) errors.push('Localidad')
    }

    if (activeStep === 2) {
      if (!isInstitucionNivel && !isInstitucionDiscapacidad) {
        if (!numMatricula.trim() && !noTengoMatricula) errors.push('Número de Matrícula')
        if (tipoProfesion === 'Medico' && especialidadMedica.length > 0) {
          especialidadMedica.forEach(esp => {
            if (!(especialidadesData[esp]?.matricula || '').trim()) {
              errors.push(`Matrícula Especialidad: ${esp}`)
            }
          })
        }
        if (!tipoProfesion.trim() || tipoProfesion === 'Selecciona') errors.push('Tipo de Profesión')
      }
      if (isInstitucionDiscapacidad || isInstitucionNivel) {
        if (!numMatricula.trim() && !noTengoMatricula) errors.push('Número de Matrícula')
      }
      if (isInstitucionDiscapacidad) {
        if (!disposicionAndis.trim()) errors.push('Disposición ANDIS')
      }
      if (isInstitucionNivel) {
        if (!nivelAtencion || nivelAtencion === 'Selecciona') errors.push('Clasificación / Nivel de Atención')
      }
    }

    if (activeStep === 3) {
      // Staff is optional, no validation required
    }

    if (activeStep === 4) {
      if (locationsList.length === 0) errors.push('Debe agregar al menos un lugar de atención')
    }

    if (activeStep === 5) {
      if (!aseguradoraRazonSocial.trim()) errors.push('Razón Social de la Aseguradora')
      if (!aseguradoraCuit.trim()) errors.push('CUIT de la Aseguradora')
      if (!aseguradoraVencimiento.trim()) errors.push('Fecha de Vencimiento del Seguro')
      if (!aseguradoraNoPoliza.trim()) errors.push('Número de Póliza')
    }

    if (activeStep === 7) {
      if (cbuOption === 'cidi') {
        if (!cbuLoaded) errors.push('Debe cargar un CBU válido')
      } else {
        if (!manualBanco.trim()) errors.push('Nombre del banco')
        // We can add more required fields if needed, but the image only has * on 'Nombre del banco'
      }
    }

    return errors
  }

  const handleNextStep = () => {
    const errors = validateCurrentStep()
    if (errors.length > 0) {
      setValidationErrors(errors)
      // Scroll to top of main content
      const mainEl = document.getElementById('alta-postulante-main')
      if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setValidationErrors([])

    const nextIndex = activeStepIndex + 1
    if (nextIndex < stepPaths.length) {
      navigate('/alta/' + stepPaths[nextIndex])
    }
  }

  const handlePrevStep = () => {
    if (activeStepIndex > 0) {
      navigate('/alta/' + stepPaths[activeStepIndex - 1])
    } else {
      onGoBack()
    }
  }

  const handleAddStaffMember = () => {
    const newMember = {
      cuit: staffCuit,
      nombre: staffNombre,
      especialidad: staffEspecialidad,
      prescriptor: staffPrescriptor,
      matricula: staffMatricula
    }

    if (editingStaffIndex !== null) {
      const updated = [...staffList]
      updated[editingStaffIndex] = newMember
      setStaffList(updated)
      setEditingStaffIndex(null)
    } else {
      setStaffList([...staffList, newMember])
    }
    setShowStaffModal(false)
  }

  const handleConfirmLocation = () => {
    const locData = {
      nombre: locNombre,
      guardia: locGuardia,
      calle: locCalle,
      puerta: locPuerta,
      depto: locDepto,
      cp: locCP,
      barrio: locBarrio,
      localidad: locLocalidad,
      otros: locOtros,
      telTurnos: locTelTurnos,
      telEmergencia: locTelEmergencia,
      email: locEmail,
      horarios: locHorarios.map(h => ({ dias: h.dias, inicio: h.inicio, fin: h.fin }))
    }

    if (editingLocationIndex !== null) {
      const updated = [...locationsList]
      updated[editingLocationIndex] = locData
      setLocationsList(updated)
      setEditingLocationIndex(null)
    } else {
      setLocationsList([...locationsList, locData])
    }
    setShowLocationModal(false)
  }

  const handleConfirmDelete = () => {
    if (itemToDeleteIndex !== null && itemToDeleteType) {
      if (itemToDeleteType === 'lugar') {
        setLocationsList(locationsList.filter((_, idx) => idx !== itemToDeleteIndex))
      } else if (itemToDeleteType === 'staff') {
        setStaffList(staffList.filter((_, idx) => idx !== itemToDeleteIndex))
      } else if (itemToDeleteType === 'antecedente') {
        setAntecedentesList(antecedentesList.filter((_, idx) => idx !== itemToDeleteIndex))
      }
      setItemToDeleteIndex(null)
      setItemToDeleteType(null)
    }
    setShowDeleteConfirmModal(false)
  }

  const handleAttachFile = (docName: string) => {
    const cleanName = docName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "_")

    const simulatedName = `${cleanName}_firmado.pdf`

    setStep5AttachedFiles(prev => ({
      ...prev,
      [docName]: prev[docName] ? '' : simulatedName
    }))
  }

  const handleAttachFileStep2 = (docName: string) => {
    const cleanName = docName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "_")
    const simulatedName = `${cleanName}_firmado.pdf`
    setStep2AttachedFiles(prev => ({
      ...prev,
      [docName]: prev[docName] ? '' : simulatedName
    }))
  }

  const handleAddAntecedente = () => {
    const newAntecedente = {
      descripcion: antecedenteDescripcion || 'Médico de Guardia',
      periodoInicio: antecedentePeriodoInicio,
      periodoFin: antecedentePeriodoFin,
      establecimiento: antecedenteEstablecimiento,
      establecimientoCuit: antecedenteEstablecimientoCuit
    }

    if (editingAntecedenteIndex !== null) {
      const updated = [...antecedentesList]
      updated[editingAntecedenteIndex] = newAntecedente
      setAntecedentesList(updated)
      setEditingAntecedenteIndex(null)
    } else {
      setAntecedentesList([...antecedentesList, newAntecedente])
    }
    setShowAntecedentesModal(false)
    setAntecedenteDescripcion('')
  }



  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f4f4f4', position: 'relative' }}>
      <Header />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar2 />

        {/* Main Content Area */}
        <main id="alta-postulante-main" style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>

          {currentPath === 'revision-postulacion' || currentPath === 'revision-inscripcion' ? (
            <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}>
              <div style={{ marginBottom: '8px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: 0 }}>
                  Confirmación de Datos Declarados
                </h2>
              </div>
              <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '32px' }}>
                Por favor, verificá que toda la información ingresada sea correcta antes de finalizar esta etapa.
              </p>

              {/* Represento a Banner */}
              <div style={{ backgroundColor: '#E6F6F4', padding: '20px 24px', borderRadius: '12px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{ fontSize: '15px', color: '#065F46', margin: 0, fontWeight: 600 }}>
                  <span style={{ fontWeight: 400, marginRight: '8px' }}>Represento a:</span>
                  {cidiData?.represented || 'Camila Gonzales'} ({cuit})
                </p>
                <p style={{ fontSize: '15px', color: '#065F46', margin: 0, fontWeight: 600 }}>
                  <span style={{ fontWeight: 400, marginRight: '8px' }}>Categoría:</span>
                  {cidiData?.category || 'Profesional de la salud'}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>

                {estadoPostulacion === 'aceptado' && (
                  <>
                    {/* 1. Datos Fiscales (Full width) */}
                    <div style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', paddingBottom: '12px', marginBottom: '16px' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1F2937', margin: 0 }}>
                          1. Datos Fiscales
                        </h4>
                        <button onClick={() => navigate('/alta/datos-fiscales')} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '4px 12px', fontSize: '12px', fontWeight: 600, color: '#00AC99', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0FDF4'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                          Editar <PencilEditIcon size={12} />
                        </button>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontSize: '13.5px' }}>
                        <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>CUIT</span><strong style={{ color: '#374151' }}>{cuit}</strong></div>
                        <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>Inicio Actividades</span><strong style={{ color: '#374151' }}>{inicioActividades}</strong></div>
                        <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>Responsabilidad Fiscal</span><strong style={{ color: '#374151' }}>{responsabilidadFiscal}</strong></div>
                        <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>Ingresos Brutos</span><strong style={{ color: '#374151' }}>{ingresosBrutos}</strong></div>
                        <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>Email Administrativo</span><strong style={{ color: '#374151' }}>{emailAdministrativo}</strong></div>
                        <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>Domicilio</span><strong style={{ color: '#374151' }}>{calle} {puerta}, {localidad}</strong></div>
                      </div>
                    </div>
                  </>
                )}

                {/* Grid for remaining cards: 2 columns */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

                  {estadoPostulacion === 'borrador' && (
                    <>
                      {/* 1. Datos de la institucion (Only for Juridica) */}
                      {!isPersonaFisica && (
                        <div style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', paddingBottom: '12px', marginBottom: '16px' }}>
                            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1F2937', margin: 0 }}>
                              1. Datos de la institucion
                            </h4>
                            <button onClick={() => navigate('/alta/datos-institucion')} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '4px 12px', fontSize: '12px', fontWeight: 600, color: '#00AC99', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0FDF4'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                              Editar <PencilEditIcon size={12} />
                            </button>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', fontSize: '13.5px' }}>
                            <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>REFES</span><strong style={{ color: '#374151' }}>{instRefes}</strong></div>
                            <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>Director Técnico</span><strong style={{ color: '#374151' }}>{instDirectorNombre} ({instDirectorMatricula})</strong></div>
                            <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>Representante Legal</span><strong style={{ color: '#374151' }}>{instRepLegalNombre} ({instRepLegalRol})</strong></div>
                          </div>
                        </div>
                      )}

                      {/* 2. Datos del perfil */}
                      <div style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', paddingBottom: '12px', marginBottom: '16px' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1F2937', margin: 0 }}>
                            {estadoPostulacion === 'borrador' ? (isPersonaFisica ? '1. ' : '2. ') : '2. '}Datos del perfil
                          </h4>
                          <button onClick={() => navigate('/alta/datos-perfil')} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '4px 12px', fontSize: '12px', fontWeight: 600, color: '#00AC99', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0FDF4'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                            Editar <PencilEditIcon size={12} />
                          </button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13.5px' }}>
                          <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>Categoría</span><strong style={{ color: '#374151' }}>{cidiData?.category || 'Profesional de la salud'}</strong></div>
                          {!isInstitucionNivel && !isInstitucionDiscapacidad ? (
                            <>
                              <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>Tipo de Profesión</span><strong style={{ color: '#374151' }}>{tipoProfesion || 'Médico'}</strong></div>
                              {tipoProfesion === 'Medico' && especialidadMedica.length > 0 && (
                                <div style={{ gridColumn: '1 / -1' }}>
                                  <span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '6px' }}>Especialidades Médicas</span>
                                  {especialidadMedica.map(esp => (
                                    <div key={esp} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                                      <strong style={{ color: '#374151', fontSize: '13px' }}>{esp}</strong>
                                      <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Matricula: {especialidadesData[esp]?.matricula || '—'}</span>
                                      {especialidadesData[esp]?.constancia && <span style={{ color: '#10B981', fontSize: '12px' }}>✓ Constancia</span>}
                                    </div>
                                  ))}
                                </div>
                              )}
                              <div>
                                <span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>N° de Matrícula Profesional/Registro Provincial</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <strong style={{ color: '#374151' }}>{numMatricula}</strong>
                                  <span style={{ color: '#10B981', fontSize: '12px', fontWeight: 600 }}>✓ Constancia</span>
                                </div>
                              </div>
                            </>
                          ) : isInstitucionDiscapacidad ? (
                            <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>Disposición ANDIS</span><strong style={{ color: '#374151' }}>{disposicionAndis}</strong></div>
                          ) : (
                            <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>Nivel de Atención</span><strong style={{ color: '#374151' }}>{nivelAtencion}</strong></div>
                          )}
                        </div>
                      </div>

                      {/* 3. Staff */}
                      {!isPersonaFisica && (
                        <div style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', paddingBottom: '12px', marginBottom: '16px' }}>
                            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1F2937', margin: 0 }}>
                              3. Staff
                            </h4>
                            <button onClick={() => navigate('/alta/staff')} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '4px 12px', fontSize: '12px', fontWeight: 600, color: '#00AC99', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0FDF4'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                              Editar <PencilEditIcon size={12} />
                            </button>
                          </div>
                          <div style={{ fontSize: '13.5px' }}>
                            <span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '8px' }}>Integrantes registrados ({staffList.length})</span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '250px', overflowY: 'auto' }}>
                              {staffList.map((st, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: i < staffList.length - 1 ? '1px solid #F3F4F6' : 'none', paddingBottom: i < staffList.length - 1 ? '8px' : '0' }}>
                                  <div>
                                    <strong style={{ color: '#374151', display: 'block', fontSize: '13px' }}>{st.nombre}</strong>
                                    <span style={{ color: '#6B7280', fontSize: '12px' }}>{st.especialidad} | CUIT: {st.cuit}</span>
                                  </div>
                                  {st.prescriptor && <span style={{ color: '#00AC99', fontWeight: 600, fontSize: '11px', alignSelf: 'flex-start', backgroundColor: '#E6F6F4', padding: '2px 6px', borderRadius: '4px' }}>Prescriptor</span>}
                                </div>
                              ))}
                              {staffList.length === 0 && <span style={{ color: '#9CA3AF' }}>No hay staff cargado.</span>}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 4. Lugar de atencion */}
                      <div style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', paddingBottom: '12px', marginBottom: '16px' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1F2937', margin: 0 }}>
                            {isPersonaFisica ? '2. ' : '4. '}Lugar de atención
                          </h4>
                          <button onClick={() => navigate('/alta/lugar-atencion')} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '4px 12px', fontSize: '12px', fontWeight: 600, color: '#00AC99', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0FDF4'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                            Editar <PencilEditIcon size={12} />
                          </button>
                        </div>
                        <div style={{ fontSize: '13.5px' }}>
                          <span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '8px' }}>Lugares cargados ({locationsList.length})</span>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '250px', overflowY: 'auto' }}>
                            {locationsList.map((loc, i) => (
                              <div key={i} style={{ border: '1px solid #F3F4F6', borderRadius: '6px', padding: '10px', backgroundColor: '#F9FAFB' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 600, color: '#374151' }}>{i === 0 ? '✓ Principal: ' : ''}{loc.nombre}</p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '12px' }}>
                                  <span style={{ color: '#6B7280' }}>Localidad: <strong style={{ color: '#4B5563' }}>{loc.localidad}</strong></span>
                                  <span style={{ color: '#6B7280' }}>Dirección: <strong style={{ color: '#4B5563' }}>{loc.calle} {loc.puerta}</strong></span>
                                  <span style={{ color: '#6B7280' }}>Tel: <strong style={{ color: '#4B5563' }}>{loc.telTurnos}</strong></span>
                                  <span style={{ color: '#6B7280' }}>Email: <strong style={{ color: '#4B5563' }}>{loc.email}</strong></span>
                                </div>
                              </div>
                            ))}
                            {locationsList.length === 0 && <span style={{ color: '#9CA3AF' }}>No hay lugares cargados.</span>}
                          </div>
                        </div>
                      </div>

                      {/* Seguro y Habilitaciones (Only for Juridica in Postulacion) */}
                      {!isPersonaFisica && (
                        <div style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', paddingBottom: '12px', marginBottom: '16px' }}>
                            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1F2937', margin: 0 }}>
                              5. Seguro y Habilitaciones
                            </h4>
                            <button onClick={() => navigate('/alta/seguro-habilitaciones')} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '4px 12px', fontSize: '12px', fontWeight: 600, color: '#00AC99', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0FDF4'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                              Editar <PencilEditIcon size={12} />
                            </button>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', fontSize: '13.5px' }}>
                            <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>Aseguradora</span><strong style={{ color: '#374151' }}>{aseguradoraRazonSocial}</strong></div>
                            <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>N° Póliza</span><strong style={{ color: '#374151' }}>{aseguradoraNoPoliza}</strong></div>
                            <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>Vencimiento</span><strong style={{ color: '#374151' }}>{aseguradoraVencimiento}</strong></div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {estadoPostulacion === 'aceptado' && (
                    <>
                      {/* 2. Seguro y Habilitaciones (Only for Fisica in Inscripcion) */}
                      {isPersonaFisica && (
                        <div style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', paddingBottom: '12px', marginBottom: '16px' }}>
                            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1F2937', margin: 0 }}>
                              2. Seguros
                            </h4>
                            <button onClick={() => navigate('/alta/seguro-habilitaciones')} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '4px 12px', fontSize: '12px', fontWeight: 600, color: '#00AC99', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0FDF4'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                              Editar <PencilEditIcon size={12} />
                            </button>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13.5px' }}>
                            <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>Aseguradora</span><strong style={{ color: '#374151' }}>{aseguradoraRazonSocial || 'Declarado'}</strong></div>
                            <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>Póliza N°</span><strong style={{ color: '#374151' }}>{aseguradoraNoPoliza}</strong></div>
                            <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>Vencimiento</span><strong style={{ color: '#374151' }}>{aseguradoraVencimiento}</strong></div>
                          </div>
                        </div>
                      )}

                      {/* 3. Documentacion legal */}
                      <div style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', paddingBottom: '12px', marginBottom: '16px' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1F2937', margin: 0 }}>
                            {isPersonaFisica ? '3.' : '2.'} Documentación legal
                          </h4>
                          <button onClick={() => navigate('/alta/documentacion-legal')} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '4px 12px', fontSize: '12px', fontWeight: 600, color: '#00AC99', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0FDF4'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                            Editar <PencilEditIcon size={12} />
                          </button>
                        </div>
                        <div style={{ fontSize: '13.5px' }}>
                          <span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '8px' }}>Experiencia Profesional ({antecedentesList.length})</span>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '250px', overflowY: 'auto' }}>
                            {antecedentesList.map((ant, i) => (
                              <div key={i} style={{ borderBottom: i < antecedentesList.length - 1 ? '1px solid #F3F4F6' : 'none', paddingBottom: i < antecedentesList.length - 1 ? '8px' : '0' }}>
                                <strong style={{ color: '#374151', display: 'block', fontSize: '13px' }}>{ant.establecimiento}</strong>
                                <span style={{ color: '#6B7280', fontSize: '12px' }}>Desde {ant.periodoInicio} hasta {ant.periodoFin}</span>
                              </div>
                            ))}
                            {antecedentesList.length === 0 && <span style={{ color: '#9CA3AF' }}>No hay experiencia profesional cargados.</span>}
                          </div>
                        </div>
                      </div>

                      {/* 4. CBU */}
                      <div style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', paddingBottom: '12px', marginBottom: '16px' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1F2937', margin: 0 }}>
                            {isPersonaFisica ? '4.' : '3.'} CBU
                          </h4>
                          <button onClick={() => navigate('/alta/cbu')} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '4px 12px', fontSize: '12px', fontWeight: 600, color: '#00AC99', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0FDF4'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                            Editar <PencilEditIcon size={12} />
                          </button>
                        </div>
                        <div style={{ fontSize: '13.5px' }}>
                          {cbuOption === 'cidi' ? (
                            <>
                              <span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>Cuenta Bancaria Seleccionada</span>
                              <strong style={{ color: '#374151' }}>
                                {selectedCbuIndex === 0 ? 'Bancor - 0200925811000001234567' : 'Banco Nacion - 011059530000023456789'}
                              </strong>
                            </>
                          ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                              <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>Titular de la cuenta</span><strong style={{ color: '#374151' }}>{manualTitular || '-'}</strong></div>
                              <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>Banco</span><strong style={{ color: '#374151' }}>{manualBanco || '-'}</strong></div>
                              <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>Alias</span><strong style={{ color: '#374151' }}>{manualAlias || '-'}</strong></div>
                              <div><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>Moneda</span><strong style={{ color: '#374151' }}>{manualMoneda || '-'}</strong></div>
                              <div style={{ gridColumn: '1 / -1' }}><span style={{ color: '#6B7280', display: 'block', fontSize: '12px', marginBottom: '2px' }}>CBU</span><strong style={{ color: '#374151' }}>{manualCbu || '-'}</strong></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Disclaimer */}
              <label style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                backgroundColor: declaracionJuradaAceptada ? '#ECFDF5' : '#F9FAFB',
                border: declaracionJuradaAceptada ? '1px solid #A7F3D0' : '1px solid #E5E7EB',
                borderRadius: '8px', padding: '16px 20px', marginBottom: '24px',
                cursor: 'pointer', transition: 'all 0.2s ease'
              }}>
                <input
                  type="checkbox"
                  checked={declaracionJuradaAceptada}
                  onChange={(e) => setDeclaracionJuradaAceptada(e.target.checked)}
                  style={{
                    width: '18px', height: '18px',
                    cursor: 'pointer', accentColor: '#00AC99'
                  }}
                />
                <p style={{ fontSize: '14px', color: declaracionJuradaAceptada ? '#065F46' : '#4B5563', margin: 0, lineHeight: 1.5, userSelect: 'none' }}>
                  Declaro bajo juramento que toda la información declarada y documentación adjunta es verídica y corresponde a la actividad que voy a realizar.
                </p>
              </label>

              {/* Action Buttons for Review */}
              <div style={{
                display: 'flex', gap: '16px', justifyContent: 'flex-end',
                borderTop: '1px solid #E5E7EB', paddingTop: '24px',
              }}>
                <button
                  onClick={handlePrevStep}
                  style={{
                    padding: '12px 28px', borderRadius: '8px',
                    border: '1px solid #D1D5DB', backgroundColor: '#fff',
                    color: '#4B5563', fontSize: '14.5px', fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Volver al formulario
                </button>

                <button
                  disabled={!declaracionJuradaAceptada}
                  onClick={() => {
                    const currentDraftKey = `apross_draft_${cidiData?.cuit || 'default'}_${cidiData?.category || 'default'}`
                    localStorage.removeItem(currentDraftKey)

                    if (estadoPostulacion === 'borrador') {
                      const isHealthProfessional = cidiData?.category === 'Profesional de la salud'
                      const isSpecialProfession = tipoProfesion === 'Bioquímico' || tipoProfesion === 'Bioquimico'

                      if (isHealthProfessional && isSpecialProfession) {
                        setShowCollegeModal(true)
                      } else {
                        if (onComplete && cidiData) {
                          onComplete({
                            cuit: cuit || cidiData.cuit,
                            represented: cidiData.represented,
                            categoria: cidiData.category,
                            profesion: tipoProfesion,
                            especialidades: especialidadMedica,
                            nivelAtencion,
                            tipoInstitucionNivel,
                            tipoInstitucion
                          })
                        }
                      }
                    } else {
                      setShowSuccessModal(true)
                    }
                  }}
                  style={{
                    padding: '12px 28px', borderRadius: '8px',
                    border: 'none', fontSize: '14.5px', fontWeight: 600,
                    cursor: declaracionJuradaAceptada ? 'pointer' : 'not-allowed',
                    backgroundColor: declaracionJuradaAceptada ? '#00AC99' : '#D1D5DB',
                    color: '#fff',
                    boxShadow: declaracionJuradaAceptada ? '0 4px 6px -1px rgba(0,172,153,0.3)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Confirmar y enviar
                </button>
              </div>

            </div>
          ) : estadoPostulacion === 'en_revision' ? (
            <div style={{ maxWidth: '900px', margin: '40px auto', padding: '32px' }}>
              <div style={{ backgroundColor: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: '8px', padding: '32px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#B45309', marginBottom: '12px' }}>Postulación en Revisión</h3>
                <p style={{ color: '#92400E', marginBottom: '24px', fontSize: '15px' }}>
                  Sus datos están siendo evaluados por nuestro equipo. Se le notificará una vez aprobada la postulación para continuar con la etapa de Inscripción.
                </p>
                <button
                  onClick={() => {
                    setEstadoPostulacion('aceptado')
                    navigate('/alta/datos-fiscales')
                  }}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#F59E0B',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '14px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  (Ejemplo) Simular Aprobación
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Stepper Wizard Header */}
              <div style={{
                width: '100%', maxWidth: '1200px',
                margin: '0 auto 20px auto',
                padding: '10px 0 0 0',
              }}>
                <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1F2937', textAlign: 'center', marginBottom: '20px' }}>
                  {estadoPostulacion === 'borrador' ? 'Postulación' : 'Pre-Inscripción'}
                </h2>

                {/* Stepper bar */}
                <div style={{ display: 'flex', borderBottom: '1px solid #E5E7EB', overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
                  {activeTabs.filter(tab => !tab.path.startsWith('revision-')).map((tab) => {
                    const isActive = tab.path === currentPath
                    return (
                      <div
                        key={tab.path}
                        onClick={() => navigate('/alta/' + tab.path)}
                        style={{
                          flex: 1,
                          minWidth: '130px',
                          textAlign: 'center',
                          padding: '12px 6px',
                          borderTop: isActive ? '3px solid #00AC99' : '1px solid transparent',
                          marginTop: '-1px',
                          color: isActive ? '#00AC99' : '#6B7280',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ fontSize: '13px', fontWeight: isActive ? 700 : 500 }}>
                          {tab.name}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Validation Error Banner removed as per user request */}

              {/* Form Content Card */}
              <div style={{
                backgroundColor: '#fff', borderRadius: '8px',
                border: '1px solid #e8e8e8', padding: '28px 32px',
                width: '100%', maxWidth: '1200px',
                margin: '0 auto',
              }}>

                {activeStep === 1 ? (
                  // ── STEP 1: DATOS FISCALES ──
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>
                      Datos fiscales
                    </h3>

                    {/* Symmetrical Grid Layout */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      rowGap: '16px',
                      columnGap: '28px',
                      marginBottom: '24px',
                    }}>

                      {/* ROW 1: Col 1 (Nombre & CUIT) / Col 2 (Inicio de Actividades) */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                            Nombre / Razón Social <span style={{ color: '#EF4444' }}>*</span>
                          </label>
                          <input
                            type="text"
                            value={cidiData?.represented || ''}
                            readOnly
                            style={{
                              width: '100%', border: '1px solid #E5E7EB', borderRadius: '6px',
                              padding: '7px 12px', fontSize: '13.5px', color: '#9CA3AF',
                              backgroundColor: '#F9FAFB', outline: 'none', boxSizing: 'border-box',
                              cursor: 'not-allowed',
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                            CUIT <span style={{ color: '#EF4444' }}>*</span>
                          </label>
                          <input
                            type="text"
                            value={cuit}
                            readOnly
                            style={{
                              width: '100%', border: '1px solid #E5E7EB', borderRadius: '6px',
                              padding: '7px 12px', fontSize: '13.5px', color: '#9CA3AF',
                              backgroundColor: '#F9FAFB', outline: 'none', boxSizing: 'border-box',
                              cursor: 'not-allowed',
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                          Inicio de Actividades <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                          <input
                            type="date"
                            value={inicioActividades}
                            onChange={(e) => setInicioActividades(e.target.value)}
                            style={{
                              width: '100%', border: validationErrors.includes('Inicio de Actividades') ? '1px solid #EF4444' : '1px solid #D1D5DB', borderRadius: '6px',
                              padding: '6px 12px', fontSize: '13.5px', color: '#1F2937',
                              outline: 'none', boxSizing: 'border-box',
                              fontFamily: 'inherit',
                            }}
                          />
                        </div>
                        {validationErrors.includes('Inicio de Actividades') && (
                          <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>El inicio de actividades es requerido</p>
                        )}
                      </div>

                      {/* ROW 2: Responsabilidad Fiscal & Constancia Inscripción - ARCA */}
                      <div style={{ position: 'relative' }}>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                          Responsabilidad Fiscal <span style={{ color: '#EF4444' }}>*</span>
                        </label>

                        <div
                          onClick={() => setRespFiscalDropdownOpen(!respFiscalDropdownOpen)}
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            border: validationErrors.includes('Responsabilidad Fiscal') ? '1px solid #EF4444' : '1px solid #D1D5DB', borderRadius: '6px',
                            padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                            backgroundColor: '#fff', cursor: 'pointer', userSelect: 'none', boxSizing: 'border-box',
                          }}
                        >
                          <span>{responsabilidadFiscal}</span>
                          <ChevronDownIcon />
                        </div>

                        {respFiscalDropdownOpen && (
                          <div style={{
                            position: 'absolute', top: '100%', left: 0, right: 0,
                            marginTop: '4px', backgroundColor: '#fff', border: '1px solid #D1D5DB',
                            borderRadius: '6px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                            zIndex: 1010, maxHeight: '200px', overflowY: 'auto',
                          }}>
                            {respFiscalOptions.map((opt) => (
                              <div
                                key={opt}
                                onClick={() => {
                                  setResponsabilidadFiscal(opt)
                                  setRespFiscalDropdownOpen(false)
                                }}
                                style={{
                                  padding: '8px 12px', fontSize: '13px', cursor: 'pointer',
                                  backgroundColor: responsabilidadFiscal === opt ? '#00AC99' : '#fff',
                                  color: responsabilidadFiscal === opt ? '#fff' : '#1F2937',
                                }}
                              >
                                {opt}
                              </div>
                            ))}
                          </div>
                        )}
                        {validationErrors.includes('Responsabilidad Fiscal') && (
                          <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>La responsabilidad fiscal es requerida</p>
                        )}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <AttachmentRow
                          title="Constancia Inscripción - ARCA"
                          onAttach={() => { }}
                        />
                      </div>

                      {/* ROW 3: Nº Ingresos Brutos & Constancia de Ingresos Brutos (IIBB) */}
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                          Nº Ingresos Brutos <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                          type="text"
                          value={ingresosBrutos}
                          onChange={(e) => setIngresosBrutos(e.target.value)}
                          style={{
                            width: '100%', border: validationErrors.includes('Ingresos Brutos') ? '1px solid #EF4444' : '1px solid #D1D5DB', borderRadius: '6px',
                            padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                            outline: 'none', boxSizing: 'border-box',
                          }}
                        />
                        {validationErrors.includes('Ingresos Brutos') && (
                          <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>El Nº de ingresos brutos es requerido</p>
                        )}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <AttachmentRow
                          title="Constancia de Ingresos Brutos (IIBB)"
                          onAttach={() => { }}
                        />
                      </div>

                      {/* ROW 4: Poseo extension IIBB & Certificado Extension */}
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '8px' }}>
                          Poseo extension IIBB
                        </label>

                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', height: '36px' }}>
                          <div
                            onClick={() => setHasExtension(true)}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', userSelect: 'none' }}
                          >
                            <div style={{
                              width: '16px', height: '16px', borderRadius: '3px',
                              border: hasExtension ? '2px solid #00AC99' : '2px solid #bbb',
                              backgroundColor: hasExtension ? '#00AC99' : '#fff',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              {hasExtension && <CheckIcon />}
                            </div>
                            <span style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>Sí</span>
                          </div>

                          <div
                            onClick={() => setHasExtension(false)}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', userSelect: 'none' }}
                          >
                            <div style={{
                              width: '16px', height: '16px', borderRadius: '3px',
                              border: !hasExtension ? '2px solid #00AC99' : '2px solid #bbb',
                              backgroundColor: !hasExtension ? '#00AC99' : '#fff',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              {!hasExtension && <CheckIcon />}
                            </div>
                            <span style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>No</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        {hasExtension ? (
                          <AttachmentRow
                            title="Certificado Extension"
                            onAttach={() => { }}
                          />
                        ) : (
                          <div style={{ minHeight: '38px' }} />
                        )}
                      </div>

                      {/* ROW 5: Teléfono Administrativo & E-Mail Administrativo */}
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                          Teléfono Administrativo <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                          type="text"
                          value={telAdministrativo}
                          onChange={(e) => setTelAdministrativo(e.target.value)}
                          style={{
                            width: '100%', border: validationErrors.includes('Teléfono Administrativo') ? '1px solid #EF4444' : '1px solid #D1D5DB', borderRadius: '6px',
                            padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                            outline: 'none', boxSizing: 'border-box',
                          }}
                        />
                        {validationErrors.includes('Teléfono Administrativo') && (
                          <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>El teléfono administrativo es requerido</p>
                        )}
                      </div>

                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                          E-Mail Administrativo <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                          type="text"
                          value={emailAdministrativo}
                          onChange={(e) => setEmailAdministrativo(e.target.value)}
                          style={{
                            width: '100%', border: validationErrors.includes('Email Administrativo') ? '1px solid #EF4444' : '1px solid #D1D5DB', borderRadius: '6px',
                            padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                            outline: 'none', boxSizing: 'border-box',
                          }}
                        />
                        {validationErrors.includes('Email Administrativo') && (
                          <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>El e-mail administrativo es requerido</p>
                        )}
                      </div>

                    </div>

                    {/* Divider */}
                    <hr style={{ border: 'none', borderTop: '1px solid #ebebeb', marginBottom: '24px' }} />

                    {/* ── DOMICILIO FISCAL ── */}
                    <SectionTitle>Domicilio Fiscal</SectionTitle>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr 1fr 1fr',
                      gap: '16px', marginBottom: '16px',
                    }}>
                      {/* Calle */}
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 500, color: '#666', display: 'block', marginBottom: '5px' }}>
                          Calle <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                          type="text"
                          value={calle}
                          onChange={(e) => setCalle(e.target.value)}
                          style={{
                            width: '100%', border: validationErrors.includes('Calle (Domicilio Fiscal)') ? '1px solid #EF4444' : '1px solid #D1D5DB', borderRadius: '6px',
                            padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                            outline: 'none', boxSizing: 'border-box',
                          }}
                        />
                        {validationErrors.includes('Calle (Domicilio Fiscal)') && (
                          <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>La calle es requerida</p>
                        )}
                      </div>

                      {/* Numero */}
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 500, color: '#666', display: 'block', marginBottom: '5px' }}>
                          Nº (puerta) <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                          type="text"
                          value={puerta}
                          onChange={(e) => setPuerta(e.target.value)}
                          style={{
                            width: '100%', border: validationErrors.includes('Número de puerta (Domicilio Fiscal)') ? '1px solid #EF4444' : '1px solid #D1D5DB', borderRadius: '6px',
                            padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                            outline: 'none', boxSizing: 'border-box',
                          }}
                        />
                        {validationErrors.includes('Número de puerta (Domicilio Fiscal)') && (
                          <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>El número es requerido</p>
                        )}
                      </div>

                      {/* Apartamento */}
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 500, color: '#666', display: 'block', marginBottom: '5px' }}>
                          Apartamento
                        </label>
                        <input
                          type="text"
                          value={apartamento}
                          onChange={(e) => setApartamento(e.target.value)}
                          style={{
                            width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                            padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                            outline: 'none', boxSizing: 'border-box',
                          }}
                        />
                      </div>

                      {/* CP */}
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 500, color: '#666', display: 'block', marginBottom: '5px' }}>
                          Código Postal <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                          type="text"
                          value={codigoPostal}
                          onChange={(e) => setCodigoPostal(e.target.value)}
                          style={{
                            width: '100%', border: validationErrors.includes('Código Postal') ? '1px solid #EF4444' : '1px solid #D1D5DB', borderRadius: '6px',
                            padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                            outline: 'none', boxSizing: 'border-box',
                          }}
                        />
                        {validationErrors.includes('Código Postal') && (
                          <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>El CP es requerido</p>
                        )}
                      </div>
                    </div>

                    <div style={{
                      display: 'grid', gridTemplateColumns: '1fr 1fr',
                      gap: '16px', marginBottom: '16px',
                    }}>
                      {/* Barrio */}
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 500, color: '#666', display: 'block', marginBottom: '5px' }}>
                          Barrio <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                          type="text"
                          value={barrio}
                          onChange={(e) => setBarrio(e.target.value)}
                          style={{
                            width: '100%', border: validationErrors.includes('Barrio') ? '1px solid #EF4444' : '1px solid #D1D5DB', borderRadius: '6px',
                            padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                            outline: 'none', boxSizing: 'border-box',
                          }}
                        />
                        {validationErrors.includes('Barrio') && (
                          <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>El barrio es requerido</p>
                        )}
                      </div>

                      {/* Localidad */}
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 500, color: '#666', display: 'block', marginBottom: '5px' }}>
                          Localidad <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                          type="text"
                          value={localidad}
                          onChange={(e) => setLocalidad(e.target.value)}
                          style={{
                            width: '100%', border: validationErrors.includes('Localidad') ? '1px solid #EF4444' : '1px solid #D1D5DB', borderRadius: '6px',
                            padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                            outline: 'none', boxSizing: 'border-box',
                          }}
                        />
                        {validationErrors.includes('Localidad') && (
                          <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>La localidad es requerida</p>
                        )}
                      </div>
                    </div>

                    <div style={{ marginBottom: '28px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 500, color: '#666', display: 'block', marginBottom: '5px' }}>
                        Otros Datos
                      </label>
                      <input
                        type="text"
                        value={otrosDatos}
                        onChange={(e) => setOtrosDatos(e.target.value)}
                        style={{
                          width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                          padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                          outline: 'none', boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>
                ) : activeStep === 10 ? (
                  // ── STEP 10: DATOS DE LA INSTITUCION ──
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>
                      Datos de la institucion
                    </h3>

                    {/* ── IDENTIFICADORES DEL ESTABLECIMIENTO ── */}
                    <SectionTitle>IDENTIFICADORES DEL ESTABLECIMIENTO <span style={{ color: '#EF4444' }}>*</span></SectionTitle>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                      <div>
                        <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>REFES</label>
                        <input type="text" value={instRefes} onChange={(e) => setInstRefes(e.target.value)} style={{ width: '100%', border: '1px solid #dcdcdc', borderRadius: '6px', padding: '9px 12px', fontSize: '14px', boxSizing: 'border-box' }} />
                        {validationErrors.includes('REFES') && <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>Requerido</p>}
                      </div>
                      <div>
                        <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>Registro Provincial</label>
                        <input type="text" value={instRegistroProvincial} onChange={(e) => setInstRegistroProvincial(e.target.value)} style={{ width: '100%', border: '1px solid #dcdcdc', borderRadius: '6px', padding: '9px 12px', fontSize: '14px', boxSizing: 'border-box' }} />
                        {validationErrors.includes('Registro Provincial') && <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>Requerido</p>}
                      </div>
                      <div>
                        <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>RNP</label>
                        <input type="text" value={instRnp} onChange={(e) => setInstRnp(e.target.value)} style={{ width: '100%', border: '1px solid #dcdcdc', borderRadius: '6px', padding: '9px 12px', fontSize: '14px', boxSizing: 'border-box' }} />
                        {validationErrors.includes('RNP') && <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>Requerido</p>}
                      </div>
                      <div>
                        <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>Resolucion/Disposición</label>
                        <input type="text" value={instResolucion} onChange={(e) => setInstResolucion(e.target.value)} style={{ width: '100%', border: '1px solid #dcdcdc', borderRadius: '6px', padding: '9px 12px', fontSize: '14px', boxSizing: 'border-box' }} />
                        {validationErrors.includes('Resolución/Disposición') && <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>Requerido</p>}
                      </div>
                    </div>

                    {/* ── DATOS DEL DIRECTOR TECNICO/MEDICO ── */}
                    <SectionTitle>DATOS DEL DIRECTOR TECNICO/MEDICO <span style={{ color: '#EF4444' }}>*</span></SectionTitle>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                      <div>
                        <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>CUIT/CUIL</label>
                        <input type="text" value={instDirectorCuit} onChange={(e) => setInstDirectorCuit(e.target.value)} style={{ width: '100%', border: '1px solid #dcdcdc', borderRadius: '6px', padding: '9px 12px', fontSize: '14px', boxSizing: 'border-box' }} />
                        {validationErrors.includes('CUIT del Director Técnico') && <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>Requerido</p>}
                      </div>
                      <div>
                        <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>Nombre y Apellido</label>
                        <input type="text" value={instDirectorNombre} onChange={(e) => setInstDirectorNombre(e.target.value)} style={{ width: '100%', border: '1px solid #dcdcdc', borderRadius: '6px', padding: '9px 12px', fontSize: '14px', boxSizing: 'border-box' }} />
                        {validationErrors.includes('Nombre del Director Técnico') && <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>Requerido</p>}
                      </div>
                      <div>
                        <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>Numero de matricula profesional</label>
                        <input type="text" value={instDirectorMatricula} onChange={(e) => setInstDirectorMatricula(e.target.value)} style={{ width: '100%', border: '1px solid #dcdcdc', borderRadius: '6px', padding: '9px 12px', fontSize: '14px', boxSizing: 'border-box' }} />
                        {validationErrors.includes('Matrícula del Director Técnico') && <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>Requerido</p>}
                      </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <AttachmentRow
                        title="Certificado MP director técnico"
                        fileName={null}
                        onAttach={() => { }}
                      />
                    </div>

                    {/* ── DATOS DEL REPRESENTANTE LEGAL ── */}
                    <SectionTitle>DATOS DEL REPRESANTE LEGAL <span style={{ color: '#EF4444' }}>*</span></SectionTitle>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>CUIT/CUIL</label>
                        <input type="text" value={instRepLegalCuit} onChange={(e) => setInstRepLegalCuit(e.target.value)} style={{ width: '100%', border: '1px solid #dcdcdc', borderRadius: '6px', padding: '9px 12px', fontSize: '14px', boxSizing: 'border-box' }} />
                        {validationErrors.includes('CUIT del Representante Legal') && <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>Requerido</p>}
                      </div>
                      <div>
                        <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>Nombre y Apellido</label>
                        <input type="text" value={instRepLegalNombre} onChange={(e) => setInstRepLegalNombre(e.target.value)} style={{ width: '100%', border: '1px solid #dcdcdc', borderRadius: '6px', padding: '9px 12px', fontSize: '14px', boxSizing: 'border-box' }} />
                        {validationErrors.includes('Nombre del Representante Legal') && <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>Requerido</p>}
                      </div>
                      <div>
                        <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>Rol</label>
                        <input type="text" value={instRepLegalRol} onChange={(e) => setInstRepLegalRol(e.target.value)} style={{ width: '100%', border: '1px solid #dcdcdc', borderRadius: '6px', padding: '9px 12px', fontSize: '14px', boxSizing: 'border-box' }} />
                        {validationErrors.includes('Rol del Representante Legal') && <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>Requerido</p>}
                      </div>
                    </div>
                  </div>
                ) : activeStep === 2 ? (
                  // ── STEP 2: DATOS DEL PERFIL ──
                  isInstitucionDiscapacidad ? (
                    // ── STEP 2: INSTITUCION DISCAPACIDAD ──
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>
                        Datos del perfil
                      </h3>

                      <SectionTitle>TIPO DE INSTITUCION</SectionTitle>

                      {/* Tipo de Institución dropdown */}
                      <div style={{ position: 'relative', marginBottom: '20px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                          Tipo de Institucion <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <div
                          onClick={() => setTipoInstitucionDropdownOpen(!tipoInstitucionDropdownOpen)}
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            border: '1px solid #D1D5DB', borderRadius: '6px',
                            padding: '9px 12px', fontSize: '13.5px', color: '#1F2937',
                            backgroundColor: '#fff', cursor: 'pointer', userSelect: 'none', boxSizing: 'border-box',
                          }}
                        >
                          <span>{tipoInstitucion}</span>
                          <ChevronDownIcon />
                        </div>
                        {tipoInstitucionDropdownOpen && (
                          <div style={{
                            position: 'absolute', top: '100%', left: 0, right: 0,
                            marginTop: '4px', backgroundColor: '#fff', border: '1px solid #D1D5DB',
                            borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            zIndex: 1010, maxHeight: '220px', overflowY: 'auto',
                          }}>
                            {tipoInstitucionOptions.map((opt) => (
                              <div
                                key={opt}
                                onClick={() => { setTipoInstitucion(opt); setTipoInstitucionDropdownOpen(false) }}
                                style={{
                                  padding: '9px 12px', fontSize: '13px', cursor: 'pointer',
                                  backgroundColor: tipoInstitucion === opt ? '#00AC99' : '#fff',
                                  color: tipoInstitucion === opt ? '#fff' : '#1F2937',
                                }}
                              >{opt}</div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Transporte-specific section */}
                      {tipoInstitucion === 'Transporte' && (
                        <div style={{ marginBottom: '20px' }}>
                          {/* Documentación del transporte */}
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '8px' }}>
                            Documentación del transporte <span style={{ color: '#EF4444' }}>*</span>
                          </label>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                            {['Cédula Verde / Título del vehículo', 'Licencia de conducir'].map((docName) => (
                              <AttachmentRow
                                key={docName}
                                title={docName}
                                fileName="Matricula5.pdf"
                                onAttach={() => { }}
                              />
                            ))}
                          </div>

                          {/* Listado de conductores */}
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '8px' }}>
                            Listado de conductores autorizados
                          </label>
                          <div style={{ border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden', marginBottom: '4px' }}>
                            {conductoresList.map((c, idx) => (
                              <div key={idx} style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '12px 16px', borderBottom: idx < conductoresList.length - 1 ? '1px solid #F3F4F6' : 'none',
                                backgroundColor: '#fff',
                              }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#E6F6F4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <PersonIcon />
                                  </div>
                                  <div>
                                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>{c.nombre}</p>
                                    <p style={{ fontSize: '12px', color: '#6B7280', margin: '2px 0 0 0' }}>
                                      CUIT/CUIL: {c.cuit} &nbsp; Licencia de conducir: {c.licenciaConducir ? 'Si' : 'No'} &nbsp; Autorizacion de manejo: {c.autorizacionManejo ? 'Si' : 'No'}
                                    </p>
                                  </div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  <button style={{ padding: '6px 8px', border: '1px solid #D1D5DB', borderRadius: '6px', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                    <PencilEditIcon />
                                  </button>
                                  <button
                                    onClick={() => setConductoresList(conductoresList.filter((_, i) => i !== idx))}
                                    style={{ padding: '6px 8px', border: '1px solid #FCA5A5', borderRadius: '6px', backgroundColor: '#FFF5F5', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#EF4444' }}
                                  >
                                    <TrashIcon />
                                  </button>
                                </div>
                              </div>
                            ))}
                            {/* Agregar conductor */}
                            <div
                              onClick={() => { setConductorNombre('Juan'); setConductorApellido('Pérez'); setConductorCuit('20-30405060-7'); setConductorCargo('Chofer principal'); setShowConductorModal(true) }}
                              style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '12px 16px', cursor: 'pointer', color: '#00AC99',
                                borderTop: conductoresList.length > 0 ? '1px solid #F3F4F6' : 'none',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '18px', fontWeight: 300 }}>+</span>
                                <span style={{ fontSize: '13px', fontWeight: 600 }}>Agregar conductor autorizado</span>
                              </div>
                              <ChevronDownIcon />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Disposición ANDIS */}
                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                          Disposición de Categorización (ANDIS) <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                          type="text"
                          value={disposicionAndis}
                          onChange={(e) => setDisposicionAndis(e.target.value)}
                          style={{ width: '100%', border: validationErrors.includes('Disposición ANDIS') ? '1px solid #EF4444' : '1px solid #D1D5DB', borderRadius: '6px', padding: '9px 12px', fontSize: '13.5px', color: '#1F2937', outline: 'none', boxSizing: 'border-box' }}
                        />
                        {validationErrors.includes('Disposición ANDIS') && (
                          <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>La disposición ANDIS es requerida</p>
                        )}
                      </div>

                      {/* RNP Section */}
                      <hr style={{ border: 'none', borderTop: '1px solid #ebebeb', margin: '4px 0 20px 0' }} />
                      <SectionTitle>REGISTRO NACIONAL DE PRESTADORES DE DISCAPACIDAD</SectionTitle>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                            Certificado de RNP <span style={{ color: '#EF4444' }}>*</span>
                          </label>
                          <input
                            type="text"
                            value={certificadoRnp}
                            onChange={(e) => setCertificadoRnp(e.target.value)}
                            style={{ width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px', padding: '9px 12px', fontSize: '13.5px', color: '#1F2937', outline: 'none', boxSizing: 'border-box' }}
                          />
                        </div>
                        <div>
                          <AttachmentRow
                            title="Constancia de inscripción vigente"
                            required={true}
                            fileName="Constancia.pdf"
                            onAttach={() => { }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : isInstitucionNivel ? (
                    // ── STEP 2: INSTITUCION NIVEL ──
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>
                        Datos del perfil
                      </h3>

                      {/* Nivel de atención dropdown */}
                      <div style={{ position: 'relative', marginBottom: '20px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                          Clasifique su nivel de atencion en salud <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <div
                          onClick={() => setNivelAtencionOpen(!nivelAtencionOpen)}
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            border: validationErrors.includes('Clasificación / Nivel de Atención') ? '1px solid #EF4444' : '1px solid #D1D5DB', borderRadius: '6px',
                            padding: '9px 12px', fontSize: '13.5px', color: '#1F2937',
                            backgroundColor: '#fff', cursor: 'pointer', userSelect: 'none', boxSizing: 'border-box',
                          }}
                        >
                          <span>{nivelAtencion}</span>
                          <ChevronDownIcon />
                        </div>
                        {nivelAtencionOpen && (
                          <div style={{
                            position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px',
                            backgroundColor: '#fff', border: '1px solid #D1D5DB', borderRadius: '6px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)', zIndex: 1010,
                          }}>
                            {nivelAtencionOptions.map((opt) => (
                              <div
                                key={opt}
                                onClick={() => {
                                  setNivelAtencion(opt)
                                  setNivelAtencionOpen(false)
                                  setTipoInstitucionNivel('')
                                }}
                                style={{
                                  padding: '10px 12px', fontSize: '13.5px', cursor: 'pointer',
                                  backgroundColor: nivelAtencion === opt ? '#00AC99' : '#fff',
                                  color: nivelAtencion === opt ? '#fff' : '#1F2937',
                                }}
                              >{opt}</div>
                            ))}
                          </div>
                        )}
                        {validationErrors.includes('Clasificación / Nivel de Atención') && (
                          <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>El nivel de atención es requerido</p>
                        )}
                      </div>

                      {/* Tipo Institución + checkboxes — shown when a nivel is selected */}
                      {nivelAtencion !== 'Selecciona' && (
                        <>
                          <SectionTitle>TIPO DE INSTITUCION</SectionTitle>

                          {/* Tipo de Institución dropdown */}
                          <div style={{ position: 'relative', marginBottom: '24px' }}>
                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                              Seleccioná la Institución <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <div
                              onClick={() => setTipoInstitucionNivelOpen(!tipoInstitucionNivelOpen)}
                              style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                border: '1px solid #D1D5DB', borderRadius: '6px',
                                padding: '9px 12px', fontSize: '13.5px', color: tipoInstitucionNivel ? '#1F2937' : '#9CA3AF',
                                backgroundColor: '#fff', cursor: 'pointer', userSelect: 'none', boxSizing: 'border-box',
                              }}
                            >
                              <span>{tipoInstitucionNivel || 'Centro de Hemodiálisis'}</span>
                              <ChevronDownIcon />
                            </div>
                            {tipoInstitucionNivelOpen && (
                              <div style={{
                                position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px',
                                backgroundColor: '#fff', border: '1px solid #D1D5DB', borderRadius: '6px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)', zIndex: 1010, maxHeight: '220px', overflowY: 'auto',
                              }}>
                                {(tipoInstitucionPorNivel[nivelAtencion] || []).map((opt) => (
                                  <div
                                    key={opt}
                                    onClick={() => { setTipoInstitucionNivel(opt); setTipoInstitucionNivelOpen(false) }}
                                    style={{
                                      padding: '9px 12px', fontSize: '13px', cursor: 'pointer',
                                      backgroundColor: tipoInstitucionNivel === opt ? '#00AC99' : '#fff',
                                      color: tipoInstitucionNivel === opt ? '#fff' : '#1F2937',
                                    }}
                                  >{opt}</div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Two-column checkboxes */}
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '16px' }}>
                            {/* Left: MARQUE LAS OPCIONES */}
                            <div>
                              <label style={{ fontSize: '11px', fontWeight: 700, color: '#374151', display: 'block', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>
                                MARQUE LAS OPCIONES <span style={{ color: '#EF4444' }}>*</span>
                              </label>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {opcionesIzquierda.map((opt) => (
                                  <div
                                    key={opt}
                                    onClick={() => setOpcionesChecks(prev => ({ ...prev, [opt]: !prev[opt] }))}
                                    style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}
                                  >
                                    <div style={{
                                      width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0,
                                      border: opcionesChecks[opt] ? '2px solid #00AC99' : '1.5px solid #D1D5DB',
                                      backgroundColor: opcionesChecks[opt] ? '#00AC99' : '#fff',
                                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                      {opcionesChecks[opt] && <CheckIcon />}
                                    </div>
                                    <span style={{ fontSize: '13px', color: '#374151' }}>{opt}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Right: INDIQUE LA TECNOLOGÍA QUE POSEE */}
                            <div>
                              <label style={{ fontSize: '11px', fontWeight: 700, color: '#374151', display: 'block', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>
                                INDIQUE LA TECNOLOGÍA QUE POSEE <span style={{ color: '#EF4444' }}>*</span>
                              </label>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {tecnologiasDerecha.map((opt) => (
                                  <div key={opt}>
                                    <div
                                      onClick={() => setTecnologiaChecks(prev => ({ ...prev, [opt]: !prev[opt] }))}
                                      style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}
                                    >
                                      <div style={{
                                        width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0,
                                        border: tecnologiaChecks[opt] ? '2px solid #00AC99' : '1.5px solid #D1D5DB',
                                        backgroundColor: tecnologiaChecks[opt] ? '#00AC99' : '#fff',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                      }}>
                                        {tecnologiaChecks[opt] && <CheckIcon />}
                                      </div>
                                      <span style={{ fontSize: '13px', color: '#374151' }}>{opt}</span>
                                    </div>

                                    {/* Sub-checkbox for Diagnóstico por imágenes */}
                                    {opt === 'Diagnóstico por imágenes' && tecnologiaChecks[opt] && (
                                      <div style={{ paddingLeft: '26px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {diagnosticoSubOptions.map((sub) => (
                                          <div
                                            key={sub}
                                            onClick={() => setDiagnosticoSubChecks(prev => ({ ...prev, [sub]: !prev[sub] }))}
                                            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}
                                          >
                                            <div style={{
                                              width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0,
                                              border: diagnosticoSubChecks[sub] ? '2px solid #00AC99' : '1.5px solid #D1D5DB',
                                              backgroundColor: diagnosticoSubChecks[sub] ? '#00AC99' : '#fff',
                                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}>
                                              {diagnosticoSubChecks[sub] && <CheckIcon />}
                                            </div>
                                            <span style={{ fontSize: '12.5px', color: '#374151' }}>{sub}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {/* Text input for Otros */}
                                    {opt === 'Otros (Especifique)' && tecnologiaChecks[opt] && (
                                      <div style={{ paddingLeft: '26px', marginTop: '8px' }}>
                                        <input
                                          type="text"
                                          value={otrosTecnologiaText}
                                          onChange={(e) => setOtrosTecnologiaText(e.target.value)}
                                          placeholder="Especifique otras tecnologías..."
                                          style={{
                                            width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                                            padding: '7px 10px', fontSize: '13px', color: '#1F2937',
                                            outline: 'none', boxSizing: 'border-box',
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>
                        Datos del perfil
                      </h3>

                      <SectionTitle>Matricula</SectionTitle>

                      {/* Symmetrical Grid Layout */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        rowGap: '16px',
                        columnGap: '28px',
                        marginBottom: '28px',
                      }}>

                        {/* Field 1: Tipo profesión */}
                        <div style={{ position: 'relative' }}>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                            Tipo profesion <span style={{ color: '#EF4444' }}>*</span>
                          </label>
                          <div
                            onClick={() => {
                              setTipoProfesionDropdownOpen(!tipoProfesionDropdownOpen)
                              setAmbitoMatriculaDropdownOpen(false)
                              setEspecialidadDropdownOpen(false)
                            }}
                            style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              border: validationErrors.includes('Tipo de Profesión') ? '1px solid #EF4444' : '1px solid #D1D5DB', borderRadius: '6px',
                              padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                              backgroundColor: '#fff', cursor: 'pointer', userSelect: 'none', boxSizing: 'border-box',
                            }}
                          >
                            <span>{tipoProfesion}</span>
                            <ChevronDownIcon />
                          </div>

                          {tipoProfesionDropdownOpen && (
                            <div style={{
                              position: 'absolute', top: '100%', left: 0, right: 0,
                              marginTop: '4px', backgroundColor: '#fff', border: '1px solid #D1D5DB',
                              borderRadius: '6px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                              zIndex: 1010, maxHeight: '200px', overflowY: 'auto',
                            }}>
                              {tipoProfesionOptions.map((opt) => (
                                <div
                                  key={opt}
                                  onClick={() => {
                                    setTipoProfesion(opt)
                                    setTipoProfesionDropdownOpen(false)
                                  }}
                                  style={{
                                    padding: '8px 12px', fontSize: '13px', cursor: 'pointer',
                                    backgroundColor: tipoProfesion === opt ? '#00AC99' : '#fff',
                                    color: tipoProfesion === opt ? '#fff' : '#1F2937',
                                  }}
                                >
                                  {opt}
                                </div>
                              ))}
                            </div>
                          )}
                          {validationErrors.includes('Tipo de Profesión') && (
                            <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>El tipo de profesión es requerido</p>
                          )}
                        </div>

                        {/* Field 2: Condicional Especialidad Médica if 'Medico' OR Ámbito de la Matrícula */}
                        {tipoProfesion === 'Medico' ? (
                          <div style={{ position: 'relative' }}>
                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                              Seleccioná tu especialidad médica <span style={{ color: '#EF4444' }}>*</span>
                            </label>

                            {/* Tags of selected specialties */}
                            {especialidadMedica.length > 0 && (
                              <div style={{
                                display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px',
                              }}>
                                {especialidadMedica.map(esp => (
                                  <span
                                    key={esp}
                                    style={{
                                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                                      backgroundColor: '#E6F6F4', color: '#00AC99',
                                      border: '1px solid #A7E8E1', borderRadius: '20px',
                                      padding: '3px 10px', fontSize: '12px', fontWeight: 600,
                                    }}
                                  >
                                    {esp}
                                    <span
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setEspecialidadMedica(especialidadMedica.filter(d => d !== esp))
                                      }}
                                      style={{
                                        cursor: 'pointer', color: '#00AC99', fontWeight: 700,
                                        lineHeight: 1, fontSize: '14px', display: 'flex', alignItems: 'center',
                                      }}
                                    >×</span>
                                  </span>
                                ))}
                              </div>
                            )}

                            <div
                              onClick={() => {
                                setEspecialidadDropdownOpen(true)
                                setTipoProfesionDropdownOpen(false)
                                setAmbitoMatriculaDropdownOpen(false)
                              }}
                              style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                border: '1px solid #D1D5DB', borderRadius: '6px',
                                padding: '7px 12px', fontSize: '13.5px',
                                backgroundColor: '#fff', cursor: 'text', boxSizing: 'border-box',
                              }}
                            >
                              <input
                                type="text"
                                value={especialidadSearch}
                                onChange={e => {
                                  setEspecialidadSearch(e.target.value)
                                  if (!especialidadDropdownOpen) setEspecialidadDropdownOpen(true)
                                }}
                                onFocus={() => setEspecialidadDropdownOpen(true)}
                                placeholder={especialidadMedica.length > 0 ? "Buscar más especialidades..." : "Buscar y seleccionar..."}
                                style={{
                                  width: '100%', border: 'none', outline: 'none',
                                  fontSize: '13.5px', color: '#1F2937', backgroundColor: 'transparent',
                                }}
                              />
                              <span onClick={(e) => {
                                e.stopPropagation();
                                setEspecialidadDropdownOpen(!especialidadDropdownOpen);
                                if (especialidadDropdownOpen) setEspecialidadSearch('');
                              }} style={{ cursor: 'pointer', display: 'flex' }}>
                                <ChevronDownIcon />
                              </span>
                            </div>

                            {especialidadDropdownOpen && (
                              <div style={{
                                position: 'absolute', top: '100%', left: 0, right: 0,
                                marginTop: '4px', backgroundColor: '#fff', border: '1px solid #D1D5DB',
                                borderRadius: '6px', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                                zIndex: 1010,
                              }}>
                                {/* Search box removed - now using the main input */}
                                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                  {especialidadesMedicas
                                    .filter(opt => {
                                      if (especialidadSearch.trim() === '') return true
                                      if (opt.isHeader) return false
                                      return opt.label.toLowerCase().includes(especialidadSearch.toLowerCase())
                                    })
                                    .map((opt, index) => {
                                      if (opt.isHeader) {
                                        return (
                                          <div
                                            key={index}
                                            style={{
                                              padding: '6px 12px', fontSize: '11px', fontWeight: 'bold',
                                              color: '#9CA3AF', backgroundColor: '#F3F4F6', cursor: 'default',
                                              borderTop: index > 0 ? '1px solid #E5E7EB' : 'none',
                                              borderBottom: '1px solid #E5E7EB',
                                              userSelect: 'none',
                                            }}
                                          >
                                            {opt.label}
                                          </div>
                                        )
                                      }
                                      return (
                                        <div
                                          key={index}
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            if (especialidadMedica.includes(opt.label)) {
                                              setEspecialidadMedica(especialidadMedica.filter(d => d !== opt.label))
                                            } else {
                                              setEspecialidadMedica([...especialidadMedica, opt.label])
                                            }
                                          }}
                                          style={{
                                            padding: '8px 12px 8px 20px', fontSize: '13px', cursor: 'pointer',
                                            backgroundColor: especialidadMedica.includes(opt.label) ? '#E6F6F4' : '#fff',
                                            color: especialidadMedica.includes(opt.label) ? '#00AC99' : '#1F2937',
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            fontWeight: especialidadMedica.includes(opt.label) ? 600 : 400
                                          }}
                                        >
                                          {opt.label}
                                          {especialidadMedica.includes(opt.label) && (
                                            <CheckIcon />
                                          )}
                                        </div>
                                      )
                                    })}
                                  {especialidadesMedicas.filter(o => !o.isHeader && o.label.toLowerCase().includes(especialidadSearch.toLowerCase())).length === 0 && especialidadSearch.trim() !== '' && (
                                    <div style={{ padding: '12px', fontSize: '13px', color: '#9CA3AF', textAlign: 'center' }}>Sin resultados para "{especialidadSearch}"</div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          /* If not Medico, Ámbito de la Matrícula goes here */
                          <div style={{ position: 'relative' }}>
                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                              Ámbito de la Matrícula <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <div
                              onClick={() => {
                                setAmbitoMatriculaDropdownOpen(!ambitoMatriculaDropdownOpen)
                                setTipoProfesionDropdownOpen(false)
                                setEspecialidadDropdownOpen(false)
                              }}
                              style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                border: '1px solid #D1D5DB', borderRadius: '6px',
                                padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                                backgroundColor: '#fff', cursor: 'pointer', userSelect: 'none', boxSizing: 'border-box',
                              }}
                            >
                              <span>{ambitoMatricula}</span>
                              <ChevronDownIcon />
                            </div>

                            {ambitoMatriculaDropdownOpen && (
                              <div style={{
                                position: 'absolute', top: '100%', left: 0, right: 0,
                                marginTop: '4px', backgroundColor: '#fff', border: '1px solid #D1D5DB',
                                borderRadius: '6px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                                zIndex: 1010, maxHeight: '200px', overflowY: 'auto',
                              }}>
                                {ambitoMatriculaOptions.map((opt) => (
                                  <div
                                    key={opt}
                                    onClick={() => {
                                      setAmbitoMatricula(opt)
                                      setAmbitoMatriculaDropdownOpen(false)
                                    }}
                                    style={{
                                      padding: '8px 12px', fontSize: '13px', cursor: 'pointer',
                                      backgroundColor: ambitoMatricula === opt ? '#00AC99' : '#fff',
                                      color: ambitoMatricula === opt ? '#fff' : '#1F2937',
                                    }}
                                  >
                                    {opt}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* ROW 2:
                      If 'Medico':
                        Col 1: Ámbito de la Matrícula
                        Col 2: Número de Matrícula...
                      If not 'Medico':
                        Col 1: Número de Matrícula...
                        Col 2: Empty slot
                  */}
                        {tipoProfesion === 'Medico' ? (
                          <>
                            {/* Col 1: Ámbito de la Matrícula */}
                            <div style={{ position: 'relative' }}>
                              <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                                Ámbito de la Matrícula <span style={{ color: '#EF4444' }}>*</span>
                              </label>
                              <div
                                onClick={() => {
                                  setAmbitoMatriculaDropdownOpen(!ambitoMatriculaDropdownOpen)
                                  setTipoProfesionDropdownOpen(false)
                                  setEspecialidadDropdownOpen(false)
                                }}
                                style={{
                                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                  border: '1px solid #D1D5DB', borderRadius: '6px',
                                  padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                                  backgroundColor: '#fff', cursor: 'pointer', userSelect: 'none', boxSizing: 'border-box',
                                }}
                              >
                                <span>{ambitoMatricula}</span>
                                <ChevronDownIcon />
                              </div>

                              {ambitoMatriculaDropdownOpen && (
                                <div style={{
                                  position: 'absolute', top: '100%', left: 0, right: 0,
                                  marginTop: '4px', backgroundColor: '#fff', border: '1px solid #D1D5DB',
                                  borderRadius: '6px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                                  zIndex: 1010, maxHeight: '200px', overflowY: 'auto',
                                }}>
                                  {ambitoMatriculaOptions.map((opt) => (
                                    <div
                                      key={opt}
                                      onClick={() => {
                                        setAmbitoMatricula(opt)
                                        setAmbitoMatriculaDropdownOpen(false)
                                      }}
                                      style={{
                                        padding: '8px 12px', fontSize: '13px', cursor: 'pointer',
                                        backgroundColor: ambitoMatricula === opt ? '#00AC99' : '#fff',
                                        color: ambitoMatricula === opt ? '#fff' : '#1F2937',
                                      }}
                                    >
                                      {opt}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Número de Matrícula (Full Width Row) */}
                            <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
                              {/* Left: Input & Checkbox */}
                              <div>
                                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                                  Número de Matrícula Profesional o Registro Provincial <span style={{ color: '#EF4444' }}>*</span>
                                </label>
                                <input
                                  type="text"
                                  value={numMatricula}
                                  disabled={noTengoMatricula}
                                  onChange={(e) => setNumMatricula(e.target.value)}
                                  style={{
                                    width: '100%', border: (!noTengoMatricula && validationErrors.includes('Número de Matrícula')) ? '1px solid #EF4444' : '1px solid #D1D5DB', borderRadius: '6px',
                                    padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                                    outline: 'none', boxSizing: 'border-box',
                                    backgroundColor: noTengoMatricula ? '#F3F4F6' : '#fff'
                                  }}
                                />
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px', gap: '8px' }}>
                                  <input
                                    type="checkbox"
                                    id="noTengoMatricula1"
                                    checked={noTengoMatricula}
                                    onChange={(e) => {
                                      setNoTengoMatricula(e.target.checked);
                                      if (e.target.checked) setNumMatricula('');
                                    }}
                                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                                  />
                                  <label htmlFor="noTengoMatricula1" style={{ fontSize: '13px', color: '#374151', cursor: 'pointer' }}>
                                    No tengo Número de Matrícula
                                  </label>
                                </div>
                                {!noTengoMatricula && validationErrors.includes('Número de Matrícula') && (
                                  <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>El número de matrícula es requerido</p>
                                )}
                              </div>

                              {/* Right: File Upload */}
                              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                <AttachmentRow
                                  title={noTengoMatricula ? 'Copia de Título' : 'Constancia de Matrícula'}
                                  fileName={step2AttachedFiles[noTengoMatricula ? 'copia_titulo' : 'constancia_matricula']}
                                  onAttach={() => handleAttachFileStep2(noTengoMatricula ? 'copia_titulo' : 'constancia_matricula')}
                                />
                              </div>
                            </div>

                            {/* Por cada especialidad seleccionada: Matrícula + Constancia */}
                            {especialidadMedica.length > 0 && (
                              <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <p style={{ fontSize: '11.5px', fontWeight: 700, color: '#4B5563', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '4px 0 0 0' }}>
                                  Datos por Especialidad
                                </p>
                                {especialidadMedica.map(esp => {
                                  const data = especialidadesData[esp] || { matricula: '', constancia: '' }
                                  const hasError = validationErrors.includes(`Matrícula Especialidad: ${esp}`)
                                  return (
                                    <div key={esp} style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '14px 16px' }}>
                                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#1F2937', margin: '0 0 12px 0' }}>
                                        {esp}
                                      </p>
                                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'flex-start' }}>
                                        {/* Matrícula */}
                                        <div>
                                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                                            Número de Matrícula Especialidad <span style={{ color: '#EF4444' }}>*</span>
                                          </label>
                                          <input
                                            type="text"
                                            value={data.matricula}
                                            onChange={e => updateEspecialidadMatricula(esp, e.target.value)}
                                            placeholder="Ej: A001MPX29223"
                                            style={{
                                              width: '100%',
                                              border: hasError ? '1px solid #EF4444' : '1px solid #D1D5DB',
                                              borderRadius: '6px',
                                              padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                                              outline: 'none', boxSizing: 'border-box',
                                            }}
                                          />
                                          {hasError && (
                                            <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>El número de matrícula de especialidad es requerido</p>
                                          )}
                                        </div>
                                        {/* Constancia */}
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                          <AttachmentRow
                                            title="Constancia de Especialidad"
                                            fileName={data.constancia}
                                            onAttach={() => updateEspecialidadConstancia(esp, `constancia_${esp.replace(/\\s+/g, '_').toLowerCase()}.pdf`)}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            {/* Número de Matrícula (Full Width Row) */}
                            <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
                              {/* Left: Input & Checkbox */}
                              <div>
                                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                                  Número de Matrícula Profesional o Registro Provincial <span style={{ color: '#EF4444' }}>*</span>
                                </label>
                                <input
                                  type="text"
                                  value={numMatricula}
                                  disabled={noTengoMatricula}
                                  onChange={(e) => setNumMatricula(e.target.value)}
                                  style={{
                                    width: '100%', border: (!noTengoMatricula && validationErrors.includes('Número de Matrícula')) ? '1px solid #EF4444' : '1px solid #D1D5DB', borderRadius: '6px',
                                    padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                                    outline: 'none', boxSizing: 'border-box',
                                    backgroundColor: noTengoMatricula ? '#F3F4F6' : '#fff'
                                  }}
                                />
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px', gap: '8px' }}>
                                  <input
                                    type="checkbox"
                                    id="noTengoMatricula2"
                                    checked={noTengoMatricula}
                                    onChange={(e) => {
                                      setNoTengoMatricula(e.target.checked);
                                      if (e.target.checked) setNumMatricula('');
                                    }}
                                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                                  />
                                  <label htmlFor="noTengoMatricula2" style={{ fontSize: '13px', color: '#374151', cursor: 'pointer' }}>
                                    No tengo Número de Matrícula
                                  </label>
                                </div>
                                {!noTengoMatricula && validationErrors.includes('Número de Matrícula') && (
                                  <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>El número de matrícula es requerido</p>
                                )}
                              </div>

                              {/* Right: File Upload */}
                              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                <AttachmentRow
                                  title={noTengoMatricula ? 'Copia de Título' : 'Constancia de Matrícula'}
                                  fileName={step2AttachedFiles[noTengoMatricula ? 'copia_titulo' : 'constancia_matricula']}
                                  onAttach={() => handleAttachFileStep2(noTengoMatricula ? 'copia_titulo' : 'constancia_matricula')}
                                />
                              </div>
                            </div>
                          </>
                        )}

                      </div>

                      {/* ── ADDITIONAL DISABILITY SECTION ── */}
                      {isDisabilityCategory && (
                        <div>
                          {/* Divider */}
                          <hr style={{ border: 'none', borderTop: '1px solid #ebebeb', margin: '24px 0' }} />

                          <SectionTitle>Registro Nacional de Prestadores de Discapacidad</SectionTitle>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
                            {/* Certificado de RNP */}
                            <div>
                              <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                                Certificado de RNP <span style={{ color: '#EF4444' }}>*</span>
                              </label>
                              <input
                                type="text"
                                value={certificadoRnp}
                                onChange={(e) => setCertificadoRnp(e.target.value)}
                                style={{
                                  width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                                  padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                                  outline: 'none', boxSizing: 'border-box',
                                }}
                              />
                            </div>

                            <div>
                              <AttachmentRow
                                title="Constancia de inscripción vigente"
                                required={true}
                                fileName="Constancia.pdf"
                                onAttach={() => { }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                ) : activeStep === 3 ? (
                  // ── STEP 3: STAFF ──
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>
                      Staff
                    </h3>
                    <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '24px' }}>
                      Añadir integrantes del staff es opcional. Podés avanzar sin cargar miembros.
                    </p>

                    <SectionTitle>Staff de profesionales</SectionTitle>

                    {/* Excel upload dashed box */}
                    <div style={{
                      backgroundColor: '#F9FAFB',
                      border: '1.5px dashed #D1D5DB',
                      borderRadius: '8px',
                      padding: '24px',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      marginBottom: '28px',
                    }}>
                      <BigUploadIcon />
                      <p style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: 0 }}>
                        Adjuntar Excel/CSV de Staff
                      </p>
                      <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 8px 0' }}>
                        Arrastrá y soltá tu archivo acá, o <span style={{ color: '#00AC99', textDecoration: 'underline', fontWeight: 600, cursor: 'pointer' }}>examinar archivos</span>
                      </p>
                      <button
                        onClick={() => alert('Descargando plantilla de Excel para Staff...')}
                        style={{
                          display: 'flex', alignItems: 'center',
                          border: '1px solid #D1D5DB', borderRadius: '6px',
                          padding: '6px 14px', fontSize: '12px', fontWeight: 600,
                          color: '#374151', backgroundColor: '#fff', cursor: 'pointer',
                        }}
                      >
                        <DownloadIcon />
                        Descargar Plantilla
                      </button>
                    </div>

                    <SectionTitle>Cargar Manualmente</SectionTitle>

                    {/* Agregar Profesional Button Accordion-style */}
                    <div
                      onClick={() => {
                        setStaffCuit('20403532880')
                        setStaffNombre('Carolina, Rodriguez')
                        setStaffEspecialidad('Medico')
                        setStaffPrescriptor(true)
                        setStaffMatricula('A001MPX29223')
                        setShowStaffModal(true)
                      }}
                      style={{
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        backgroundColor: '#fff',
                        marginBottom: '20px',
                        transition: 'border-color 0.15s ease',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#bbb'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '6px',
                          backgroundColor: '#E6F6F4', color: '#00AC99',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '18px', fontWeight: 'bold',
                        }}>
                          +
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#00AC99' }}>
                          Agregar Profesional
                        </span>
                      </div>
                      <span style={{ color: '#9CA3AF', display: 'flex', alignItems: 'center' }}>
                        <ChevronDownIcon />
                      </span>
                    </div>

                    {/* Live List of Added Professionals */}
                    {staffList.length > 0 && (
                      <div style={{ marginBottom: '24px' }}>
                        <SectionTitle>Profesionales Cargados ({staffList.length})</SectionTitle>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {staffList.map((prof, idx) => (
                            <div
                              key={idx}
                              style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                border: '1px solid #E5E7EB', borderRadius: '8px', padding: '12px 16px',
                                backgroundColor: '#F9FAFB',
                              }}
                            >
                              <div>
                                <p style={{ fontSize: '13.5px', fontWeight: 600, color: '#111827', margin: 0 }}>
                                  {prof.nombre}
                                </p>
                                <p style={{ fontSize: '12px', color: '#6B7280', margin: '4px 0 0 0' }}>
                                  CUIT/CUIL: <strong style={{ color: '#4B5563' }}>{prof.cuit}</strong> |
                                  Especialidad: <strong style={{ color: '#4B5563' }}>{prof.especialidad}</strong> |
                                  Matrícula: <strong style={{ color: '#4B5563' }}>{prof.matricula}</strong> |
                                  Prescriptor: <strong style={{ color: '#4B5563' }}>{prof.prescriptor ? 'Sí' : 'No'}</strong>
                                </p>
                              </div>

                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                  onClick={() => {
                                    setStaffCuit(prof.cuit)
                                    setStaffNombre(prof.nombre)
                                    setStaffEspecialidad(prof.especialidad)
                                    setStaffPrescriptor(prof.prescriptor)
                                    setStaffMatricula(prof.matricula)
                                    setEditingStaffIndex(idx)
                                    setShowStaffModal(true)
                                  }}
                                  style={{
                                    border: '1px solid #D1D5DB', borderRadius: '6px',
                                    padding: '8px', cursor: 'pointer', backgroundColor: '#fff',
                                    color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                  }}
                                >
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                                  </svg>
                                </button>

                                <button
                                  onClick={() => {
                                    setItemToDeleteIndex(idx)
                                    setItemToDeleteType('staff')
                                    setShowDeleteConfirmModal(true)
                                  }}
                                  style={{
                                    border: '1px solid #FCA5A5', borderRadius: '6px',
                                    padding: '8px', cursor: 'pointer', backgroundColor: '#FEF2F2',
                                    color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                  }}
                                >
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : activeStep === 4 ? (
                  // ── STEP 4: LUGAR DE ATENCIÓN ──
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>
                      Lugar de atención
                    </h3>
                    <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '24px' }}>
                      Por favor, completá la siguiente información obligatoria (*)
                    </p>

                    <SectionTitle>Datos del lugar de atención</SectionTitle>

                    {/* Render added locations */}
                    {locationsList.map((loc, idx) => (
                      <div
                        key={idx}
                        style={{
                          border: '1px solid #E5E7EB',
                          borderRadius: '12px',
                          padding: '16px 20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: '#fff',
                          marginBottom: '16px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '8px',
                            backgroundColor: '#F3F4F6',
                            color: '#4B5563',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                          </div>

                          <div>
                            <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827', margin: 0 }}>
                              {loc.nombre}
                            </h4>
                            <p style={{ fontSize: '12.5px', color: '#6B7280', margin: '4px 0 0 0' }}>
                              {loc.calle} {loc.puerta}, {loc.localidad}
                            </p>
                            <p style={{ fontSize: '11.5px', color: '#9CA3AF', margin: '2px 0 0 0' }}>
                              Tel: {loc.telTurnos} | Guardia: {loc.guardia ? 'Sí' : 'No'}
                            </p>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          {/* Edit Button */}
                          <button
                            onClick={() => {
                              setLocNombre(loc.nombre)
                              setLocGuardia(loc.guardia)
                              setLocCalle(loc.calle)
                              setLocPuerta(loc.puerta)
                              setLocDepto(loc.depto)
                              setLocCP(loc.cp)
                              setLocBarrio(loc.barrio)
                              setLocLocalidad(loc.localidad)
                              setLocOtros(loc.otros)
                              setLocTelTurnos(loc.telTurnos)
                              setLocTelEmergencia(loc.telEmergencia)
                              setLocEmail(loc.email)
                              setLocHorarios((loc.horarios || []).map((h: any) => ({ ...h, diaOpen: false })))
                              setEditingLocationIndex(idx)
                              setShowLocationModal(true)
                            }}
                            style={{
                              border: '1px solid #D1D5DB', borderRadius: '6px',
                              padding: '8px', cursor: 'pointer', backgroundColor: '#fff',
                              color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                            </svg>
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => {
                              setItemToDeleteIndex(idx)
                              setItemToDeleteType('lugar')
                              setShowDeleteConfirmModal(true)
                            }}
                            style={{
                              border: '1px solid #FCA5A5', borderRadius: '6px',
                              padding: '8px', cursor: 'pointer', backgroundColor: '#FEF2F2',
                              color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Agregar lugar de atención Accordion */}
                    <div
                      onClick={() => {
                        setLocNombre('Sanatorio Allende - Cerro de las rosas')
                        setLocGuardia(false)
                        setLocCalle('Los tordos')
                        setLocPuerta('231')
                        setLocDepto('N/A')
                        setLocCP('5111')
                        setLocBarrio('Flores')
                        setLocLocalidad('Cordoba Capital')
                        setLocOtros('N/A')
                        setLocTelTurnos('351-13222432')
                        setLocTelEmergencia('3541-123432')
                        setLocEmail('consultas@hospital.com')
                        setLocHorarios([{ dias: ['Lunes'], inicio: '08:00', fin: '18:00', diaOpen: false }])
                        setEditingLocationIndex(null)
                        setShowLocationModal(true)
                      }}
                      style={{
                        border: validationErrors.includes('Debe agregar al menos un lugar de atención') ? '1px solid #EF4444' : '1px solid #E5E7EB',
                        borderRadius: '12px',
                        padding: '24px 32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        backgroundColor: '#fff',
                        marginBottom: '20px',
                        transition: 'border-color 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!validationErrors.includes('Debe agregar al menos un lugar de atención')) {
                          e.currentTarget.style.borderColor = '#bbb'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!validationErrors.includes('Debe agregar al menos un lugar de atención')) {
                          e.currentTarget.style.borderColor = '#E5E7EB'
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{
                          width: '40px', height: '40px', borderRadius: '8px',
                          backgroundColor: '#E6F6F4', color: '#00AC99',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '24px', fontWeight: 'bold', marginRight: '16px',
                        }}>
                          +
                        </div>
                        <span style={{ fontSize: '15px', fontWeight: 700, color: '#00AC99' }}>
                          Agregar lugar de atención <span style={{ color: '#EF4444' }}>*</span>
                        </span>
                      </div>
                      <span style={{ color: '#00AC99', display: 'flex', alignItems: 'center' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </span>
                    </div>
                    {validationErrors.includes('Debe agregar al menos un lugar de atención') && (
                      <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 20px 0' }}>Debe agregar al menos un lugar de atención</p>
                    )}
                  </div>
                ) : activeStep === 5 ? (
                  // ── STEP 5: SEGURO Y HABILITACIONES ──
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>
                      {!isPersonaFisica ? 'Seguro y Habilitaciones' : <>Seguros <span style={{ color: '#EF4444' }}>*</span></>}
                    </h3>

                    {/* Symmetrical Grid for Insurance Company Details */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      rowGap: '16px',
                      columnGap: '28px',
                      marginBottom: '24px',
                    }}>

                      {/* Razón Social */}
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                          Razón Social de la Aseguradora <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                          type="text"
                          value={aseguradoraRazonSocial}
                          onChange={(e) => {
                            setAseguradoraRazonSocial(e.target.value)
                            setValidationErrors(prev => prev.filter(err => err !== 'Razón Social de la Aseguradora'))
                          }}
                          style={{
                            width: '100%', borderRadius: '6px',
                            border: validationErrors.includes('Razón Social de la Aseguradora') ? '1px solid #EF4444' : '1px solid #D1D5DB',
                            padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                            outline: 'none', boxSizing: 'border-box',
                          }}
                        />
                        {validationErrors.includes('Razón Social de la Aseguradora') && (
                          <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>La razón social es requerida</p>
                        )}
                      </div>

                      {/* CUIT */}
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                          CUIT de la Aseguradora <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                          type="text"
                          value={aseguradoraCuit}
                          onChange={(e) => {
                            setAseguradoraCuit(e.target.value)
                            setValidationErrors(prev => prev.filter(err => err !== 'CUIT de la Aseguradora'))
                          }}
                          style={{
                            width: '100%', borderRadius: '6px',
                            border: validationErrors.includes('CUIT de la Aseguradora') ? '1px solid #EF4444' : '1px solid #D1D5DB',
                            padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                            outline: 'none', boxSizing: 'border-box',
                          }}
                        />
                        {validationErrors.includes('CUIT de la Aseguradora') && (
                          <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>El CUIT de la aseguradora es requerido</p>
                        )}
                      </div>

                      {/* Vencimiento */}
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                          Vencimiento de la Póliza <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                          <input
                            type="date"
                            value={aseguradoraVencimiento}
                            onChange={(e) => {
                              setAseguradoraVencimiento(e.target.value)
                              setValidationErrors(prev => prev.filter(err => err !== 'Fecha de Vencimiento del Seguro'))
                            }}
                            style={{
                              width: '100%', borderRadius: '6px',
                              border: validationErrors.includes('Fecha de Vencimiento del Seguro') ? '1px solid #EF4444' : '1px solid #D1D5DB',
                              padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                              outline: 'none', boxSizing: 'border-box',
                            }}
                          />
                        </div>
                        {validationErrors.includes('Fecha de Vencimiento del Seguro') && (
                          <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>La fecha de vencimiento es requerida</p>
                        )}
                      </div>

                      {/* Nº Póliza */}
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                          Nº Póliza <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                          type="text"
                          value={aseguradoraNoPoliza}
                          onChange={(e) => {
                            setAseguradoraNoPoliza(e.target.value)
                            setValidationErrors(prev => prev.filter(err => err !== 'Número de Póliza'))
                          }}
                          style={{
                            width: '100%', borderRadius: '6px',
                            border: validationErrors.includes('Número de Póliza') ? '1px solid #EF4444' : '1px solid #D1D5DB',
                            padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                            outline: 'none', boxSizing: 'border-box',
                          }}
                        />
                        {validationErrors.includes('Número de Póliza') && (
                          <p style={{ color: '#EF4444', fontSize: '11px', margin: '4px 0 0 0' }}>El número de póliza es requerido</p>
                        )}
                      </div>

                    </div>

                    {!isPersonaFisica ? (
                      <>
                        <div style={{ marginBottom: '32px' }}>
                          <AttachmentRow
                            title="Póliza de seguro de responsabilidad civil de la institución"
                            fileName={step5AttachedFiles['Póliza de seguro de responsabilidad civil de la institución']}
                            onAttach={() => handleAttachFile('Póliza de seguro de responsabilidad civil de la institución')}
                          />
                        </div>

                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
                          Habilitaciones
                        </h3>
                        <p style={{ fontSize: '13px', color: '#2563EB', margin: '0 0 24px 0' }}>
                          Adjuntá cada archivo en formato JPG, PNG o PDF (máx. 10 MB por archivo).
                        </p>

                        <div style={{ marginBottom: '24px' }}>
                          <AttachmentRow
                            title="Certificado de categorización institucional"
                            fileName={step5AttachedFiles['Certificado de categorización institucional']}
                            onAttach={() => handleAttachFile('Certificado de categorización institucional')}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ marginBottom: '16px' }}>
                          <AttachmentRow
                            title="Póliza de Seguro de Responsabilidad Civil Profesional"
                            fileName={step5AttachedFiles['Póliza de Seguro de Responsabilidad Civil Profesional']}
                            onAttach={() => handleAttachFile('Póliza de Seguro de Responsabilidad Civil Profesional')}
                          />
                        </div>
                      </>
                    )}
                  </div>
                ) : activeStep === 6 ? (
                  // ── STEP 6: DOCUMENTACIÓN LEGAL ──
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>
                      Documentación legal
                    </h3>

                    {!(cidiData?.represented.includes('Sanatorio')) ? (
                      <>
                        <SectionTitle>Experiencia Profesional</SectionTitle>

                        {/* "+ Agregar tu experiencia profesional" Accordion row */}
                        <div
                          onClick={() => {
                            setAntecedenteDescripcion('')
                            setAntecedentePeriodoInicio('26/11/2010')
                            setAntecedentePeriodoFin('26/11/2025')
                            setAntecedenteEstablecimiento('Colegio San Antonio')
                            setAntecedenteEstablecimientoCuit('30-12343212')
                            setShowAntecedentesModal(true)
                          }}
                          style={{
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            backgroundColor: '#fff',
                            marginBottom: '20px',
                            transition: 'border-color 0.15s ease',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#bbb'}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                        >
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{
                              width: '32px', height: '32px', borderRadius: '6px',
                              backgroundColor: '#E6F6F4', color: '#00AC99',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: '18px', fontWeight: 'bold', marginRight: '12px',
                            }}>
                              +
                            </div>
                            <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#00AC99' }}>
                              Agregar tu experiencia profesional
                            </span>
                          </div>
                          <span style={{ color: '#9CA3AF', display: 'flex', alignItems: 'center' }}>
                            <ChevronDownIcon />
                          </span>
                        </div>

                        {/* Antecedentes list */}
                        {antecedentesList.length > 0 && (
                          <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {antecedentesList.map((ant, idx) => (
                                <div
                                  key={idx}
                                  style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    border: '1px solid #E5E7EB', borderRadius: '8px', padding: '12px 16px',
                                    backgroundColor: '#F9FAFB',
                                  }}
                                >
                                  <div>
                                    <p style={{ fontSize: '13.5px', fontWeight: 600, color: '#111827', margin: 0 }}>
                                      {ant.descripcion}
                                    </p>
                                    <p style={{ fontSize: '12px', color: '#6B7280', margin: '4px 0 0 0' }}>
                                      Establecimiento: <strong style={{ color: '#4B5563' }}>{ant.establecimiento}</strong> |
                                      CUIT: <strong style={{ color: '#4B5563' }}>{ant.establecimientoCuit || 'N/A'}</strong> |
                                      Período: <strong style={{ color: '#4B5563' }}>{ant.periodoInicio} - {ant.periodoFin}</strong>
                                    </p>
                                  </div>

                                  <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                      onClick={() => {
                                        setAntecedenteDescripcion(ant.descripcion)
                                        setAntecedentePeriodoInicio(ant.periodoInicio)
                                        setAntecedentePeriodoFin(ant.periodoFin)
                                        setAntecedenteEstablecimiento(ant.establecimiento)
                                        setAntecedenteEstablecimientoCuit(ant.establecimientoCuit)
                                        setEditingAntecedenteIndex(idx)
                                        setShowAntecedentesModal(true)
                                      }}
                                      style={{
                                        border: '1px solid #D1D5DB', borderRadius: '6px',
                                        padding: '8px', cursor: 'pointer', backgroundColor: '#fff',
                                        color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                      }}
                                    >
                                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                                      </svg>
                                    </button>

                                    <button
                                      onClick={() => {
                                        setItemToDeleteIndex(idx)
                                        setItemToDeleteType('antecedente')
                                        setShowDeleteConfirmModal(true)
                                      }}
                                      style={{
                                        border: '1px solid #FCA5A5', borderRadius: '6px',
                                        padding: '8px', cursor: 'pointer', backgroundColor: '#FEF2F2',
                                        color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                      }}
                                    >
                                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {/* Info banner */}
                        <div style={{
                          display: 'flex', alignItems: 'flex-start', gap: '10px',
                          backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE',
                          borderRadius: '8px', padding: '12px 16px', marginBottom: '24px',
                        }}>
                          <span style={{ color: '#3B82F6', display: 'flex', flexShrink: 0, marginTop: '1px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                          </span>
                          <p style={{ fontSize: '13px', color: '#1E40AF', margin: 0, lineHeight: 1.5 }}>
                            A continuación se lista la documentación requerida según tu tipo de prestador. Adjuntá cada archivo en formato JPG, PNG o PDF (máx. 10 MB por archivo).
                          </p>
                        </div>

                        <SectionTitle>DOCUMENTACIÓN DE PERSONERÍA JURÍDICA</SectionTitle>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                          {[
                            'Estatuto o contrato social vigente',
                            'Acta designación autoridades',
                            'Acreditación de personería IPJ',
                            'Poder representación Legal',
                          ].map((docName) => (
                            <AttachmentRow
                              key={docName}
                              title={docName}
                              fileName={step6AttachedFiles[docName]}
                              onAttach={() => setStep6AttachedFiles(prev => ({ ...prev, [docName]: prev[docName] ? '' : 'documento_cargado.pdf' }))}
                            />
                          ))}
                        </div>

                        <SectionTitle>Experiencia Profesional</SectionTitle>

                        {/* Agregar experiencia profesional accordion row */}
                        <div
                          onClick={() => {
                            setAntecedenteDescripcion('')
                            setAntecedentePeriodoInicio('26/11/2010')
                            setAntecedentePeriodoFin('26/11/2025')
                            setAntecedenteEstablecimiento('Colegio San Antonio')
                            setAntecedenteEstablecimientoCuit('30-12343212')
                            setShowAntecedentesModal(true)
                          }}
                          style={{
                            border: '1px solid #E5E7EB', borderRadius: '8px', padding: '12px 16px',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            cursor: 'pointer', backgroundColor: '#fff', marginBottom: '8px',
                            transition: 'border-color 0.15s ease',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#bbb'}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '20px', fontWeight: 300, color: '#00AC99', lineHeight: 1 }}>+</span>
                            <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#00AC99' }}>Agregar tu experiencia profesional</span>
                          </div>
                          <span style={{ color: '#9CA3AF', display: 'flex', alignItems: 'center' }}><ChevronDownIcon /></span>
                        </div>

                        {/* Antecedentes list */}
                        {antecedentesList.length > 0 && (
                          <div style={{ marginTop: '12px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {antecedentesList.map((ant, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '12px 16px', backgroundColor: '#F9FAFB' }}>
                                  <div>
                                    <p style={{ fontSize: '13.5px', fontWeight: 600, color: '#111827', margin: 0 }}>{ant.descripcion}</p>
                                    <p style={{ fontSize: '12px', color: '#6B7280', margin: '4px 0 0 0' }}>
                                      Establecimiento: <strong style={{ color: '#4B5563' }}>{ant.establecimiento}</strong> | CUIT: <strong style={{ color: '#4B5563' }}>{ant.establecimientoCuit || 'N/A'}</strong> | Período: <strong style={{ color: '#4B5563' }}>{ant.periodoInicio} - {ant.periodoFin}</strong>
                                    </p>
                                  </div>
                                  <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                      onClick={() => {
                                        setAntecedenteDescripcion(ant.descripcion)
                                        setAntecedentePeriodoInicio(ant.periodoInicio)
                                        setAntecedentePeriodoFin(ant.periodoFin)
                                        setAntecedenteEstablecimiento(ant.establecimiento)
                                        setAntecedenteEstablecimientoCuit(ant.establecimientoCuit)
                                        setEditingAntecedenteIndex(idx)
                                        setShowAntecedentesModal(true)
                                      }}
                                      style={{
                                        border: '1px solid #D1D5DB', borderRadius: '6px',
                                        padding: '8px', cursor: 'pointer', backgroundColor: '#fff',
                                        color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                      }}
                                    >
                                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                                      </svg>
                                    </button>

                                    <button
                                      onClick={() => {
                                        setItemToDeleteIndex(idx)
                                        setItemToDeleteType('antecedente')
                                        setShowDeleteConfirmModal(true)
                                      }}
                                      style={{
                                        border: '1px solid #FCA5A5', borderRadius: '6px',
                                        padding: '8px', cursor: 'pointer', backgroundColor: '#FEF2F2',
                                        color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                      }}
                                    >
                                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ) : activeStep === 7 ? (
                  // ── STEP 7: CBU ──
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>
                      CBU
                    </h3>
                    {cbuOption === 'cidi' ? (
                      <>
                        {/* Top Light Blue Banner */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: '#EFF6FF',
                          border: '1px solid #BFDBFE',
                          borderRadius: '8px',
                          padding: '16px 20px',
                          marginBottom: '24px',
                          gap: '16px',
                        }}>
                          <p style={{ fontSize: '13.5px', color: '#1E40AF', margin: 0, lineHeight: '1.6', flex: 1 }}>
                            <strong style={{ color: '#1D4ED8' }}>Importante:</strong> Las cuentas bancarias se obtienen directamente desde Ciudadano Digital (CiDi).<br />
                            Si no tenés ninguna cuenta cargada o querés agregar una nueva, debés declararla en el portal de CiDi.
                          </p>

                          <a
                            href="https://cidi.cba.gov.ar/portal-publico/tramite/70AF1B8B-190B-F011-BD48-005056A190FF"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              backgroundColor: '#00AC99',
                              color: '#fff',
                              textDecoration: 'none',
                              fontWeight: 600,
                              fontSize: '13.5px',
                              padding: '10px 20px',
                              borderRadius: '6px',
                              whiteSpace: 'nowrap',
                              transition: 'background-color 0.2s ease',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00AC99'}
                          >
                            Declarar CBU en CiDi
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </a>
                        </div>

                        {/* Section Title and Refrescar Button */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '16px',
                        }}>
                          <p style={{
                            fontSize: '12px', fontWeight: 700, color: '#374151',
                            letterSpacing: '0.08em', textTransform: 'uppercase',
                            margin: 0,
                          }}>
                            MIS CUENTAS <span style={{ color: '#EF4444' }}>*</span>
                          </p>

                          {!cbuLoaded && (
                            <button
                              onClick={() => setCbuLoaded(true)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                backgroundColor: '#fff',
                                border: '1px solid #D1D5DB',
                                borderRadius: '6px',
                                padding: '6px 14px',
                                fontSize: '12.5px',
                                fontWeight: 600,
                                color: '#374151',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#9CA3AF'}
                              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
                            >
                              Refrescar
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                              </svg>
                            </button>
                          )}
                        </div>

                        {/* Accounts Box */}
                        {!cbuLoaded ? (
                          /* IMAGE 2: NO INFO YET */
                          <>
                            <div style={{
                              border: validationErrors.includes('Debe cargar un CBU válido') ? '1px solid #EF4444' : '1px solid #E5E7EB',
                              borderRadius: '8px',
                              backgroundColor: '#fff',
                              padding: '48px 32px',
                              textAlign: 'center',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginBottom: '28px',
                            }}>
                              <div style={{ color: '#4B5563', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                                  <line x1="12" y1="9" x2="12" y2="13" />
                                  <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                              </div>
                              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: '0 0 6px 0' }}>
                                No existe información
                              </h4>
                              <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>
                                No encontramos cuentas bancarias registradas a tu nombre en CiDi
                              </p>
                            </div>
                            {validationErrors.includes('Debe cargar un CBU válido') && (
                              <p style={{ color: '#EF4444', fontSize: '11px', margin: '-16px 0 28px 0' }}>Debe cargar un CBU válido para continuar</p>
                            )}
                          </>
                        ) : (
                          /* IMAGE 1: ACCOUNTS LIST LOADED */
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>

                            {/* Account 1: Bancor */}
                            <div
                              onClick={() => setSelectedCbuIndex(0)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '8px',
                                border: selectedCbuIndex === 0 ? '1.5px solid #00AC99' : '1px solid #E5E7EB',
                                backgroundColor: selectedCbuIndex === 0 ? '#F0FDF4' : '#fff',
                                padding: '16px 20px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              {/* Radio dot */}
                              <div style={{
                                width: '18px', height: '18px', borderRadius: '50%',
                                border: selectedCbuIndex === 0 ? '2px solid #00AC99' : '2px solid #bbb',
                                backgroundColor: '#fff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginRight: '16px',
                              }}>
                                {selectedCbuIndex === 0 && (
                                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00AC99' }} />
                                )}
                              </div>

                              {/* Bank Icon */}
                              <span style={{ color: '#4B5563', marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <rect x="3" y="11" width="18" height="11" rx="2" />
                                  <path d="M12 2 3 7v4h18V7l-9-5z" />
                                  <line x1="6" y1="15" x2="6" y2="18" />
                                  <line x1="18" y1="15" x2="18" y2="18" />
                                  <line x1="12" y1="15" x2="12" y2="18" />
                                </svg>
                              </span>

                              <div>
                                <p style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827', margin: 0 }}>
                                  Bancor
                                </p>
                                <p style={{ fontSize: '12px', color: '#6B7280', margin: '4px 0 0 0' }}>
                                  CBU: <strong style={{ color: '#4B5563' }}>0200925811000001234567</strong> | Estado: <strong style={{ color: '#059669' }}>Activo</strong> | Solicitud: 10/05/2023
                                </p>
                              </div>
                            </div>

                            {/* Account 2: Banco Nacion */}
                            <div
                              onClick={() => setSelectedCbuIndex(1)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '8px',
                                border: selectedCbuIndex === 1 ? '1.5px solid #00AC99' : '1px solid #E5E7EB',
                                backgroundColor: selectedCbuIndex === 1 ? '#F0FDF4' : '#fff',
                                padding: '16px 20px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              {/* Radio dot */}
                              <div style={{
                                width: '18px', height: '18px', borderRadius: '50%',
                                border: selectedCbuIndex === 1 ? '2px solid #00AC99' : '2px solid #bbb',
                                backgroundColor: '#fff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginRight: '16px',
                              }}>
                                {selectedCbuIndex === 1 && (
                                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00AC99' }} />
                                )}
                              </div>

                              {/* Bank Icon */}
                              <span style={{ color: '#4B5563', marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <rect x="3" y="11" width="18" height="11" rx="2" />
                                  <path d="M12 2 3 7v4h18V7l-9-5z" />
                                  <line x1="6" y1="15" x2="6" y2="18" />
                                  <line x1="18" y1="15" x2="18" y2="18" />
                                  <line x1="12" y1="15" x2="12" y2="18" />
                                </svg>
                              </span>

                              <div>
                                <p style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827', margin: 0 }}>
                                  Banco Nacion
                                </p>
                                <p style={{ fontSize: '12px', color: '#6B7280', margin: '4px 0 0 0' }}>
                                  CBU: <strong style={{ color: '#4B5563' }}>011059530000023456789</strong> | Estado: <strong style={{ color: '#059669' }}>Activo</strong> | Solicitud: 10/05/2024
                                </p>
                              </div>
                            </div>

                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '24px' }}>
                          Por favor, completá la siguiente información obligatoria (*)
                        </p>
                        <SectionTitle>DIRECCION</SectionTitle>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '16px' }}>
                          <div>
                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                              Titular de la cuenta
                            </label>
                            <input
                              type="text"
                              value={manualTitular}
                              onChange={(e) => setManualTitular(e.target.value)}
                              style={{
                                width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                                padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                                outline: 'none', boxSizing: 'border-box',
                              }}
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                              Nombre del banco <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <input
                              type="text"
                              value={manualBanco}
                              onChange={(e) => setManualBanco(e.target.value)}
                              style={{
                                width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                                padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                                outline: 'none', boxSizing: 'border-box',
                              }}
                            />
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                          <div>
                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                              CBU
                            </label>
                            <input
                              type="text"
                              value={manualCbu}
                              onChange={(e) => setManualCbu(e.target.value)}
                              style={{
                                width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                                padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                                outline: 'none', boxSizing: 'border-box',
                              }}
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                              Alias
                            </label>
                            <input
                              type="text"
                              value={manualAlias}
                              onChange={(e) => setManualAlias(e.target.value)}
                              style={{
                                width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                                padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                                outline: 'none', boxSizing: 'border-box',
                              }}
                            />
                          </div>
                          <div style={{ position: 'relative' }}>
                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                              Moneda
                            </label>
                            <div
                              style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                border: '1px solid #D1D5DB', borderRadius: '6px',
                                padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                                backgroundColor: '#fff', boxSizing: 'border-box',
                              }}
                            >
                              <span>{manualMoneda}</span>
                              <ChevronDownIcon />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : activeStep === 8 ? (
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>Revisión de Postulación</h3>
                    <p style={{ color: '#4B5563', marginBottom: '24px' }}>Revise los datos ingresados. Al hacer clic en "Continuar", la solicitud pasará a revisión.</p>

                    {isPersonaJuridica && (
                      <SummarySection title="Datos de la Institución">
                        <SummaryItem label="CUIT" value={cuit} />
                        <SummaryItem label="Razón Social" value={cidiData?.represented} />
                        <SummaryItem label="Categoría" value={cidiData?.category} />
                        {isInstitucionDiscapacidad && <SummaryItem label="Tipo de Institución" value={tipoInstitucion} />}
                        {isInstitucionNivel && <SummaryItem label="Nivel de Atención" value={tipoInstitucionNivel} />}
                        <SummaryItem label="Registro Nacional Prestadores (REFES)" value={instRefes} />
                        <SummaryItem label="Registro Provincial (Rugepresa)" value={instRegistroProvincial} />
                      </SummarySection>
                    )}

                    {isPersonaFisica && (
                      <SummarySection title="Datos del Perfil">
                        <SummaryItem label="CUIT" value={cuit} />
                        <SummaryItem label="Nombre" value={cidiData?.represented} />
                        <SummaryItem label="Categoría" value={cidiData?.category} />
                        <SummaryItem label="Profesión" value={tipoProfesion} />
                        {tipoProfesion === 'Medico' && <SummaryItem label="Especialidades" value={especialidadMedica.join(', ')} />}
                        <SummaryItem label="Ámbito Matrícula" value={ambitoMatricula} />
                        <SummaryItem label="Nº Matrícula" value={noTengoMatricula ? 'No posee' : numMatricula} />
                      </SummarySection>
                    )}

                    {!isPersonaFisica && (
                      <SummarySection title="Director Técnico y Rep. Legal">
                        <SummaryItem label="Director - Nombre" value={instDirectorNombre} />
                        <SummaryItem label="Director - CUIT" value={instDirectorCuit} />
                        <SummaryItem label="Director - Matrícula" value={instDirectorMatricula} />
                        <SummaryItem label="Rep. Legal - Nombre" value={instRepLegalNombre} />
                        <SummaryItem label="Rep. Legal - CUIT" value={instRepLegalCuit} />
                        <SummaryItem label="Rep. Legal - Rol" value={instRepLegalRol} />
                      </SummarySection>
                    )}

                    {(!isPersonaFisica && staffList.length > 0) && (
                      <SummarySection title="Staff de Profesionales">
                        <SummaryItem label="Total de Profesionales" value={`${staffList.length} cargados`} />
                      </SummarySection>
                    )}

                    <SummarySection title="Lugares de Atención">
                      <SummaryItem label="Total de Sucursales" value={`${locationsList.length} cargadas`} />
                    </SummarySection>

                  </div>
                ) : activeStep === 9 ? (
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>Revisión de Inscripción</h3>
                    <p style={{ color: '#4B5563', marginBottom: '24px' }}>Revise los datos fiscales, seguro, documentación y CBU.</p>

                    <SummarySection title="Datos Fiscales y Domicilio">
                      <SummaryItem label="CUIT" value={cuit} />
                      <SummaryItem label="Inicio de Actividades" value={inicioActividades} />
                      <SummaryItem label="Responsabilidad Fiscal" value={responsabilidadFiscal} />
                      {responsabilidadFiscal !== 'Monotributista' && <SummaryItem label="Nº Ingresos Brutos" value={ingresosBrutos} />}
                      <SummaryItem label="Posee Extensión IIBB?" value={hasExtension ? 'Sí' : 'No'} />
                      <SummaryItem label="Teléfono" value={telAdministrativo} />
                      <SummaryItem label="Email" value={emailAdministrativo} />
                      <SummaryItem label="Domicilio" value={`${calle} ${puerta} ${apartamento ? `Dpto ${apartamento}` : ''}, ${barrio}, ${localidad}, CP: ${codigoPostal}`} />
                    </SummarySection>

                    <SummarySection title="Seguros">
                      <SummaryItem label="Aseguradora" value={aseguradoraRazonSocial} />
                      <SummaryItem label="Nº Póliza" value={aseguradoraNoPoliza} />
                      <SummaryItem label="Vencimiento" value={aseguradoraVencimiento} />
                    </SummarySection>

                    {isPersonaFisica && (
                      <SummarySection title="Documentación Legal">
                        <SummaryItem label="Experiencia Profesional" value={`${antecedentesList.length} antecedentes cargados`} />
                      </SummarySection>
                    )}

                    <SummarySection title="Cuenta Bancaria (CBU)">
                      {cbuOption === 'cidi' ? (
                        <SummaryItem label="CBU Cargado" value={cbuLoaded ? 'Sí' : 'No'} />
                      ) : (
                        <>
                          <SummaryItem label="Titular de la cuenta" value={manualTitular || 'N/A'} />
                          <SummaryItem label="Nombre del banco" value={manualBanco || 'N/A'} />
                          <SummaryItem label="CBU" value={manualCbu || 'N/A'} />
                          <SummaryItem label="Alias" value={manualAlias || 'N/A'} />
                          <SummaryItem label="Moneda" value={manualMoneda || 'N/A'} />
                        </>
                      )}
                    </SummarySection>

                  </div>
                ) : (
                  // ── OTHER STEPS placeholder ──
                  <div style={{ minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '40px' }}>
                    <div style={{
                      width: '64px', height: '64px', borderRadius: '50%',
                      backgroundColor: '#E6F6F4', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      color: '#00AC99', marginBottom: '20px',
                    }}>
                      <FileIcon />
                    </div>
                    <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
                      {steps[activeStep - 1].name}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#6B7280', maxWidth: '500px', lineHeight: 1.6, marginBottom: '24px' }}>
                      Este es el paso interactivo <strong>Paso {activeStep}</strong> del trámite.
                      <br />
                      Se adaptará con los requisitos correspondientes a la categoría:
                      <br />
                      <span style={{ display: 'inline-block', marginTop: '10px', backgroundColor: '#E6F6F4', color: '#00AC99', padding: '6px 16px', borderRadius: '20px', fontWeight: 600 }}>
                        {cidiData?.category || 'Sin categoría'}
                      </span>
                    </p>
                  </div>
                )}

                {/* ── ACTION BUTTONS ── */}
                <div style={{
                  borderTop: '1px solid #ebebeb', paddingTop: '24px',
                  display: 'flex', gap: '12px', justifyContent: 'space-between',
                }}>
                  <button
                    onClick={handlePrevStep}
                    style={{
                      flex: 1, padding: '11px 24px', borderRadius: '6px',
                      border: '1px solid #d0d0d0', backgroundColor: '#fff',
                      color: '#555', fontSize: '14px', fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    {(activeStep === 1 || activeStep === 5) ? 'Cancelar' : 'Anterior'}
                  </button>

                  <button
                    onClick={handleNextStep}
                    style={{
                      flex: 1, padding: '11px 24px', borderRadius: '6px',
                      border: 'none', fontSize: '14px', fontWeight: 600,
                      cursor: validateCurrentStep().length > 0 ? 'not-allowed' : 'pointer',
                      backgroundColor: validateCurrentStep().length > 0 ? '#D1D5DB' : '#00AC99',
                      color: validateCurrentStep().length > 0 ? '#6B7280' : '#fff',
                      transition: 'all 0.25s ease',
                    }}
                    title={validateCurrentStep().length > 0 ? 'Completa los campos obligatorios para continuar' : ''}
                  >
                    Continuar
                  </button>
                </div>

              </div>
            </>
          )}
        </main>
      </div>

      {/* ── COLLEGE MODAL (Paso 2 Exception) ── */}
      {showCollegeModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(3px)',
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '24px',
            padding: '40px 32px',
            width: '520px',
            maxWidth: '90%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            textAlign: 'center',
            boxSizing: 'border-box',
          }}>
            <CollegeIcon />

            <h3 style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#0F172A',
              marginBottom: '16px',
            }}>
              Gestión de alta Enviada
            </h3>

            <p style={{
              fontSize: '14px',
              color: '#475569',
              lineHeight: '1.6',
              marginBottom: '28px',
            }}>
              Tu gestión en esta plataforma ha terminado.
              <br />
              Ahora, ponete en contacto con tu Colegio Profesional para completar la validación de tu legajo. Ellos nos informarán cuando estés listo para el alta final.
            </p>

            <button
              onClick={() => {
                setShowCollegeModal(false)
                if (onComplete) {
                  onComplete({
                    cuit: cidiData?.cuit || '27-457475-9',
                    represented: cidiData?.represented || 'Camila Gonzales',
                    categoria: cidiData?.category || 'Profesional de la salud',
                    profesion: tipoProfesion || 'Médico',
                    especialidades: especialidadMedica,
                  })
                } else {
                  onGoBack()
                }
              }}
              style={{
                width: '100%',
                padding: '11px 24px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#00AC99',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.25s ease',
                marginBottom: '16px',
                boxShadow: '0 4px 10px rgba(0, 172, 153, 0.2)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#009584'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00AC99'}
            >
              Entendido
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                alert('Listado de contactos de Colegios Profesionales...')
              }}
              style={{
                fontSize: '13.5px',
                color: '#0056b3',
                textDecoration: 'none',
                fontWeight: 600,
                display: 'inline-block',
                cursor: 'pointer',
              }}
            >
              Ver cómo contactar a mi colegio
            </a>
          </div>
        </div>
      )}

      {/* ── ADD PROFESSIONAL MODAL (Paso 3) ── */}
      {showStaffModal && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(3px)',
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '28px 32px',
            width: '640px',
            maxWidth: '95%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            boxSizing: 'border-box',
          }}>

            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', margin: '0 0 2px 0' }}>
              Staff
            </h3>
            <p style={{ fontSize: '12.5px', color: '#6B7280', margin: '0 0 20px 0' }}>
              Por favor, completá la siguiente información obligatoria (*)
            </p>

            <SectionTitle>Staff</SectionTitle>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              rowGap: '16px',
              columnGap: '20px',
              marginBottom: '20px',
            }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                  CUIT/CUIL <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={staffCuit}
                  onChange={(e) => setStaffCuit(e.target.value)}
                  style={{
                    width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                    padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                  Nombre y Apellido
                </label>
                <input
                  type="text"
                  value={staffNombre}
                  onChange={(e) => setStaffNombre(e.target.value)}
                  style={{
                    width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                    padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                    backgroundColor: '#F3F4F6', outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                  Especialidad <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={staffEspecialidad}
                  onChange={(e) => setStaffEspecialidad(e.target.value)}
                  style={{
                    width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                    padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '8px' }}>
                  Prescriptor
                </label>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', height: '36px' }}>
                  <div
                    onClick={() => setStaffPrescriptor(true)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', userSelect: 'none' }}
                  >
                    <div style={{
                      width: '16px', height: '16px', borderRadius: '3px',
                      border: staffPrescriptor ? '2px solid #00AC99' : '2px solid #bbb',
                      backgroundColor: staffPrescriptor ? '#00AC99' : '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {staffPrescriptor && <CheckIcon />}
                    </div>
                    <span style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>Sí</span>
                  </div>

                  <div
                    onClick={() => setStaffPrescriptor(false)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', userSelect: 'none' }}
                  >
                    <div style={{
                      width: '16px', height: '16px', borderRadius: '3px',
                      border: !staffPrescriptor ? '2px solid #00AC99' : '2px solid #bbb',
                      backgroundColor: !staffPrescriptor ? '#00AC99' : '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {!staffPrescriptor && <CheckIcon />}
                    </div>
                    <span style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>No</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                Número de Matrícula Profesional o Registro Provincial <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <input
                type="text"
                value={staffMatricula}
                onChange={(e) => setStaffMatricula(e.target.value)}
                style={{
                  width: '100%', border: '1.5px solid #00AC99', borderRadius: '6px',
                  padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                  backgroundColor: '#F0FDF4', outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{
              display: 'flex', justifyContent: 'space-between', gap: '12px',
              borderTop: '1px solid #ebebeb', paddingTop: '20px',
            }}>
              <button
                onClick={() => setShowStaffModal(false)}
                style={{
                  flex: 1, padding: '10px 24px', borderRadius: '6px',
                  border: '1px solid #d0d0d0', backgroundColor: '#fff',
                  color: '#555', fontSize: '14px', fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Anterior
              </button>

              <button
                onClick={handleAddStaffMember}
                style={{
                  flex: 1, padding: '10px 24px', borderRadius: '6px',
                  border: 'none', fontSize: '14px', fontWeight: 600,
                  cursor: 'pointer', backgroundColor: '#00AC99', color: '#fff',
                }}
              >
                Continuar
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── ADD/EDIT LOCATION MODAL (Paso 4) ── */}
      {showLocationModal && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(3px)',
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '24px 32px',
            width: '900px',
            maxWidth: '95%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            boxSizing: 'border-box',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>

            {/* Header row with Location pin and text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #E5E7EB', paddingBottom: '16px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                backgroundColor: '#E6F6F4', color: '#00AC99',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: 0 }}>
                {editingLocationIndex !== null ? 'Editar lugar de atención' : 'Agregar lugar de atención'}
              </h3>
            </div>

            {/* Row 1: Nombre Fantasía & Guardia check */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              columnGap: '24px',
              rowGap: '16px',
              marginBottom: '16px',
            }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                  Nombre Fantasía <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={locNombre}
                  onChange={(e) => setLocNombre(e.target.value)}
                  style={{
                    width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                    padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '8px' }}>
                  Tiene Servicio de Guardia
                </label>
                <div
                  onClick={() => setLocGuardia(!locGuardia)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', userSelect: 'none', height: '36px' }}
                >
                  <div style={{
                    width: '16px', height: '16px', borderRadius: '3px',
                    border: locGuardia ? '2px solid #00AC99' : '2px solid #bbb',
                    backgroundColor: locGuardia ? '#00AC99' : '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {locGuardia && <CheckIcon />}
                  </div>
                  <span style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>Si</span>
                </div>
              </div>
            </div>

            <SectionTitle>Direccion</SectionTitle>

            {/* Row 2: Calle, Puerta, Depto, CP */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              gap: '16px',
              marginBottom: '16px',
            }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                  Calle <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={locCalle}
                  onChange={(e) => setLocCalle(e.target.value)}
                  style={{
                    width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                    padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                  Nº (puerta) <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={locPuerta}
                  onChange={(e) => setLocPuerta(e.target.value)}
                  style={{
                    width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                    padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                  Apartamento
                </label>
                <input
                  type="text"
                  value={locDepto}
                  onChange={(e) => setLocDepto(e.target.value)}
                  style={{
                    width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                    padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                  Código Postal <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={locCP}
                  onChange={(e) => setLocCP(e.target.value)}
                  style={{
                    width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                    padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Row 3: Barrio, Localidad */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '16px',
            }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                  Barrio
                </label>
                <input
                  type="text"
                  value={locBarrio}
                  onChange={(e) => setLocBarrio(e.target.value)}
                  style={{
                    width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                    padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                  Localidad
                </label>
                <input
                  type="text"
                  value={locLocalidad}
                  onChange={(e) => setLocLocalidad(e.target.value)}
                  style={{
                    width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                    padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Row 4: Otros Datos */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                Otros Datos
              </label>
              <input
                type="text"
                value={locOtros}
                onChange={(e) => setLocOtros(e.target.value)}
                style={{
                  width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                  padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            <SectionTitle>Contacto</SectionTitle>

            {/* Row 5: Tel turnos, emergencias, email */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '16px',
              marginBottom: '16px',
            }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                  Teléfono para turnos
                </label>
                <input
                  type="text"
                  value={locTelTurnos}
                  onChange={(e) => setLocTelTurnos(e.target.value)}
                  style={{
                    width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                    padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                  Teléfono para emergencias
                </label>
                <input
                  type="text"
                  value={locTelEmergencia}
                  onChange={(e) => setLocTelEmergencia(e.target.value)}
                  style={{
                    width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                    padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                  Dirección de email (Institucional)
                </label>
                <input
                  type="text"
                  value={locEmail}
                  onChange={(e) => setLocEmail(e.target.value)}
                  style={{
                    width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                    padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            <SectionTitle>Horarios de Atención</SectionTitle>

            {/* Lista de franjas horarias */}
            {locHorarios.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                {locHorarios.map((h, idx) => (
                  <div key={idx} style={{
                    border: '1px solid #E5E7EB', borderRadius: '8px',
                    padding: '12px 14px', backgroundColor: '#F9FAFB',
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '12px', alignItems: 'end' }}>

                      {/* Días selector */}
                      <div style={{ position: 'relative' }}>
                        <label style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Días</label>
                        <div
                          onClick={() => setLocHorarios(locHorarios.map((x, i) => i === idx ? { ...x, diaOpen: !x.diaOpen } : { ...x, diaOpen: false }))}
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            border: '1px solid #D1D5DB', borderRadius: '6px',
                            padding: '7px 10px', fontSize: '13px', color: h.dias.length > 0 ? '#1F2937' : '#9CA3AF',
                            backgroundColor: '#fff', cursor: 'pointer', userSelect: 'none', boxSizing: 'border-box',
                          }}
                        >
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }}>
                            {h.dias.length > 0 ? h.dias.join(', ') : 'Seleccionar...'}
                          </span>
                          <ChevronDownIcon />
                        </div>
                        {h.diaOpen && (
                          <div style={{
                            position: 'absolute', top: '100%', left: 0, right: 0,
                            marginTop: '4px', backgroundColor: '#fff', border: '1px solid #D1D5DB',
                            borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            zIndex: 1020, maxHeight: '180px', overflowY: 'auto',
                          }}>
                            {locDiaOptions.map((opt) => (
                              <div
                                key={opt}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  const updated = locHorarios.map((x, i) => {
                                    if (i !== idx) return x
                                    const dias = x.dias.includes(opt) ? x.dias.filter(d => d !== opt) : [...x.dias, opt]
                                    return { ...x, dias }
                                  })
                                  setLocHorarios(updated)
                                }}
                                style={{
                                  padding: '8px 12px', fontSize: '13px', cursor: 'pointer',
                                  backgroundColor: h.dias.includes(opt) ? '#E6F6F4' : '#fff',
                                  color: h.dias.includes(opt) ? '#00AC99' : '#1F2937',
                                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                  fontWeight: h.dias.includes(opt) ? 600 : 400,
                                }}
                              >
                                {opt}
                                {h.dias.includes(opt) && <CheckIcon />}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Hora inicio */}
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Desde</label>
                        <input
                          type="text"
                          placeholder="08:00"
                          value={h.inicio}
                          onChange={(e) => setLocHorarios(locHorarios.map((x, i) => i === idx ? { ...x, inicio: e.target.value } : x))}
                          style={{
                            width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                            padding: '7px 10px', fontSize: '13px', color: '#1F2937',
                            outline: 'none', boxSizing: 'border-box',
                          }}
                        />
                      </div>

                      {/* Hora fin */}
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Hasta</label>
                        <input
                          type="text"
                          placeholder="18:00"
                          value={h.fin}
                          onChange={(e) => setLocHorarios(locHorarios.map((x, i) => i === idx ? { ...x, fin: e.target.value } : x))}
                          style={{
                            width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                            padding: '7px 10px', fontSize: '13px', color: '#1F2937',
                            outline: 'none', boxSizing: 'border-box',
                          }}
                        />
                      </div>

                      {/* Eliminar fila */}
                      <button
                        onClick={() => setLocHorarios(locHorarios.filter((_, i) => i !== idx))}
                        style={{
                          width: '30px', height: '30px', borderRadius: '6px',
                          border: '1px solid #FCA5A5', backgroundColor: '#FEF2F2',
                          color: '#DC2626', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, fontSize: '14px', fontWeight: 'bold',
                        }}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Botón Agregar Horario */}
            <div
              onClick={() => setLocHorarios([...locHorarios, { dias: [], inicio: '', fin: '', diaOpen: false }])}
              style={{
                border: '1px dashed #00AC99',
                borderRadius: '6px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#fff',
                cursor: 'pointer',
                marginBottom: '28px',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F0FDF9')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
            >
              <div style={{
                width: '22px', height: '22px', borderRadius: '4px',
                backgroundColor: '#E6F6F4', color: '#00AC99',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', fontWeight: 'bold', flexShrink: 0,
              }}>+</div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#00AC99' }}>
                Agregar Horario de Atención
              </span>
            </div>


            {/* Modal action buttons */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', gap: '12px',
              borderTop: '1px solid #ebebeb', paddingTop: '20px',
            }}>
              <button
                onClick={() => setShowLocationModal(false)}
                style={{
                  flex: 1, padding: '10px 24px', borderRadius: '6px',
                  border: '1px solid #d0d0d0', backgroundColor: '#fff',
                  color: '#555', fontSize: '14px', fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>

              <button
                onClick={handleConfirmLocation}
                style={{
                  flex: 1, padding: '10px 24px', borderRadius: '6px',
                  border: 'none', fontSize: '14px', fontWeight: 600,
                  cursor: 'pointer', backgroundColor: '#00AC99', color: '#fff',
                }}
              >
                Confirmar
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL (Paso 4) ── */}
      {showDeleteConfirmModal && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          backdropFilter: 'blur(3px)',
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '24px',
            padding: '36px 32px',
            width: '420px',
            maxWidth: '90%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            textAlign: 'center',
            boxSizing: 'border-box',
            position: 'relative',
          }}>

            {/* Close Button X at top right */}
            <button
              onClick={() => setShowDeleteConfirmModal(false)}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                border: 'none', backgroundColor: 'transparent',
                color: '#9CA3AF', fontSize: '22px', cursor: 'pointer',
                fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              ×
            </button>

            {/* Red Alert Exclamation Badge */}
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              backgroundColor: '#FEE2E2', color: '#EF4444',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px auto'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <h3 style={{
              fontSize: '17px',
              fontWeight: 700,
              color: '#0F172A',
              marginBottom: '10px',
              lineHeight: 1.4,
            }}>
              {itemToDeleteType === 'lugar' ? '¿Estás seguro de eliminar este lugar de atención?' :
                itemToDeleteType === 'staff' ? '¿Estás seguro de eliminar este profesional?' :
                  '¿Estás seguro de eliminar esta experiencia profesional?'}
            </h3>

            <p style={{
              fontSize: '13.5px',
              color: '#6B7280',
              marginBottom: '24px',
            }}>
              Esta acción no se puede deshacer.
            </p>

            <button
              onClick={handleConfirmDelete}
              style={{
                width: '100%',
                padding: '11px 24px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#EF4444',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                boxShadow: '0 4px 10px rgba(239, 68, 68, 0.2)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DC2626'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#EF4444'}
            >
              Confirmar
            </button>
          </div>
        </div>
      )}

      {/* ── ANTECEDENTES MODAL (Paso 6) ── */}
      {showAntecedentesModal && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(3px)',
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '28px 32px',
            width: '640px',
            maxWidth: '95%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            boxSizing: 'border-box',
          }}>

            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', margin: '0 0 2px 0' }}>
              Antecedentes
            </h3>
            <p style={{ fontSize: '12.5px', color: '#6B7280', margin: '0 0 20px 0' }}>
              Registrá tu experiencia profesional y los establecimientos donde ejerciste tu actividad.
            </p>

            {/* Description Row (Full Width) */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                Descripción <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Ej: título, curso, cargo laboral"
                value={antecedenteDescripcion}
                onChange={(e) => setAntecedenteDescripcion(e.target.value)}
                style={{
                  width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                  padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Grid 2 Columns for Período Inicio & Fin */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: '20px',
              rowGap: '16px',
              marginBottom: '16px',
            }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                  Período Inicio <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={antecedentePeriodoInicio}
                    onChange={(e) => setAntecedentePeriodoInicio(e.target.value)}
                    style={{
                      width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                      padding: '7px 12px 7px 34px', fontSize: '13.5px', color: '#1F2937',
                      outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                  <span style={{ position: 'absolute', left: '10px', top: '9px', color: '#888', display: 'flex', alignItems: 'center' }}>
                    <CalendarIcon />
                  </span>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                  Período Fin <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={antecedentePeriodoFin}
                    onChange={(e) => setAntecedentePeriodoFin(e.target.value)}
                    style={{
                      width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                      padding: '7px 12px 7px 34px', fontSize: '13.5px', color: '#1F2937',
                      outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                  <span style={{ position: 'absolute', left: '10px', top: '9px', color: '#888', display: 'flex', alignItems: 'center' }}>
                    <CalendarIcon />
                  </span>
                </div>
              </div>

              {/* Establecimiento & Establecimiento CUIT */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                  Establecimiento <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={antecedenteEstablecimiento}
                  onChange={(e) => setAntecedenteEstablecimiento(e.target.value)}
                  style={{
                    width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                    padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>
                  Establecimiento CUIT
                </label>
                <input
                  type="text"
                  value={antecedenteEstablecimientoCuit}
                  onChange={(e) => setAntecedenteEstablecimientoCuit(e.target.value)}
                  style={{
                    width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px',
                    padding: '7px 12px', fontSize: '13.5px', color: '#1F2937',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', gap: '12px',
              borderTop: '1px solid #ebebeb', paddingTop: '20px',
              marginTop: '24px',
            }}>
              <button
                onClick={() => setShowAntecedentesModal(false)}
                style={{
                  flex: 1, padding: '10px 24px', borderRadius: '6px',
                  border: '1px solid #d0d0d0', backgroundColor: '#fff',
                  color: '#555', fontSize: '14px', fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>

              <button
                onClick={handleAddAntecedente}
                style={{
                  flex: 1, padding: '10px 24px', borderRadius: '6px',
                  border: 'none', fontSize: '14px', fontWeight: 600,
                  cursor: 'pointer', backgroundColor: '#00AC99', color: '#fff',
                }}
              >
                Confirmar
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── SUCCESS COMPLETION MODAL ── */}
      {showSuccessModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          backdropFilter: 'blur(3px)',
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '24px',
            padding: '60px 48px',
            width: '840px',
            maxWidth: '95%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            textAlign: 'center',
            boxSizing: 'border-box',
          }}>

            {/* Circular Teal Badge with white FileUp Icon */}
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              backgroundColor: '#00AC99', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px auto'
            }}>
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M12 18v-6" />
                <path d="m9 15 3-3 3 3" />
              </svg>
            </div>

            <h3 style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#0F172A',
              marginBottom: '12px',
              lineHeight: 1.3,
            }}>
              {estadoPostulacion === 'aceptado' ? '¡Pre-inscripción exitosa!' : '¡Postulación exitosa!'}
            </h3>

            <p style={{
              fontSize: '14px',
              color: '#6B7280',
              lineHeight: '1.6',
              maxWidth: '540px',
              margin: '0 auto 36px auto',
            }}>
              {estadoPostulacion === 'aceptado'
                ? 'Tu pre-inscripción ha sido registrada correctamente.'
                : 'Tus datos quedarán en nuestra base y, si tu perfil avanza a la etapa de inscripción, el sistema te habilitará la carga de la documentación necesaria.'}
            </p>

            <button
              onClick={() => {
                setShowSuccessModal(false)
                if (estadoPostulacion === 'aceptado') {
                  navigate('/fin-prototipo')
                } else if (onComplete) {
                  onComplete({
                    cuit: cuit || cidiData?.cuit || '30-12345678-9',
                    represented: cidiData?.represented || 'Sanatorio Allende S.A.',
                    categoria: cidiData?.category || 'Institución',
                    profesion: tipoProfesion !== 'Selecciona' ? tipoProfesion : undefined,
                    especialidades: especialidadMedica,
                    nivelAtencion: nivelAtencion !== 'Selecciona' ? nivelAtencion : undefined,
                    tipoInstitucionNivel: tipoInstitucionNivel !== 'Selecciona' ? tipoInstitucionNivel : undefined,
                    tipoInstitucion: tipoInstitucion !== 'Selecciona' ? tipoInstitucion : undefined,
                  })
                } else {
                  onGoBack()
                }
              }}
              style={{
                width: '380px',
                margin: '0 auto',
                display: 'block',
                padding: '12px 24px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#00AC99',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#009584'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00AC99'}
            >
              {estadoPostulacion === 'aceptado' ? 'Siguiente' : 'Ir al inicio'}
            </button>
          </div>
        </div>
      )}

      {/* ── CONDUCTOR MODAL ── */}
      {showConductorModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 2000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            backgroundColor: '#fff', borderRadius: '12px', padding: '32px',
            width: '640px', maxWidth: '90%', boxSizing: 'border-box',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '6px' }}>Registrar conductor</h2>
            <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '24px' }}>Por favor, completá la siguiente información obligatoria (*)</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>Nombre <span style={{ color: '#EF4444' }}>*</span></label>
                <input type="text" value={conductorNombre} onChange={(e) => setConductorNombre(e.target.value)}
                  style={{ width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px', padding: '9px 12px', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>Apellido <span style={{ color: '#EF4444' }}>*</span></label>
                <input type="text" value={conductorApellido} onChange={(e) => setConductorApellido(e.target.value)}
                  style={{ width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px', padding: '9px 12px', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>CUIT/CUIL <span style={{ color: '#EF4444' }}>*</span></label>
                <input type="text" value={conductorCuit} onChange={(e) => setConductorCuit(e.target.value)}
                  style={{ width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px', padding: '9px 12px', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '5px' }}>Cargo</label>
                <input type="text" value={conductorCargo} onChange={(e) => setConductorCargo(e.target.value)} placeholder="Chofer suplente"
                  style={{ width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px', padding: '9px 12px', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
              {['Licencia de conducir', 'Autorización manejo'].map((docName) => (
                <AttachmentRow
                  key={docName}
                  title={docName}
                  fileName={null}
                  onAttach={() => { }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowConductorModal(false)}
                style={{ flex: 1, padding: '11px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#fff', color: '#374151', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
                Anterior
              </button>
              <button
                onClick={() => {
                  if (conductorNombre && conductorApellido && conductorCuit) {
                    setConductoresList([...conductoresList, {
                      nombre: `${conductorNombre.toUpperCase()} ${conductorApellido.toUpperCase()}`,
                      cuit: conductorCuit,
                      licenciaConducir: true,
                      autorizacionManejo: true,
                      cargo: conductorCargo || 'Chofer'
                    }])
                    setShowConductorModal(false)
                  }
                }}
                style={{ flex: 1, padding: '11px', borderRadius: '6px', border: 'none', backgroundColor: '#00AC99', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}




