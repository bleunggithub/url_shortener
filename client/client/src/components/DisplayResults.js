import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import './displayResults.css'

export const DisplayResults = () => {
    const { data:urls, isSuccess } = useQuery(['/api'])
    const [copied, setCopied] = useState(false)

    const clearCopied = () => setTimeout(()=>setCopied(false),1500)
    const handleCopy = (e) => {
        e.target.select()
        document.execCommand('copy', false, e.target.value)
        setCopied(true)
        clearCopied()
    }

    useEffect(() => {
        return () => {
            clearTimeout(clearCopied)
        }
    })
    
    return (
        <main className="display-results-container" data-testid="displayResults">
            <p style={{minHeight: '1.5rem'}}>
                        {copied && (<span className="highlighted-text">Copied to clipboard</span>)}
            </p>

            <table className="table">
                <thead >
                    <tr>
                        <th>id</th>
                        <th>shortened url</th>
                        <th>link</th>
                        <th>original url</th>
                    </tr>
                </thead>
                
                <tbody>
                    {isSuccess && urls.allUrl && (urls.allUrl.map(url => (
                        <tr key={url.id}>
                            <td>{url.id}</td>
                            <td>
                                <input 
                                    type="text"
                                    readOnly 
                                    defaultValue={`${process.env.REACT_APP_SERVER}/${url.url_id}`}
                                    className="url-textbox"
                                    onFocus={handleCopy}
                                />
                            </td>
                            <td><Link to={`/${url.url_id}`}>Click Here</Link></td>
                            <td>
                                <input 
                                    type="text"
                                    readOnly 
                                    defaultValue={url.long_url}
                                    className="url-textbox textbox-small"
                                />
                            </td>
                        </tr>
                    )))}
                </tbody>
            </table>
        </main>
    )
}