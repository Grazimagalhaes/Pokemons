'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import { api } from '@/utils/api';
import { useEffect, useState } from 'react';

const schema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  type: z.string().min(1, 'Tipo obrigatório'),
  description: z.string().min(1, 'Descrição obrigatória'),
});

type FormData = z.infer<typeof schema>;

export default function NewPokemonPage() {
  const router = useRouter();
  const { id: pokemonId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      type: '',
      description: '',
    },
  });

  const [loading, setLoading] = useState(!!pokemonId);

  
  useEffect(() => {
    if (!pokemonId) return;

    async function fetchPokemon() {
      try {
        const res = await api.get(`/pokemon/${pokemonId}`);
        const { name, type, description } = res.data;
        reset({ name, type, description }); 
      } catch (error) {
        alert('Erro ao carregar dados do Pokémon');
        router.push('/pokemons');
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [pokemonId, reset, router]);

  const onSubmit = async (data: FormData) => {
    try {
      if (pokemonId) {
        await api.put(`/pokemon/${pokemonId}`, data);
        alert('Pokémon atualizado com sucesso!');
      } else {
        await api.post('/pokemon', data);
        alert('Pokémon cadastrado com sucesso!');
      }

      router.push('/pokemons');
    } catch (error) {
      alert('Erro ao salvar Pokémon');
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box maxWidth={500} mx="auto" mt={5}>
      <Typography variant="h4" gutterBottom>
        {pokemonId ? 'Editar Pokémon' : 'Cadastrar Novo Pokémon'}
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
          {pokemonId ? 'Salvar Alterações' : 'Cadastrar'}
        </Button>
      </form>
    </Box>
  );
}


 
