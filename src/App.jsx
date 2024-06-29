import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import Nav from './Components/Nav'
import Footer from './Components/Footer'

import Home from './Pages/Home'
import FourOFour from './Pages/FourOFour'
import Show from './Pages/Show'
import New from './Pages/New'
import Edit from './Pages/Edit'

function App() {

  return (
    <div>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/:index' element={<Show />}/>
        <Route path='/new' element={<New />} />
        <Route path='/:index/edit' element={<Edit />} />
        <Route path='*' element={<FourOFour />}/>
      </Routes>
      {/* <Footer /> */}
    </div>
  )
}

export default App
