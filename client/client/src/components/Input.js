import axios from 'axios'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import queryClient from '../utils/queryClient'
import './input.css'

export const Input = () => {
    const [url, setUrl] = useState('')

    const handleClearInput = () => {
        setUrl('')
    }
    
    const handleInputChange = (e) => {
        setUrl(e.target.value)
    }

    const mutation = useMutation(async (url) => {
        return await axios.post(`${process.env.REACT_APP_SERVER}/api`, {
            url
        })
    }, {
        onSuccess: ()=> queryClient.invalidateQueries(['/api'])
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (url === '') return
        mutation.mutate(url)
        setUrl('')
    }

    return (
        <>
            <form onSubmit={handleSubmit} data-testid="inputComponent">
                <input
                    type="text"
                    value={url}
                    placeholder="Paste a Url here"
                    onChange={handleInputChange}
                    className="input"
                />
                <button onClick={handleClearInput} className="button">Clear</button>
                <button type="submit" className="button">Submit</button>
            </form>
        </>
    )
}
