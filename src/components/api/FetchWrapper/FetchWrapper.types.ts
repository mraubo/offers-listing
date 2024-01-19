import { ApolloError } from '@apollo/client'

export interface FetchWrapperProps {
  loading: boolean
  error: ApolloError | null
}
