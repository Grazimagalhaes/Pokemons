'use client'

import { useEffect, useState } from 'react'
import { api } from '@/utils/api'
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  Button,
  Grid,
  Stack,
  IconButton,
  Tooltip,
  Container,
} from '@mui/material'
import Link from 'next/link'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

interface Pokemon {
  id: string
  name: string
  type: string
  description: string
}

export default function PokemonsPage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPokemons()
  }, [])

  async function fetchPokemons() {
    try {
      const res = await api.get('/pokemon')
      setPokemons(res.data)
    } catch (err) {
      console.error('Erro ao buscar pokémons:', err)
      setPokemons([])
    } finally {
      setLoading(false)
    }
  }

  async function handleDeletePokemon(pokemonId: string) {
    try {
      await api.delete(`/pokemon/${pokemonId}`)
      fetchPokemons()
    } catch (err) {
      console.error('Erro ao deletar pokemon:', err)
    }
  }

  const generatePDF = async () => {
    if (typeof window === 'undefined') return

    const pdfMakeModule = await import('pdfmake/build/pdfmake')
    const pdfFonts = await import('pdfmake/build/vfs_fonts')

    const pdfMake = pdfMakeModule.default || pdfMakeModule
    pdfMake.vfs = pdfFonts?.default?.pdfMake?.vfs || pdfFonts?.pdfMake?.vfs

    const tableBody = [
      ['Nome', 'Tipo', 'Descrição'],
      ...pokemons.map((p) => [p.name, p.type, p.description]),
    ]

    const docDefinition = {
      content: [
        { text: 'Relatório de Pokémons', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*'],
            body: tableBody,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          marginBottom: 10,
        },
      },
    }

    pdfMake.createPdf(docDefinition).download('pokemons.pdf')
  }

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    )

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          gap={2}
          mb={4}
        >
          <Typography variant="h4">Lista de Pokémons</Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Button
              variant="outlined"
              href="/pokemons/new"
              startIcon={<AddIcon />}
            >
              Novo Pokémon
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<PictureAsPdfIcon />}
              onClick={generatePDF}
            >
              Exportar PDF
            </Button>
          </Stack>
        </Box>

        <Grid container spacing={3}>
          {pokemons.map((pokemon) => (
            <Grid
              item
              key={pokemon.id}
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                '@media (min-width: 600px)': { width: '50%' },
                '@media (min-width: 900px)': { width: '33.33%' },
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 3,
                  m: 1,
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {pokemon.name}
                  </Typography>
                  <Chip label={pokemon.type} color="primary" sx={{ mb: 1 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {pokemon.description}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                    <Tooltip title="Editar">
                      <Link href={`/pokemons/${pokemon.id}/edit`} passHref>
                        <IconButton color="primary">
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton
                        color="error"
                        onClick={() => handleDeletePokemon(pokemon.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}


