import * as React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Accordion, AccordionSummary, AccordionDetails,Divider, Typography, Grid, Card  } from '@material-ui/core/';
import CreatePortfolio from './Dialog';
import tutorialIcon from '../../images/7061982_preview.png'
import ReactYoutubeExample from './youTube'

export default function PortfolioAccordion() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <img src={tutorialIcon} style={{height:'30px',width:'30px'}} />
          <Typography variant='h5'>Tutorial Video</Typography>
          <Divider style={{ margin: '20px 0' }} />
        </AccordionSummary>
        <AccordionDetails>
        <Card  xs={{ maxWidth: 300 }}>
            <ReactYoutubeExample/>
        </Card>
        
          
          

          
                

          
          
        </AccordionDetails>
      </Accordion>
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion> */}
    </div>
  );
}
