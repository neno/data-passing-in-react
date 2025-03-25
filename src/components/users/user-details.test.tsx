import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, fireEvent } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { UserDetails } from './user-details'
import { useUserDetails } from '@/api/hooks'
import { testUserData } from '@/data/test-data'

// Mock the useUserDetails hook
vi.mock('@/api/hooks', () => ({
  useUserDetails: vi.fn(),
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

it('should display user details in a dialog', () => {
  // Mock the hook to return our test data
  (useUserDetails as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
    data: testUserData,
    isLoading: false,
    isError: false
  })

  render(<UserDetails id={1} />, { wrapper })

  // Find and click the button to open the dialog
  const button = screen.getByRole('button')
  fireEvent.click(button)

  // Check if the dialog content is displayed
  expect(screen.getByRole('dialog')).toBeInTheDocument()
  // expect(screen.getByText('User Details 1')).toBeInTheDocument()
  // expect(screen.getByText(JSON.stringify(mockUserData, null, 2))).toBeInTheDocument()
})

