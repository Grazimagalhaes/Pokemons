'use client'

import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  Container,
  Stack,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(3, 'Senha obrigatória'),
})

type LoginData = z.infer<typeof schema>

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(schema),
  })

  const [error, setError] = useState('')
  const router = useRouter()

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await axios.get(
        'https://6852ca200594059b23cf16ed.mockapi.io/pokemonsms/user'
      )

      const user = res.data.find(
        (u: any) => u.email === data.email && u.password === data.password
      )

      if (user) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(user))
        }
        router.push('/pokemons')
      } else {
        setError('Email ou senha inválidos')
      }
    } catch (err) {
      setError('Erro ao conectar com a API')
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Stack spacing={2} mt={2}>
            <Button type="submit" variant="contained" fullWidth>
              Entrar
            </Button>

            <Button
              variant="outlined"
              fullWidth
              component={Link}
              href="/register"
            >
              Cadastrar
            </Button>
          </Stack>
        </form>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setError('')} sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  )
}



