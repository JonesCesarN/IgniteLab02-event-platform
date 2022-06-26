import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthGithub } from './components/AuthGithub'
import { Event } from './pages/Event'
import { PageNotFound } from './pages/PageNotFound'
import { Subscribre } from './pages/Subscribre'

export const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path='/' element={<Subscribre />} />
      <Route path='/event' element={<Event />} />
      <Route path='/event/lesson/:slug' element={<Event />} />
    </Routes>
  )
}
