import { services } from '../../data/services';
import { SectionHeading } from '../ui/SectionHeading';
import { StackIcons } from '../ui/StackIcons';
import { ServiceOrbitCarousel } from '../ui/service-orbit-carousel';

const HEADING = [[{ text: 'El stack cambia.' }], [{ text: 'El ' }, { text: 'criterio', accent: true }, { text: ' queda.' }]];

export function Toolbox() {
  return (
    <section className="section toolbox" id="herramientas">
      <SectionHeading eyebrow="Mi caja de herramientas" lines={HEADING}
        standfirst="Desarrollo, diseño y estrategia conectados. Explora qué puedo aportar a tu proyecto, con qué herramientas y cómo lo trabajo." />
      <StackIcons />
      <ServiceOrbitCarousel items={services} />
    </section>
  );
}
