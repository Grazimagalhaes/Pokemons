'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api'; 

const schema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  type: z.string().min(1, 'Tipo obrigatório'),
  description: z.string().min(1, 'Descrição obrigatória'),
});

type FormData = z.infer<typeof schema>;

export default function NewPokemonPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await api.post('/pokemon', data);
      alert('Pokémon cadastrado com sucesso!');
      router.push('/pokemons');
    } catch (error) {
      alert('Erro ao cadastrar Pokémon');
    }
  };

  return (
    <Box maxWidth={500} mx="auto" mt={5}>
      <Typography variant="h4" gutterBottom>
        Cadastrar Novo Pokémon
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Nome"
          fullWidth
          margin="normal"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Tipo"
          fullWidth
          margin="normal"
          {...register('type')}
          error={!!errors.type}
          helperText={errors.type?.message}
        />
        <TextField
          label="Descrição"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Cadastrar
        </Button>
      </form>
    </Box>
  );
}
