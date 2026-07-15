import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function ArrowLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link className="arrow-link" to={to}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  )
}
