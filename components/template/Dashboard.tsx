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
  Modal,
} from '../atoms';
import { AppTheme, Header } from '../molecules';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { RootState } from '../../store/store';
import { fetchAllUsers, createUser } from '../../store/actions/userActions';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

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
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [data, setData] = React.useState({
    name: '',
    numberOfRents: '',
    totalAverageWeightRatings: '',
    recentlyActive: new Date(),
  });

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
  }, [dispatch]);

  const onSubmit = async () => {
    setError('');
    try {
      // Add your submit logic here
      console.log('Data to be submitted:', data);
      await dispatch(createUser(data));
      // Reset the form
      setData({
        name: '',
        numberOfRents: '',
        totalAverageWeightRatings: '',
        recentlyActive: new Date(),
      });
      setIsOpenModal(false);
    } catch (error) {
      setError('Failed to submit data');
      console.error('Error submitting data:', error);
    }
  };

  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              <MainGrid
                onClick={() => {
                  setIsOpenModal(true);
                }}
                data={user}
                status={error}
                text="Create User"
              />
              <Modal
                title="Create User"
                open={isOpenModal}
                onClose={() => setIsOpenModal(false)}
                onEnter={(node: HTMLElement) => {
                  node.classList.add('fade-in');
                }}
                onExited={(node: HTMLElement) => {
                  node.classList.remove('fade-in');
                }}
                onSubmit={onSubmit}
              >
                <TextField
                  fullWidth={true}
                  id="name"
                  label="Name"
                  margin="dense"
                  variant="filled"
                  value={data.name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setData({ ...data, name: event.target.value });
                  }}
                />
                <TextField
                  fullWidth={true}
                  id="rents"
                  label="Rents"
                  margin="dense"
                  variant="filled"
                  value={data.numberOfRents}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    let value = event.target.value;
                    value = value.replace(/[^0-9.]/g, '');

                    const parts = value.split('.');
                    if (parts.length > 2) {
                      value = parts[0] + '.' + parts.slice(1).join('');
                    }

                    setData({ ...data, numberOfRents: value });
                  }}
                />
                <TextField
                  fullWidth={true}
                  id="weight"
                  label="Weight"
                  margin="dense"
                  variant="filled"
                  value={data.totalAverageWeightRatings}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    let value = event.target.value;

                    value = value.replace(/[^0-9.]/g, '');
                    const parts = value.split('.');
                    if (parts.length > 2) {
                      value = parts[0] + '.' + parts.slice(1).join('');
                    }

                    setData({ ...data, totalAverageWeightRatings: value });
                  }}
                />
                <Box component="div" sx={{ p: 2 }}></Box>
                <DateTimePicker
                  label="Recently Active"
                  value={dayjs(data.recentlyActive)}
                  onChange={(newValue) =>
                    setData({
                      ...data,
                      recentlyActive: newValue ? newValue.toDate() : new Date(),
                    })
                  }
                />
              </Modal>
            </Stack>
          </Box>
        </Box>
      </LocalizationProvider>
    </AppTheme>
  );
};

export default DashboardPage;
