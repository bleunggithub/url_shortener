import { render, cleanup, screen, waitFor } from '@testing-library/react';

import { QueryClientProvider } from 'react-query'
import { QueryClient } from 'react-query'
// import queryClient from '../utils/queryClient'

import {getRedirect} from '../utils/getRedirect'
import Loading from '../pages/Loading'

jest.mock('../utils/getRedirect')


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
          queryFn: jest.fn().mockResolvedValue({data:'https://www.bbc.com'})
    }
  }
})


afterEach(cleanup)

afterAll(() => {
  jest.resetModules()
  jest.restoreAllMocks()
});

describe("Home page", () => {

    it('renders loading svg on mount', () => {
        const mockProps = {
                params: {
                id: 'i_am_an_id'
            }
        }

        render(
            <QueryClientProvider client={queryClient}>
                    <Loading match={mockProps}/>
            </QueryClientProvider>
        )

        expect(screen.getByTestId("loading")).toBeInTheDocument()
    })

    it('redirects when data is returned', async () => {

        const mockAxiosValue = {
            request: {
                responseURL: "http://www.bbc.co.uk"
            }
        }
        const mockProps = {
            params: {
                id: 'i_am_an_id'
            }
        }

        getRedirect.mockResolvedValue(mockAxiosValue)

        
        render(
            <QueryClientProvider client={queryClient}>
                <Loading match={mockProps} />
            </QueryClientProvider>
        )

        await waitFor(() => expect(jest.spyOn(window.location, 'assign')
            .mockImplementation(l => {
                expect(l).toEqual(process.env.REACT_APP_DOMAIN)
            }))
        )
    })


})