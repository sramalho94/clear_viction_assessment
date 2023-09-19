import { RequestBody } from '@/pages/api/send-call'
import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import { useState } from 'react'

const defaultTheme = createTheme()

const WhiteTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white'
    },
    '&:hover fieldset': {
      borderColor: 'white'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white'
    }
  }
}))

const initialFormState: RequestBody = {
  email: '',
  githubRepoUrl: ''
}

export default function Form() {
  const [formData, setFormData] = useState<RequestBody>(initialFormState)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsLoading(true)

    try {
      const response = await fetch('api/send-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        console.log('Success')
      } else {
        console.error('Failed to send data')
      }
    } catch (error) {
      console.error('Internal server error: ', error)
    }

    setIsLoading(false)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', color: 'white' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register Project
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, borderColor: 'white' }}
          >
            <WhiteTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                style: {
                  color: 'white',
                  borderColor: 'white'
                }
              }}
              InputLabelProps={{
                style: {
                  color: 'white'
                }
              }}
            />
            <WhiteTextField
              margin="normal"
              required
              fullWidth
              id="githubRepoUrl"
              label="Github Repo URL"
              name="githubRepoUrl"
              autoFocus
              value={formData.githubRepoUrl}
              onChange={handleChange}
              InputProps={{
                style: {
                  color: 'white',
                  borderColor: 'white'
                }
              }}
              InputLabelProps={{
                style: {
                  color: 'white'
                }
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2, color: 'white', borderColor: 'white' }}
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register Project'}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
