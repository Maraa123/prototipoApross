import { useState } from 'react'
import {
  PencilEditIcon,
  BriefcaseIcon,
  FileIcon,
  ChevronLeftIcon
} from './Icons'

export default function Sidebar2() {
  const [activeItem, setActiveItem] = useState<string>('Actualización de Datos')

  const menuItems = [
    { label: 'Actualización de Datos', icon: <PencilEditIcon size={16} style={{ color: '#4B5563' }} /> },
    { label: 'Trámites', icon: <BriefcaseIcon size={16} style={{ color: '#4B5563' }} /> },
    { label: 'Herr. Administrativas', icon: <FileIcon size={16} style={{ color: '#4B5563' }} /> },
  ]

  return (
    <aside
      style={{
        width: '210px',
        minWidth: '210px',
        backgroundColor: '#fff',
        borderRight: '1px solid #e8e8e8',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Profile Section */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src="/mara_avatar.png"
            alt="Gonzales, Camila"
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '6px',
              objectFit: 'cover',
              border: '1px solid #E5E7EB',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '13.5px', color: '#1F2937', fontWeight: 600, lineHeight: '1.3' }}>
              Gonzales, Camila
            </span>
          </div>
        </div>

        {/* Orange Button */}
        <button
          style={{
            width: '100%',
            backgroundColor: '#E28509',
            color: '#1F2937',
            border: 'none',
            borderRadius: '4px',
            padding: '9px 12px',
            fontSize: '12.5px',
            fontWeight: 600,
            cursor: 'pointer',
            textAlign: 'center',
            boxSizing: 'border-box',
            transition: 'background-color 0.15s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c67305'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E28509'}
        >
          Representar una Empresa
        </button>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', backgroundColor: '#F3F4F6', margin: '0 16px' }} />

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
        <p style={{
          fontSize: '10px',
          fontWeight: 700,
          color: '#9CA3AF',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '0 8px 8px 8px',
          margin: 0,
        }}>
          MENÚ
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {menuItems.map((item) => {
            const isActive = activeItem === item.label
            return (
              <button
                key={item.label}
                onClick={() => setActiveItem(item.label)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '9px 10px',
                  fontSize: '13px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  backgroundColor: isActive ? '#F3F4F6' : 'transparent',
                  color: isActive ? '#111827' : '#4B5563',
                  fontWeight: isActive ? 600 : 500,
                  textAlign: 'left',
                  boxSizing: 'border-box',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = '#F9FAFB'
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                <span style={{ color: '#9CA3AF', display: 'flex', alignItems: 'center' }}>
                  <ChevronLeftIcon />
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </aside>
  )
}
