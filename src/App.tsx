import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { MenuBar } from './Components';
import { HomePage, BasicTracker } from './Pages';
import {Wrapper } from './App.styles'

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
    <Wrapper>
      <BrowserRouter>
        <MenuBar>
          <Routes>
            <Route path='/home' element={<HomePage />} />
            <Route path='/tracker/basic' element={<BasicTracker/>}/>
            {/* // TODO(#1): create trackerPage for every year*/}
            <Route path='/tracker/basic/:year' element={<div />}/>
            <Route path='/*' element={<Redirect location='home' />}/>
          </Routes>
        </MenuBar>
      </BrowserRouter>
    </Wrapper>
  );
};

export default App;
