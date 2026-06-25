import { MenuIcon } from './Icons'

export default function Header() {
  return (
    <header style={{
      height: '52px', backgroundColor: '#E63026',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 16px', flexShrink: 0,
    }}>
      {/* Left: hamburger + logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center' }}>
          <MenuIcon />
        </button>
        {/* APROSS logo image */}
        <img 
          src="/Logo-Apross-prestadores.png" 
          alt="Apross Prestadores" 
          style={{ height: '28px', objectFit: 'contain' }} 
        />
      </div>

      {/* Right: logout / power icon */}
      <button 
        style={{ 
          background: 'none', border: 'none', cursor: 'pointer', color: '#fff', 
          display: 'flex', alignItems: 'center', opacity: 0.9, transition: 'opacity 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
        title="Cerrar sesión"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
          <line x1="12" y1="2" x2="12" y2="12"></line>
        </svg>
      </button>
    </header>
  )
}
