import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { ThemeProvider } from './hooks/useTheme'
import Home from './pages/Home'
import MasterFile from './pages/MasterFile'
import SubjectIndex from './pages/SubjectIndex'

function Layout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/:branchId/:subjectId" element={<SubjectIndex />} />
          <Route path="/:branchId/:subjectId/master-file" element={<MasterFile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  )
}
