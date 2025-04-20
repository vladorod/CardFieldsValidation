import { TextField } from '@mui/material'
import { useField } from 'formik'

export function CVVField() {
  const [field, meta] = useField('cvv')

  return (
    <TextField
      fullWidth
      label="CVV"
      type="password"
      {...field}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      inputProps={{ maxLength: 4 }}
    />
  )
}
