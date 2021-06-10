import axios from 'axios'

export const getRedirect = ({ queryKey }) => {
    const [,id] = queryKey
    const data = axios.get(`${process.env.REACT_APP_SERVER}/api/${id}`)
        .then(res => {
            console.log(res)
            let data = res.request.responseURL
            return data
        }).catch(err => console.log(err))
    return data
}