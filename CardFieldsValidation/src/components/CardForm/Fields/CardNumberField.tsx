import { TextField } from '@mui/material'
import { useField } from 'formik'
import { useState } from 'react'

export function CardNumberField() {
  const [field, meta, helpers] = useField('cardNumber')
  const [isFocused, setIsFocused] = useState(false)

  const formatCardNumber = (value: string) =>
    value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')

  const maskCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 6)
      return cleaned
    return `${cleaned.slice(0, 2)}** **** ${cleaned.slice(-4)}`
  }

  return (
    <TextField
      fullWidth
      label="Номер карты"
      value={isFocused ? formatCardNumber(field.value) : maskCardNumber(field.value)}
      onChange={e => helpers.setValue(e.target.value.replace(/\D/g, ''))}
      onFocus={() => setIsFocused(true)}
      onBlur={() => {
        helpers.setTouched(true)
        setIsFocused(false)
      }}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      inputProps={{ maxLength: 19 }}
    />
  )
}
