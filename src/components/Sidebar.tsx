import { useState } from 'react'
import {
  HomeIcon, PersonIcon, FileIcon, ChevronDownIcon
} from './Icons'

const menuItems = [
  { label: 'Inicio', icon: <HomeIcon />, active: true },
  { label: 'Datos Personales', icon: <PersonIcon /> },
  { label: 'Datos de la Institución', icon: <PersonIcon /> },
  { label: 'Datos Fiscales', icon: <PersonIcon /> },
  { label: 'Datos del Perfil', icon: <PersonIcon /> },
  { label: 'Staff', icon: <PersonIcon /> },
  { label: 'Lugares de Atención', icon: <PersonIcon /> },
  { label: 'Seguros y Habilitaciones', icon: <PersonIcon /> },
  { label: 'Documentación Legal', icon: <PersonIcon /> },
  { label: 'CBU', icon: <PersonIcon /> },
]

const extraItems = [
  { label: 'Preliquidaciones', icon: <FileIcon /> },
  { label: 'Facturación / Pagos', icon: <FileIcon /> },
]

export default function Sidebar() {
  const [ayudaOpen, setAyudaOpen] = useState(true)

  return (
    <aside
      style={{ width: '200px', minWidth: '200px', backgroundColor: '#fff', borderRight: '1px solid #e8e8e8', display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      {/* User info */}
      <div style={{ padding: '18px 16px 14px', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '4px',
            backgroundColor: '#e8e8e8', flexShrink: 0
          }} />
          <span style={{ fontSize: '13px', color: '#555', fontWeight: 500 }}>Gonzales, Camila</span>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '10px 0' }}>
        <p style={{ fontSize: '10px', fontWeight: 700, color: '#aaa', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 16px 4px' }}>MENÚ</p>

        {menuItems.map((item) => (
          <button
            key={item.label}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '8px 16px', fontSize: '13px',
              border: 'none', cursor: 'pointer', textAlign: 'left',
              backgroundColor: item.active ? '#00AC99' : 'transparent',
              color: item.active ? '#fff' : '#555',
              fontWeight: item.active ? 600 : 400,
              borderRadius: item.active ? '6px' : '0',
              margin: item.active ? '0 8px' : '0',
              width: item.active ? 'calc(100% - 16px)' : '100%',
            }}
          >
            <span style={{ opacity: item.active ? 1 : 0.7 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}

        <div style={{ borderTop: '1px solid #f0f0f0', margin: '8px 0' }} />

        {extraItems.map((item) => (
          <button
            key={item.label}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              width: '100%', padding: '8px 16px', fontSize: '13px',
              border: 'none', cursor: 'pointer', textAlign: 'left',
              backgroundColor: 'transparent', color: '#555',
            }}
          >
            <span style={{ opacity: 0.7 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}

        <div style={{ borderTop: '1px solid #f0f0f0', margin: '8px 0' }} />

        {/* Ayuda collapsible */}
        <button
          onClick={() => setAyudaOpen(!ayudaOpen)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%', padding: '8px 16px', fontSize: '13px',
            border: 'none', cursor: 'pointer', backgroundColor: 'transparent', color: '#555',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileIcon />
            Ayuda
          </span>
          <span style={{ transform: ayudaOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
            <ChevronDownIcon />
          </span>
        </button>

        {ayudaOpen && (
          <div style={{ paddingLeft: '16px' }}>
            {['Preguntas frecuentes', 'Consultas y reclamos'].map((label) => (
              <button
                key={label}
                style={{
                  display: 'block', width: '100%', padding: '6px 16px',
                  fontSize: '13px', border: 'none', cursor: 'pointer',
                  textAlign: 'left', backgroundColor: 'transparent', color: '#777',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </aside>
  )
}
