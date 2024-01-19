import type { ErrorObject } from '@vuelidate/core'

export const vuelidateErrorExtractor = (errors: ErrorObject[], errorsBE?: string): string[] => {
  const vuelidateErrors = errors.map((error) => error.$message as string)
  if (errorsBE) {
    return vuelidateErrors.concat(errorsBE)
  }
  return vuelidateErrors
}

export const errorMessages = {
  cannotBeSmaller: (value: string) => `Wartość nie może być niższa niż ${value}`,
  cannotBeSmallerThenField: (field: string) => `"Wartość nie może być niższa niż w polu '${field}'`,
  cannotBeGreaterThenField: (field: string) => `"Wartość nie może być wyższa niż w polu '${field}'`
}
