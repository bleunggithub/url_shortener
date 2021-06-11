import axios from 'axios'
import { QueryClient } from 'react-query'

const defaultQueryFn = async ({queryKey}) => {
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER}${queryKey[0]}`)
    return data
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn
    }
  }
})

export default queryClient