import React from 'react'
import { Input } from '../components/Input'
import { DisplayResults } from '../components/DisplayResults'
import './pages.css'

const Home = () => {
  
    return (
        <div className="container">
          <h1>URL Shortener</h1>
          <Input />
          <DisplayResults />
        </div>
    )
}

export default Home