import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { expect, it } from 'vitest'
import { useUsersList } from '@/api/hooks'

const testData = [
  {
    "email": "Sincere@april.biz",
    "id": 1,
    "name": "Leanne Graham",
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
  },
  {
    "email": "Shanna@melissa.tv",
    "id": 2,
    "name": "Ervin Howell",
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
  },
  {
    "email": "Nathan@yesenia.net",
    "id": 3,
    "name": "Clementine Bauch",
    "phone": "1-463-123-4447",
    "website": "ramiro.info",
  },
  {
    "email": "Julianne.OConner@kory.org",
    "id": 4,
    "name": "Patricia Lebsack",
    "phone": "493-170-9623 x156",
    "website": "kale.biz",
  },
  {
    "email": "Lucio_Hettinger@annie.ca",
    "id": 5,
    "name": "Chelsey Dietrich",
    "phone": "(254)954-1289",
    "website": "demarco.info",
  },
  {
    "email": "Karley_Dach@jasper.info",
    "id": 6,
    "name": "Mrs. Dennis Schulist",
    "phone": "1-477-935-8478 x6430",
    "website": "ola.org",
  },
  {
    "email": "Telly.Hoeger@billy.biz",
    "id": 7,
    "name": "Kurtis Weissnat",
    "phone": "210.067.6132",
    "website": "elvis.io",
  },
  {
    "email": "Sherwood@rosamond.me",
    "id": 8,
    "name": "Nicholas Runolfsdottir V",
    "phone": "586.493.6943 x140",
    "website": "jacynthe.com",
  },
  {
    "email": "Chaim_McDermott@dana.io",
    "id": 9,
    "name": "Glenna Reichert",
    "phone": "(775)976-6794 x41206",
    "website": "conrad.com",
  },
  {
    "email": "Rey.Padberg@karina.biz",
    "id": 10,
    "name": "Clementina DuBuque",
    "phone": "024-648-3804",
    "website": "ambrose.net",
  },
]

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
})


it('should render users list', async () => {


const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

const { result } = renderHook(() => useUsersList(), { wrapper })

await waitFor(() => expect(result.current.isSuccess).toBe(true))

expect(result.current.data).toStrictEqual(testData)
})