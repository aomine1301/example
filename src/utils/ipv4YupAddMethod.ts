import { StringSchema, addMethod, string } from 'yup'

export default addMethod<StringSchema>(string, 'ipv4', (message = 'Invalid IP address', message2 = 'IP address value should be less or equal to 255') => {
  return string()
    .matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
      message,
      excludeEmptyString: true,
    })
    .test('ip', message2, (value: string | undefined) => {
      return value === undefined || value.trim() === '' ? true : value.split('.').find((i) => parseInt(i, 10) > 255) === undefined
    })
})
