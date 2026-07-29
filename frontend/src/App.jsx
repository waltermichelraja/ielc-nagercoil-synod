import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
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
      "/": "Home",
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

function AppShell() {
  usePageTitle();
  return (
    <>
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/message" element={<Message />} />
          <Route path="/events" element={<Events />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/congregations" element={<Congregations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/circles/:slug" element={<Circle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <AppShell />
    </>
  );
}
