import { FiArrowUpRight } from 'react-icons/fi';
import { GlassPanel } from './GlassPanel';

export function GlassLinkCard({ href, eyebrow, title, description, meta, image }) {
  return <GlassPanel as="a" href={href} className="glass-link-card">
    <span className="eyebrow">{eyebrow}</span>
    {image && <img src={image} alt="" width="100" height="100" loading="lazy" />}
    <strong>{title}</strong>
    <p>{description}</p>
    <span className="glass-link-foot">{meta}<FiArrowUpRight aria-hidden="true" /></span>
  </GlassPanel>;
}
