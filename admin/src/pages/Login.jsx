import React, { useContext, useState } from 'react';
import { TextField, Button, Typography, Box, Alert, Link, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {


  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://steam-hub-backend.vercel.app/api/admin-login', formData);
      localStorage.setItem('token', res.data.token);
      setError('');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
        padding: 2,
      }}
    >
      
      <Paper
        elevation={6}
        sx={{
          maxWidth: 400,
          width: '100%',
          p: 4,
          borderRadius: 3,
          background: 'white',
          textAlign: 'center',
        }}
      >
         <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', display: 'flex',fontSize:"40px", alignItems: 'center' }}>
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ_WQMSRe-FWclMWbJlSj8c7Tv-5ws55Aqgw&s" 
            alt="logo" 
            style={{ marginRight: 8, borderRadius: '50%', width: '100px' }}
          />
          Steam Hub
        </Typography>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontSize:"20px",
            color: '#1976d2',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="User Name"
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              mb: 2,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #1976d2, #004ba0)',
              '&:hover': {
                background: 'linear-gradient(135deg, #004ba0, #1976d2)',
              },
            }}
          >
            Login
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Roboto, sans-serif' }}>
          Don't have an account?{' '}
          <Link
            href="/register"
            sx={{
              color: '#1976d2',
              textDecoration: 'none',
              fontWeight: 'bold',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Register here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;