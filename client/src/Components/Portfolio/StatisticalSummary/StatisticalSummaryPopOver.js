import * as React from 'react';
// import Popover from '@@material-ui/material/Popover';
// import Typography from '@@material-ui/material/Typography';
// import Button from '@material-ui/material/Button';
import { Button, Popover,Typography} from '@material-ui/core'
export default function StatisticalSummaryPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Help
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
            <p>
                
            The table compares your portfolo's current investment to the Benchmark(S&P 500).
            </p>
            <p>
                
                Please select a data type to see how you portfolio's value has changed from your initial investment to the current market value
            </p>

        </Typography>
      </Popover>
    </div>
  );
}
