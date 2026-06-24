import { MenuIcon, GlobeIcon } from './Icons'

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
        {/* APROSS logo text */}
        <span style={{
          color: '#fff', fontWeight: 800, fontSize: '22px',
          letterSpacing: '-0.5px', fontFamily: 'Georgia, serif',
        }}>
          apross<span style={{ color: '#fff', fontWeight: 300 }}>.</span>
        </span>
      </div>

      {/* Right: globe icon */}
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center' }}>
        <GlobeIcon />
      </button>
    </header>
  )
}
