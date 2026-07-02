// useNavigate removed since we use window.location.href
import Header from '../components/Header'
import Sidebar2 from '../components/Sidebar2'

export default function FinPrototipo() {

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100vh',
      backgroundColor: '#F3F4F6', fontFamily: '"Inter", sans-serif'
    }}>
      <Header />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar2 />
        <main style={{
          flex: 1, overflowY: 'auto', padding: '40px', boxSizing: 'border-box',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: '#fff', borderRadius: '16px', padding: '60px 48px',
            width: '840px', maxWidth: '95%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              backgroundColor: '#10B981', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px auto'
            }}>
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>

            <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#1F2937', marginBottom: '16px' }}>
              Fin del Flujo de Prototipo
            </h3>
            
            <p style={{ fontSize: '16px', color: '#6B7280', lineHeight: '1.6', maxWidth: '540px', margin: '0 auto 40px auto' }}>
              Has completado todas las etapas de Postulación e Inscripción de manera exitosa. 
              Gracias por navegar este prototipo.
            </p>

            <button
              onClick={() => {
                // Clear any drafts to ensure a completely fresh start
                Object.keys(localStorage).forEach(key => {
                  if (key.startsWith('apross_draft_')) localStorage.removeItem(key)
                })
                window.location.href = '/'
              }}
              style={{
                padding: '14px 32px', borderRadius: '8px', border: 'none',
                backgroundColor: '#00AC99', color: '#fff', fontSize: '15px', fontWeight: 600,
                cursor: 'pointer', transition: 'background-color 0.2s',
                boxShadow: '0 4px 6px rgba(0, 172, 153, 0.25)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#009584'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00AC99'}
            >
              Volver al inicio para simular otra vez
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
