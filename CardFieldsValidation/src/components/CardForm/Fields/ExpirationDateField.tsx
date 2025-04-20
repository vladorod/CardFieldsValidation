import { TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { format } from 'date-fns'
import { useField } from 'formik'

export function ExpirationDateField() {
  const [field, meta, helpers] = useField('expirationDate')

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Дата истечения"
        inputFormat="MM/yy"
        value={field.value}
        onChange={date => helpers.setValue(date ? format(date, 'MM/yy') : '')}
        renderInput={params => (
          <TextField
            {...params}
            fullWidth
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
          />
        )}
      />
    </LocalizationProvider>
  )
}
