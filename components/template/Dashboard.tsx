import * as React from 'react';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { AppNavbar, MainGrid, SideMenu } from '../organisms';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../atoms';
import { AppTheme, Header } from '../molecules';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { RootState } from '../../store/store';
import { fetchAllUsers } from '../../store/actions/userActions';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user) as {
    user: [] | undefined;
  };
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const fetchUsers = async () => {
      setError('');
      try {
        await dispatch(fetchAllUsers());
      } catch (error) {
        setError('Failed to fetch users');
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const onClick = async () => {
    setError('');
    try {
      await dispatch(fetchAllUsers());
    } catch (error) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', error);
    }
  };

  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <MainGrid onClick={onClick} data={user} status={error} />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
};

export default DashboardPage;
