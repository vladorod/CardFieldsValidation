import { InputAdornment, MenuItem, Select, TextField } from '@mui/material'
import { useField } from 'formik'

export function AmountField() {
  const [field, meta] = useField('amount')
  const [currencyField] = useField('currency')

  return (
    <TextField
      fullWidth
      label="Сумма пополнения"
      type="number"
      {...field}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Select
              label="Валюта"
              {...currencyField}
              variant="standard"
              disableUnderline
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="RUB">RUB</MenuItem>
            </Select>
          </InputAdornment>
        ),
      }}
    />
  )
}
