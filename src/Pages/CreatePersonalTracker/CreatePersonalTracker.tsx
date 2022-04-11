import React, { useState } from 'react';
import {Wrapper, Form} from './CreatePersonalTracker.styles'
import { Typography } from '@mui/material';
import {SearchSelectBox} from '../../Components';
import {Button} from '@mui/material'

const CreatePersonalTracker = () => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
    const handleClick  = () => {
    console.log(selectedLanguages)
  }

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault()

  }

  return (
    <Wrapper>
      <Typography variant='h3' align='center'>Create Personal Tracker</Typography>
      <Form onSubmit={handleSubmit}>
        <SearchSelectBox setValue={setSelectedLanguages} />
        <Button sx={{alignSelf: 'center', width: '80%', mt: '20px', fontSize: '1.25rem'}}  size='small' variant='contained' type='submit'>Create</Button>
      </Form>
    </Wrapper>
  )
}

export default CreatePersonalTracker