import { Wrapper } from './HomePage.styles';
import { Divider, Link, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Wrapper>
      <Typography align='center' variant='h1'>AOC-Tracker</Typography>
      <Typography align='center' variant='h5'>The tool to organize all your <Link href='https://adventofcode.com/' >AOC</Link> tasks.</Typography>
      <br/>
      <Divider />
      <br/>
      <Typography variant='body1'>You can start with a basic Table or create a custom Table. You are able to set all
                                  your preferences. For example your can select for everyday a random programming language
                                  from your defined list or list all your selected languages and tick all finished one.</Typography>
    </Wrapper>
  );
};
export default HomePage;