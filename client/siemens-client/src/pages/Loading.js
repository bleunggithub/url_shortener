import React from 'react'
import { useQuery } from 'react-query'
import LoadingSpinner from '../components/LoadingSpinner'
import './pages.css'

const Loading = ({ match }) => {
    const {data, isSuccess} = useQuery([`/api/${match.params.id}`])
    isSuccess && (window.location.href = data.long_url)

    return (
        <div className="loading-container">
            <LoadingSpinner />
        </div>
    )
}

export default Loading