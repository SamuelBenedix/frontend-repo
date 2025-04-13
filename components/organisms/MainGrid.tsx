import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Copyright } from '../atoms';
import { CustomizedDataGrid } from '../molecules';
import { Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface Props {
  onClick?: () => void;
  data?: [];
  status?: string;
}

export default function MainGrid(props: Props) {
  const { loading } = useSelector((state: RootState) => state.user);
  console.log('MainGrid props', props.data);

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Button variant="contained" onClick={props.onClick} loading={loading}>
          Fetch Data User
        </Button>
        {/* {error && <Typography>{error as string}</Typography>} */}
        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomizedDataGrid data={props.data} />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
