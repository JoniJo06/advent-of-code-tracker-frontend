import { styled } from '@mui/material/styles';

export const Wrapper = styled('div')(({theme})=>({
  '& .link': {
    color: theme.palette.primary.dark,
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover':{
      color: theme.palette.primary.light
    }
  }
}))