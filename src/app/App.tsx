import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { SiteLayout } from '../layout/SiteLayout'
import AboutPage from '../pages/AboutPage'
import ContactPage from '../pages/ContactPage'
import HomePage from '../pages/HomePage'
import NotFoundPage from '../pages/NotFoundPage'
import PropertiesPage from '../pages/PropertiesPage'
import PropertyPage from '../pages/PropertyPage'
import ServicesPage from '../pages/ServicesPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (import.meta.env.MODE !== 'test') window.scrollTo({ top: 0 })
  }, [pathname])
  return null
}

export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="properties" element={<PropertiesPage />} />
          <Route path="properties/:slug" element={<PropertyPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default function App() {
  return <AppRoutes />
}
