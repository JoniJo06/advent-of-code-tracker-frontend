import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { MenuBar } from './Components';
import { HomePage } from './Pages';

type RedirectProps = {
  location: string
}

const Redirect: React.FC<RedirectProps> = ({location}) => {
  const navigate = useNavigate()
  useEffect(()=>{
    navigate('/' + location)
  }, [location, navigate])
  return <></>
}

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <MenuBar>
          <Routes>
            <Route path='/home' element={<HomePage />} />
            <Route path='/*' element={<Redirect location='home' />}/>
          </Routes>
        </MenuBar>
      </BrowserRouter>
    </div>
  );
};

export default App;
