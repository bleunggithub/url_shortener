import { render, cleanup, screen } from '@testing-library/react';

import { QueryClientProvider } from 'react-query'
import queryClient from '../utils/queryClient'

import {Input} from '../components/Input'

beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Input />
      </QueryClientProvider>
    )
})

afterEach(cleanup)

afterAll(() => {
  jest.resetModules()
  jest.restoreAllMocks()
});

describe("Input Component", () => {

  it('renders without crashing', () => {
    expect(screen.getByTestId('inputComponent')).toBeInTheDocument()
  })
//   it('display 1 input and 2 buttons', () => {
//   })
//   it('submit button onClick sends post req AND get req (query invalidated)', () => {
//   })
//   it('reset button onclick clear form', () => {
//   })
    
})