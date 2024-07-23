import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageEpi from './Pages/PageEpi';
import CadastroEpi from './Pages/PageEpi/CadastrarEpi'
import PageUsers from './Pages/PageUsers';
import PageMarcas from './Pages/PageMarcas';
import PageNotFound from './Pages/PageNotFound';

function RoutersApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PageEpi />} />
        <Route path='/cadastro-epi' element={<CadastroEpi />} />
        <Route path='/usuarios' element={<PageUsers />} />
        <Route path='/marcas' element={<PageMarcas />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>

    </BrowserRouter>
  );
}

export default RoutersApp;
