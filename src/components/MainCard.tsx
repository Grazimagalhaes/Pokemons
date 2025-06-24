import { Card, CardContent, CardHeader, Divider } from '@mui/material'
import { SxProps, Theme } from '@mui/system'
import React from 'react'

type MainCardProps = {
  title?: string
  subheader?: string
  children: React.ReactNode
  darkTitle?: boolean
  content?: boolean
  contentSX?: SxProps<Theme>
  sx?: SxProps<Theme>
  border?: boolean
  elevation?: number
  boxShadow?: boolean
  shadow?: string
}

const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
}

export default function MainCard({
  border = true,
  boxShadow,
  children,
  content = true,
  contentSX = {},
  darkTitle,
  elevation,
  shadow,
  sx = {},
  title,
  ...others
}: MainCardProps) {
  return (
    <Card
      elevation={elevation || 0}
      sx={[
        {
          position: 'relative',
          border: border ? '1px solid' : 'none',
          borderRadius: 1,
          borderColor: 'grey.300',
          boxShadow: boxShadow ? shadow || '0px 2px 14px rgba(32, 40, 45, 0.08)' : 'inherit',
          ':hover': {
            boxShadow: boxShadow ? shadow || '0px 2px 14px rgba(32, 40, 45, 0.08)' : 'inherit'
          }
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
      {...others}
    >
      {title && (
        <CardHeader title={title} sx={headerSX} />
      )}
      {title && <Divider />}
      {content ? <CardContent sx={contentSX}>{children}</CardContent> : children}
    </Card>
  )
}
