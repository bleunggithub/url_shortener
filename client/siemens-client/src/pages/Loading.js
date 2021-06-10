import React from 'react'
import { useQuery } from 'react-query'
import LoadingSpinner from '../components/LoadingSpinner'
import './pages.css'
import { getRedirect } from '../utils/getRedirect'


const Loading = ({ match }) => {
    const {data, isSuccess} = useQuery(['redirect',match.params.id], getRedirect)
    isSuccess && data && (window.location.assign(data))

    return (
        <div className="loading-container">
            <LoadingSpinner />
        </div>
    )
}

export default Loading