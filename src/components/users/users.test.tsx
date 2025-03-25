import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { testUserData, testUsersData } from '@/data/test-data'
import { Users } from './users'
import { afterEach } from 'node:test'

// Mock the entire hooks module
vi.mock('@/api/hooks', () => ({
  useUsersList: () => ({
    data: testUsersData,
    isLoading: false,
    isError: false,
  }),
  useUserDetails: () => ({
    data: testUserData,
    isLoading: false,
    isError: false,
  }),
}))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

afterEach(() => {
  queryClient.clear()
  vi.clearAllMocks()
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

it("should render a users table", () => {
  render(<Users />, { wrapper })

  // Check if the table is rendered
  expect(screen.getByRole('table')).toBeInTheDocument()
  
  // Check if all user rows are rendered
  testUsersData.forEach(user => {
    expect(screen.getByText(user.name)).toBeInTheDocument()
    expect(screen.getByText(user.email)).toBeInTheDocument()
    expect(screen.getByText(user.phone)).toBeInTheDocument()
  })
})

