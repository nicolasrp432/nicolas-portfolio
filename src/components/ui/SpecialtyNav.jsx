import { specialties } from '../../data/specialties';

export function SpecialtyNav({ current }) {
  return <nav className="specialty-nav" aria-label="Especialidades">
    {specialties.map(s => <a href={s.path} key={s.id} aria-current={current === s.id ? 'page' : undefined}>
      <span aria-hidden="true">{s.number}</span>{s.short}
    </a>)}
  </nav>;
}
