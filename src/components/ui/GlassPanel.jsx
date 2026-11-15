import { LiquidGlass } from './LiquidGlass';

/** A single warm glass treatment for navigation, editorial cards and credentials. */
export function GlassPanel({ className = '', children, ...props }) {
  return <LiquidGlass radius={24} bevelDepth={8} scale={18} aberration={1.2} frost={0.6}
    className={`glass-panel ${className}`} {...props}>{children}</LiquidGlass>;
}
