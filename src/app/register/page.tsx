'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
 
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleRegister = async () => {
    
    const newErrors = {
      name: form.name.trim() === '' ? 'Campo obrigatório' : '',
      email: form.email.trim() === '' ? 'Campo obrigatório' : '',
      password: form.password.trim() === '' ? 'Campo obrigatório' : '',
    };

    setErrors(newErrors);

    
    if (newErrors.name || newErrors.email || newErrors.password) {
      return;
    }

    try {
      await api.post('/user', form);
      alert('Cadastro realizado com sucesso');
      router.push('/login');
    } catch {
      alert('Erro ao cadastrar');
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Typography variant="h4">Cadastro</Typography>

      <TextField
        name="name"
        label="Nome"
        fullWidth
        margin="normal"
        value={form.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
      />

      <TextField
        name="email"
        label="Email"
        fullWidth
        margin="normal"
        value={form.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />

      <TextField
        name="password"
        type="password"
        label="Senha"
        fullWidth
        margin="normal"
        value={form.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
      />

      <Button variant="contained" fullWidth onClick={handleRegister}>
        Cadastrar
      </Button>
    </Box>
  );
}

