import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import Message from "./pages/Message.jsx";
import Events from "./pages/Events.jsx";
import Overview from "./pages/Overview.jsx";
import Leadership from "./pages/Leadership.jsx";
import Congregations from "./pages/Congregations.jsx";
import Contact from "./pages/Contact.jsx";
import Circle from "./pages/Circle.jsx";
import NotFound from "./pages/NotFound.jsx";
import site from "./data/site.js";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function usePageTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const map = {
      "/": undefined, // landing page just uses the site name
      "/home": "Home",
      "/message": "Message",
      "/events": "Events",
      "/overview": "Overview",
      "/leadership": "Admin",
      "/congregations": "Congregations",
      "/contact": "Contact",
    };
    const label = map[pathname];
    document.title = label ? `${label} — ${site.shortTitle}` : site.shortTitle;
  }, [pathname]);
}

// Shared shell (header, ticker, footer) for every page except the splash Landing page
function SiteLayout() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function AppRoutes() {
  usePageTitle();
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<SiteLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/message" element={<Message />} />
        <Route path="/events" element={<Events />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/congregations" element={<Congregations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/circles/:slug" element={<Circle />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <AppRoutes />
    </>
  );
}
