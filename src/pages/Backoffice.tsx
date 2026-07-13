import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDownIcon } from '../components/Icons'

function BackofficeHeader() {
  return (
    <header style={{
      height: '60px', backgroundColor: '#fff', borderBottom: '1px solid #e8e8e8',
      display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0,
      gap: '10px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#E28509', fontWeight: 800, fontSize: '14px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>EQUIPO</span>
        <span style={{ color: '#00AC99', fontWeight: 800, fontSize: '24px', letterSpacing: '-0.02em', lineHeight: 1 }}>apross.</span>
      </div>
    </header>
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
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

export default function Backoffice() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F3F4F6', fontFamily: 'Inter, sans-serif' }}>
      <BackofficeHeader />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <BackofficeSidebar />
        
        <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 600, color: '#374151', margin: '0 0 24px 0' }}>Postulantes a prestadores</h1>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#4B5563', margin: 0 }}>4256 Postulaciones</h2>
            <div style={{ position: 'relative', width: '400px' }}>
              <input type="text" placeholder="Buscar por Nombre, CUIT, Matrícula, profesión o departamento..." 
                style={{ width: '100%', padding: '10px 36px 10px 16px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              <svg style={{ position: 'absolute', right: '12px', top: '10px', color: '#9CA3AF' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'flex-end', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', marginBottom: '6px', display: 'block' }}>Tipo</label>
              <div style={{ position: 'relative' }}>
                <select style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #A7F3D0', backgroundColor: '#E6F6F4', fontSize: '13px', color: '#1F2937', appearance: 'none', outline: 'none' }}>
                  <option>Persona Juridica</option>
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
                <select style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #A7F3D0', backgroundColor: '#E6F6F4', fontSize: '13px', color: '#1F2937', appearance: 'none', outline: 'none' }}>
                  <option>Punilla</option>
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                Limpiar Filtros
              </button>
            </div>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB', padding: '0', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #F3F4F6' }}>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#374151' }}>1 resultado</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['Rechazados', 'Postulados', 'Seleccionado', 'Contrato generado', 'Contrato firmado'].map(tab => (
                  <button key={tab} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #D1D5DB', backgroundColor: '#fff', color: '#4B5563', fontSize: '13px', cursor: 'pointer' }}>{tab}</button>
                ))}
                <button style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', backgroundColor: '#00AC99', color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Activos</button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid #F3F4F6', backgroundColor: '#F9FAFB' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{ padding: '8px 16px', borderRadius: '16px', border: '1px solid #D1D5DB', backgroundColor: '#fff', color: '#4B5563', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>Seleccionar todos</button>
                <button style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', backgroundColor: '#00AC99', color: '#fff', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Seleccionar</button>
                <button style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', backgroundColor: '#374151', color: '#fff', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Rechazar</button>
              </div>
              <button style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', backgroundColor: '#00AC99', color: '#fff', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Exportar selección</button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Check</th>
                  <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Iniciador</th>
                  <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Cuil</th>
                  <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Nombre</th>
                  <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Fecha</th>
                  <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Área actual</th>
                  <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: '#fff' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <input type="checkbox" style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #D1D5DB' }} />
                  </td>
                  <td style={{ padding: '16px 20px', fontSize: '13px', color: '#6B7280' }}>Fernando Javie Hidalgo<br/>201234567</td>
                  <td style={{ padding: '16px 20px', fontSize: '13px', color: '#6B7280' }}>2026661523</td>
                  <td style={{ padding: '16px 20px', fontSize: '13px', color: '#374151', fontWeight: 500 }}>Maria Marta Gomez</td>
                  <td style={{ padding: '16px 20px', fontSize: '13px', color: '#6B7280' }}>25/05/2021</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ padding: '6px 12px', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '11px', color: '#4B5563', whiteSpace: 'nowrap' }}>Investigación y desarrollo</span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #D1D5DB', backgroundColor: '#fff', color: '#374151', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Rechazar</button>
                      <button style={{ padding: '6px 12px', borderRadius: '4px', border: 'none', backgroundColor: '#6B7280', color: '#fff', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Aprobar</button>
                      <button style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #D1D5DB', backgroundColor: '#fff', color: '#374151', fontSize: '12px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>Ver Ficha</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
