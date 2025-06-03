import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Tutorial from './pages/Tutorial'
import Settings from './pages/Settings'
import Autopilot from './pages/Autopilot'
import Portfolio from './pages/Portfolio'
import Farm from './pages/Farm'
import LiveSupport from './pages/LiveSupport'
import Analytic from './pages/Analytic'
import FAQ from './pages/FAQ'
import Sidebar from './components/Sidebar'
import AdvancedFarm from './pages/AdvancedFarm'
import Activity from './pages/Activity'
import Charts from './pages/Charts'
import { ROUTES } from './constants'
import { Body, GlobalStyle } from './components/GlobalStyle'
import Modal from './components/Modal'
import Providers from './providers'
import '@fontsource/work-sans'
import '@fontsource/dm-sans'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useThemeContext } from './providers/useThemeContext'
import LeaderBoard from './pages/LeaderBoard'
import Migrate from './pages/Migrate'

const NewLoginModal = () => {
  const newLogin = localStorage.getItem('newLogin')
  const [open, setOpen] = useState(false)
  const [showModal, setShowModal] = useState(true)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    if (queryParams.has('utm_source') || queryParams.has('utm_medium')) {
      setShowModal(false)
      return
    }

    if (newLogin === null || newLogin === 'true') {
      localStorage.setItem('newLogin', true)
      setOpen(true)
    }
  }, [newLogin])

  return (
    <>
      {showModal && newLogin ? (
        <Modal
          title="Important Notice"
          confirmationLabel="I certify that I read and agree with this warning"
          open={open}
          onClose={() => {
            setOpen(false)
            localStorage.setItem('newLogin', false)
          }}
        >
          Due to regulatory uncertainty, Harvest Finance is not available to people or companies,
          who are residents in the <b>United States or other restricted territory</b>, or who are
          subject to other restrictions. <br /> <br /> By interacting with the Harvest Finance
          website and/or smart contracts, the user acknowledges the experimental nature of yield
          farming with Harvest Finance, its dependency on 3rd party protocols, and the potential for
          total loss of funds deposited. The user accepts full liability for their usage of Harvest
          Finance, and no financial responsibility is placed on the protocol developers and
          contributors.
        </Modal>
      ) : null}
    </>
  )
}

const App = () => (
  <Router>
    <Providers>
      <GlobalStyleWrapper />
      <ToastContainer />
      <NewLoginModal />
      <Body id="page-content">
        <Sidebar width="260px" />
        <Routes>
          <Route path={ROUTES.PORTFOLIO} element={<Portfolio />} />
          <Route path={ROUTES.TUTORIAL} element={<Tutorial />} />
          <Route
            path={ROUTES.AUTOPILOTNOCHAIN}
            element={<Navigate to={ROUTES.AUTOPILOT} replace />}
          />
          <Route path={ROUTES.AUTOPILOT} element={<Autopilot />} />
          <Route path={ROUTES.ADVANCED} element={<Farm />} />
          <Route path={ROUTES.LiveSupport} element={<LiveSupport />} />
          <Route path={ROUTES.ANALYTIC} element={<Analytic />} />
          <Route path={ROUTES.ADVANCEDFARM} element={<AdvancedFarm />} />
          <Route path={ROUTES.FAQ} element={<FAQ />} />
          <Route path={ROUTES.CHARTS} element={<Charts />} />
          <Route path={ROUTES.LEADERBOARD} element={<LeaderBoard />} />
          <Route path={ROUTES.MIGRATE} element={<Migrate />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
          <Route path={ROUTES.ACTIVITY} element={<Activity />} />
        </Routes>
      </Body>
    </Providers>
  </Router>
)

const GlobalStyleWrapper = () => {
  const { bgColorModal, fontColor3, fontColor1, bgColorNew, inputBorderColor } = useThemeContext()

  return (
    <GlobalStyle
      $bgcolormodal={bgColorModal}
      $fontcolor3={fontColor3}
      $fontcolor1={fontColor1}
      $backcolor={bgColorNew}
      $inputbordercolor={inputBorderColor}
    />
  )
}

export default App
