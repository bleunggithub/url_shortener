import { render, cleanup } from '@testing-library/react';

import { QueryClientProvider } from 'react-query'
import queryClient from '../utils/queryClient'

import Home from '../pages/Home'

afterEach(cleanup)

afterAll(() => {
  jest.resetModules()
  jest.restoreAllMocks()
});

describe("Home page", () => {

  it('renders 2 children on mount without crashing', () => {
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    )
    
    expect(getByTestId('inputComponent')).toBeInTheDocument()
    expect(getByTestId('displayResults')).toBeInTheDocument()
  })
})