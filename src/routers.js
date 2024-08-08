import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageEpi from './Pages/PageEpi';
import CadastroEpi from './Pages/PageEpi/CadastrarEpi';
import PageUsers from './Pages/PageUsers';
import PageMarcas from './Pages/PageMarcas';
import PageNotFound from './Pages/PageNotFound';
import CadastrarMarcas from './Pages/PageMarcas/CadastrarMarcas';
import CadastrarUsers from './Pages/PageUsers/CadastrarUsers';
import PagePeriferico from './Pages/PagePeriferico';
import CadastrarPeriferico from './Pages/PagePeriferico/CadastroPeriferico';
import PageHome from './Pages/PageHome';

function RoutersApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PageHome />} />
        <Route path='/epi' element={<PageEpi />} />
        <Route path='/cadastro-epi' element={<CadastroEpi />} />
        <Route path='/cadastro-epi/:id' element={<CadastroEpi />} />
        <Route path='/perifericos' element={<PagePeriferico />} />
        <Route path='/cadastro-perifericos' element={<CadastrarPeriferico />} />
        <Route path='/cadastro-perifericos/:id' element={<CadastrarPeriferico />} />
        <Route path='/usuarios' element={<PageUsers />} />
        <Route path='/cadastro-usuarios' element={<CadastrarUsers />} />
        <Route path='/cadastro-usuarios/:id' element={<CadastrarUsers />} />
        <Route path='/marcas' element={<PageMarcas />} />
        <Route path='/cadastro-marcas' element={<CadastrarMarcas />} />
        <Route path='/cadastro-marcas/:id' element={<CadastrarMarcas />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutersApp;
