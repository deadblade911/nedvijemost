import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useFavorites } from '../features/favorites/FavoritesContext'

const links = [
  { to: '/properties', label: 'Коллекция' },
  { to: '/services', label: 'Услуги' },
  { to: '/about', label: 'Бюро' },
  { to: '/contact', label: 'Контакты' },
]

function Navigation({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Основная навигация">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} onClick={onNavigate}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { pathname, search } = useLocation()
  const { favorites } = useFavorites()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => setOpen(false), [pathname, search])
  useEffect(() => {
    if (!open) return
    const dialog = menuRef.current
    const menuButton = menuButtonRef.current
    const focusable = Array.from(dialog?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])
    const first = focusable[0]
    const last = focusable.at(-1)
    const background = [document.getElementById('main-content'), document.querySelector('footer')]
      .filter((element): element is HTMLElement => element instanceof HTMLElement)
      .map((element) => ({ element, wasInert: element.hasAttribute('inert') }))
    const previousOverflow = document.body.style.overflow

    background.forEach(({ element }) => element.setAttribute('inert', ''))
    document.body.style.overflow = 'hidden'
    first?.focus()

    const keepFocusInside = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }
      if (event.key !== 'Tab' || !first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', keepFocusInside)

    return () => {
      window.removeEventListener('keydown', keepFocusInside)
      background.forEach(({ element, wasInert }) => {
        if (!wasInert) element.removeAttribute('inert')
      })
      document.body.style.overflow = previousOverflow
      menuButton?.focus()
    }
  }, [open])

  return (
    <header className={`site-header ${pathname === '/' ? 'site-header--home' : ''}`}>
      <div className="site-header__inner shell">
        <Link className="wordmark" to="/" aria-label="Locus Estate — на главную">
          <span>LOCUS</span>
          <small>ESTATE</small>
        </Link>
        <div className="site-header__desktop-nav">
          <Navigation />
        </div>
        <div className="site-header__actions">
          <Link className="favorites-link" to="/properties?favorites=1">
            Избранное · {favorites.length}
          </Link>
          <Link className="header-consultation" to="/contact">
            Запросить подбор
          </Link>
          <button
            ref={menuButtonRef}
            className="menu-button"
            type="button"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <div ref={menuRef} className="mobile-menu" role="dialog" aria-modal="true" aria-label="Навигация">
          <div className="mobile-menu__coordinate">55.7558° N · 37.6173° E</div>
          <Navigation onNavigate={() => setOpen(false)} />
          <div className="mobile-menu__footer">
            <Link to="/properties?favorites=1" onClick={() => setOpen(false)}>Избранное · {favorites.length}</Link>
            <a href="tel:+74950211717">+7 (495) 021-17-17</a>
          </div>
        </div>
      )}
    </header>
  )
}
