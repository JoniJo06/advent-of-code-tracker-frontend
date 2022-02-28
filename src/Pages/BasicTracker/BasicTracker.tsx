import React, { useEffect, useState } from 'react';
import { Wrapper } from './BasicTracker.styles';
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, Divider, Typography } from '@mui/material';
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import yearsInfo from '../../daysInfo.json';

type YearStatusType = Record<number, boolean[]>

const YEARS = [ 2015, 2016, 2017, 2018, 2019, 2020, 2021 ];

const BasicTracker = () => {
  const [ expanded, setExpanded ] = useState<string | false>(false);
  const [ yearsStatus, setYearsStatus ] = useState<YearStatusType>({});

  const handleChange =
          (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
            localStorage.setItem('openYear', JSON.stringify(isExpanded ? panel : false));
          };

  useEffect(() => {
    //@ts-ignore
    setYearsStatus(JSON.parse(localStorage.getItem('yearsInfo')));
    //@ts-ignore
    setExpanded(JSON.parse(localStorage.getItem('openYear')));
  }, []);

  useEffect(() => {
    if (Object.keys(yearsStatus).length > 0)
      localStorage.setItem('yearsInfo', JSON.stringify(yearsStatus));

  }, [ yearsStatus ]);

  return (
    <Wrapper>
      {Object.keys(yearsStatus).length > 0 && YEARS.map((year, i) => {
        return (
          <Accordion key={i} expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />} aria-controls={`panel${i}bh-content`} id={`panel${i}bh-header`}
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {year}
              </Typography>
              <Typography sx={{ flexGrow: 1 }} />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {yearsStatus[year].filter(e => e).length === 25 ? (
                  <CheckBoxIcon fontSize='small' color='primary' />
                ) : (
                   <CheckBoxOutlineBlankIcon fontSize='small' color='disabled' />)}

                <Typography sx={{ color: 'text.secondary' }}>{yearsStatus[year].filter(e => e).length}/25</Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails sx={{ paddingX: 0 }}>
              {yearsStatus[year]?.map((_, i) => {
                return <React.Fragment key={i}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 2 }}>
                    {/*@ts-ignore*/}
                    <Typography sx={{}}>{`Day ${i + 1}: ${yearsInfo[year][i + 1].title}`}</Typography>
                    <Checkbox
                      checked={yearsStatus[year][i]} onClick={() => {
                      setYearsStatus(prev => {
                        const temp = [ ...prev[year] ];
                        temp[i] = !yearsStatus[year][i];
                        return {
                          ...prev,
                          [year]: temp,
                        };
                      });
                    }}
                    />
                  </Box>
                  <Divider />
                </React.Fragment>;
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Wrapper>
  );
};

export default BasicTracker;