import { renderToString } from 'react-dom/server';
import App from './App';
import EducationPage from './EducationPage';
import SpecialtyPage from './SpecialtyPage';
import HistoryPage from './HistoryPage';
import { specialties } from './data/specialties';

export function renderPages() {
  return [
    { file: 'index.html', html: renderToString(<App />) },
    { file: 'educacion/index.html', html: renderToString(<EducationPage />) },
    { file: 'historia/index.html', html: renderToString(<HistoryPage />) },
    ...specialties.map(specialty => ({
      file: `${specialty.path.slice(1)}index.html`,
      html: renderToString(<SpecialtyPage specialty={specialty} />),
    })),
  ];
}
