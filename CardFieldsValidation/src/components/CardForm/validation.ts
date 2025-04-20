import * as Yup from 'yup'

export function validateLuhn(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\D/g, '')
  let sum = 0
  let even = false

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(cleaned.charAt(i), 10)
    if (even) {
      digit *= 2
      if (digit > 9)
        digit -= 9
    }
    sum += digit
    even = !even
  }

  return sum % 10 === 0
}

export function validateExpirationDate(value: string): boolean {
  const [monthStr, yearStr] = value.split('/')
  if (!monthStr || !yearStr || monthStr.length !== 2 || yearStr.length !== 2)
    return false

  const month = Number.parseInt(monthStr, 10)
  const year = Number.parseInt(yearStr, 10)
  if (month < 1 || month > 12)
    return false

  const currentYear = new Date().getFullYear() % 100
  const currentMonth = new Date().getMonth() + 1

  return !(year < currentYear || (year === currentYear && month < currentMonth))
}

export const validationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required('Обязательное поле')
    .test('luhn', 'Неверный номер карты', value => validateLuhn(value || '')),
  cvv: Yup.string()
    .required('Обязательное поле')
    .matches(/^\d{3,4}$/, 'Неверный CVV'),
  expirationDate: Yup.string()
    .required('Обязательное поле')
    .test('exp-date', 'Неверная дата', value => validateExpirationDate(value || '')),
  amount: Yup.number()
    .required('Обязательное поле')
    .min(1, 'Минимальная сумма 1'),
  currency: Yup.string().required('Обязательное поле'),
})
