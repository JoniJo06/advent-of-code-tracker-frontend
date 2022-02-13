import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { MenuBar } from './Components';
import { BasicTracker, HomePage } from './Pages';
import { Wrapper } from './App.styles';

type RedirectProps = {
  location: string
}

const Redirect: React.FC<RedirectProps> = ({ location }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/' + location);
  }, [ location, navigate ]);
  return <></>;
};

const YEARS = [ 2015, 2016, 2017, 2018, 2019, 2020, 2021 ];

const App = () => {
  const location = useLocation();
  useEffect(() => {
    if (!localStorage.getItem('yearsInfo')){
      const yearsInfo = {}
      YEARS.forEach((el)=> {
          //@ts-ignore
          yearsInfo[el] = []
        for(let i = 1; i <= 25; i++){
          //@ts-ignore
        yearsInfo[el].push(false)
        }
      })
      localStorage.setItem('yearsInfo', JSON.stringify(yearsInfo))
    }

  }, [ location ]);
  return (
    <Wrapper>
      <MenuBar>
        <Routes>
          <Route path='/home' element={<HomePage />} />
          <Route path='/tracker/basic' element={<BasicTracker />} />
          {/* // TODO(#1): create trackerPage for every year*/}
          <Route path='/tracker/basic/:year' element={<div />} />
          <Route path='/*' element={<Redirect location='home' />} />
        </Routes>
      </MenuBar>
    </Wrapper>
  );
};

export default App;
