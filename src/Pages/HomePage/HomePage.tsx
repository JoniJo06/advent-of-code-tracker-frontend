import { Wrapper } from './HomePage.styles';
import { Divider, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <Typography align='center' variant='h1'>AOC-Tracker</Typography>
      <Typography align='center' variant='h5'>The tool to organize all your <Link className='link'  href='https://adventofcode.com/' >AOC</Link> tasks.</Typography>
      <br/>
      <Divider />
      <br/>
      <Typography variant='body1'>You can start with a <span className='link' onClick={()=> navigate('/tracker/basic')}>basic Table </span>
                                   or create a <span className='link' onClick={()=> navigate('/tracker/personal')}> custom Table </span>
                                  (you need to <span className='link' onClick={()=> navigate('/login')}>login</span>).
                                  You are able to set all your preferences. For example your can select for everyday a random programming language
                                  from your defined list or list all your selected languages and tick all finished one.</Typography>
    </Wrapper>
  );
};
export default HomePage;