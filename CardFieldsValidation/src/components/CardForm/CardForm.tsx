import type { FormikHelpers } from 'formik'
import { Button, Grid } from '@mui/material'
import { Formik } from 'formik'
import { AmountField } from './Fields/AmountField'
import { CardNumberField } from './Fields/CardNumberField'
import { CVVField } from './Fields/CVVField'
import { ExpirationDateField } from './Fields/ExpirationDateField'
import { validationSchema } from './validation'

export interface BankInfoFormValues {
  cardNumber: string
  cvv: string
  expirationDate: string
  amount: string
  currency: string
}

export function CardForm() {
  const initialValues: BankInfoFormValues = {
    cardNumber: '',
    cvv: '',
    expirationDate: '',
    amount: '',
    currency: 'USD',
  }

  const handleSubmit = (
    values: BankInfoFormValues,
    actions: FormikHelpers<BankInfoFormValues>,
  ) => {
    console.log('Отправка данных:', values)
    actions.setSubmitting(false)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, isSubmitting, isValid }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} sx={{width: '500px'}}>
            <Grid size={{ xs: 12}}>
              <CardNumberField />
            </Grid>

            <Grid size={{ xs: 6}}>
              <CVVField />
            </Grid> 

            <Grid size={{ xs: 6}}>
              <ExpirationDateField />
            </Grid>

            <Grid size={{ xs: 12}}>
              <AmountField />
            </Grid>

            <Grid size={{ xs: 12}}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid || isSubmitting}
                fullWidth
              >
                Отправить
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  )
}
