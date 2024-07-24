import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageEpi from './Pages/PageEpi';
import CadastroEpi from './Pages/PageEpi/CadastrarEpi'
import PageUsers from './Pages/PageUsers';
import PageMarcas from './Pages/PageMarcas';
import PageNotFound from './Pages/PageNotFound';
import CadastrarMarcas from './Pages/PageMarcas/CadastrarMarcas';
import CadastrarUsers from './Pages/PageUsers/CadastrarUsers';

function RoutersApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PageEpi />} />
        <Route path='/cadastro-epi' element={<CadastroEpi />} />
        <Route path='/usuarios' element={<PageUsers />} />
        <Route path='/cadastro-usuarios' element={<CadastrarUsers />} />
        <Route path='/marcas' element={<PageMarcas />} />
        <Route path='/cadastro-marcas' element={<CadastrarMarcas />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>

    </BrowserRouter>
  );
}

export default RoutersApp;
