import { useState } from 'react';
import { manifestoIdeas } from '../../data/manifesto';
import { ArrowLink } from '../ui/ArrowLink';
import { ManifestoConveyor } from '../ui/manifesto-conveyor';

export function Profile() {
  const [paused, setPaused] = useState(false);
  return <section className="section profile manifesto manifesto--compact" id="perfil">
    <div className="manifesto-workbench">
      <header className="manifesto-workbench-intro">
        <span className="eyebrow">02 / Manifiesto personal</span>
        <h2>Así muevo<br /> <em>mis ideas.</em></h2>
        <p>Pienso como un estratega, construyo como un desarrollador y miro como un diseñador.</p>
        <span className="manifesto-instruction">Gira las piezas. Descubre lo que me mueve.</span>
        <ArrowLink href="/educacion/" external={false}>La curiosidad se practica</ArrowLink>
      </header>
      <ManifestoConveyor items={manifestoIdeas} paused={paused} onPausedChange={setPaused} />
    </div>
    <blockquote className="manifesto-statement">
      <p>“No me interesa solo hacer cosas que funcionen, sino <em>dejar huella en este mundo.</em>”</p>
      <cite>Nicolás Rodríguez</cite>
    </blockquote>
  </section>;
}
