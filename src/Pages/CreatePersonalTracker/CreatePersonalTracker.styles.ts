import {styled} from '@mui/material/styles';
import { Container } from '@mui/material';

export const Wrapper = styled(Container)(({theme}) => ({}))

export const Form = styled('form')(({theme})=>({
  display:'flex',
  flexDirection: 'column'
}))