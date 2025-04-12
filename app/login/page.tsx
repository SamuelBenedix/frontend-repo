'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Box, Typography } from '@mui/material';
import { auth } from '../../firebase';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log('response', response);
      router.push('/');
    } catch (err) {
      console.error(err);
      setError('Invalid login credentials');
    }
  };

  return (
    <Box p={3} display="flex" flexDirection="column" gap={2}>
      <Typography variant="h5">Login</Typography>
      <TextField
        label="Email"
        fullWidth
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
}
