import type { ReactNode } from 'react'

export function SectionHeading({ eyebrow, title, aside }: { eyebrow: string; title: ReactNode; aside?: ReactNode }) {
  return (
    <header className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {aside && <div className="section-heading__aside">{aside}</div>}
    </header>
  )
}
