import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Auth } from './pages/Auth'
import { Event } from './pages/Event'
import { Subscribre } from './pages/Subscribre'

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Subscribre />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/event' element={<Event />} />
      <Route path='/event/lesson/:slug' element={<Event />} />
    </Routes>
  )
}
