import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowUpRight, Menu, X } from 'lucide-react'
import './styles.css'

const sensors = [
  { no: '01', label: 'Laddtryck', value: '1.42', unit: 'BAR', note: 'För turbomotorer' },
  { no: '02', label: 'Oljetryck', value: '4.8', unit: 'BAR', note: 'Motorns arbetstryck' },
  { no: '03', label: 'Vattentemp.', value: '86', unit: '°C', note: 'Kylsystemets temperatur' },
  { no: '04', label: 'Oljetemp.', value: '94', unit: '°C', note: 'Oljans arbetstemperatur' },
  { no: '05', label: 'Batteri', value: '14.2', unit: 'V', note: 'Laddning / elsystem' },
]

function Gauge({ label, value, unit, arc = 72 }: { label: string; value: string; unit: string; arc?: number }) {
  return (
    <div className="gauge">
      <div className="gauge-ring" style={{ '--arc': `${arc}%` } as React.CSSProperties}>
        <div className="gauge-inner">
          <span>{label}</span>
          <strong>{value}</strong>
          <small>{unit}</small>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => setLoaded(true), [])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <div className={`site-shell ${loaded ? 'is-loaded' : ''}`}>
      <header className="nav-wrap">
        <nav className="nav">
          <a href="#top" className="brand" onClick={close} aria-label="Morik Racing UF">
            <span className="brand-mark">MR</span>
            <span className="brand-copy"><strong>Morik Racing</strong><i>UF</i></span>
          </a>
          <div className="desktop-nav">
            <a href="#product">Produkten</a>
            <a href="#sensors">Sensorer</a>
            <a href="#project">Projektet</a>
            <a href="#contact" className="nav-contact">Kontakt <ArrowUpRight size={14} /></a>
          </div>
          <button className="menu-button" onClick={() => setMenuOpen(v => !v)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Stäng meny' : 'Öppna meny'}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <a href="#product" onClick={close}>Produkten <span>01</span></a>
          <a href="#sensors" onClick={close}>Sensorer <span>02</span></a>
          <a href="#project" onClick={close}>Projektet <span>03</span></a>
          <a href="#contact" onClick={close}>Kontakt <span>04</span></a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-kicker reveal delay-1"><span>01 — MORIK RACING UF</span><span>WEST COAST / SWEDEN</span></div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow reveal delay-1">Digital instrumentering för riktiga bilar</p>
              <h1 className="hero-title reveal delay-2">Keep the<br /><em>character.</em><br />Know the data.</h1>
              <p className="hero-lead reveal delay-3">En diskret digital informationsskärm för veteranbilar och bilentusiaster. Viktig motordata, samlad på ett ställe.</p>
              <div className="hero-actions reveal delay-3">
                <a href="#product" className="button-primary">Upptäck systemet <ArrowUpRight size={16} /></a>
                <a href="#sensors" className="text-link">Se vad vi mäter <ArrowDown size={15} /></a>
              </div>
            </div>
            <div className="hero-product reveal delay-2">
              <div className="product-frame">
                <div className="frame-top"><span>MR / 001</span><span>PROTOTYPE</span></div>
                <div className="display">
                  <div className="display-head"><span>ENGINE MONITOR</span><span className="live"><b /> LIVE</span></div>
                  <div className="display-gauges">
                    <Gauge label="BOOST" value="1.42" unit="BAR" arc={78} />
                    <Gauge label="OIL" value="4.8" unit="BAR" arc={65} />
                  </div>
                  <div className="display-data">
                    <div><span>WATER</span><strong>86°</strong></div>
                    <div><span>OIL TEMP</span><strong>94°</strong></div>
                    <div><span>VOLT</span><strong>14.2</strong></div>
                  </div>
                </div>
                <div className="frame-bottom"><span>UNIVERSAL SENSOR INPUT</span><span>MR-DG / 001</span></div>
              </div>
              <span className="product-caption">DIGITAL GAUGE / CONCEPT 001</span>
            </div>
          </div>
          <div className="hero-foot"><span>Designed in Sweden</span><span>Scroll to explore <ArrowDown size={14} /></span></div>
        </section>

        <section id="product" className="intro-section section-grid">
          <div className="section-label"><span>02</span><span>THE PRODUCT</span></div>
          <div className="intro-content">
            <p className="eyebrow">En modern detalj för klassiska maskiner</p>
            <h2>Information utan att<br /><em>förstöra känslan.</em></h2>
            <div className="intro-columns">
              <p>Veteranbilar ska få behålla sin personlighet. Därför utvecklar vi ett digitalt instrument som ger modern motordata utan att bilen behöver kännas modern.</p>
              <p>Skärmen kopplas till universella sensorer och samlar värden som laddtryck, oljetryck, temperaturer och batterispänning i ett tydligt gränssnitt.</p>
            </div>
          </div>
        </section>

        <section id="sensors" className="sensor-section">
          <div className="sensor-heading section-grid">
            <div className="section-label"><span>03</span><span>SENSOR SYSTEM</span></div>
            <div><p className="eyebrow">Fem signaler. Ett gränssnitt.</p><h2>Det du behöver<br /><em>framför dig.</em></h2></div>
          </div>
          <div className="sensor-list">
            {sensors.map((sensor) => (
              <article className="sensor-row" key={sensor.no}>
                <span className="sensor-no">{sensor.no}</span>
                <div className="sensor-name"><h3>{sensor.label}</h3><p>{sensor.note}</p></div>
                <div className="sensor-value"><strong>{sensor.value}</strong><span>{sensor.unit}</span></div>
                <ArrowUpRight className="row-arrow" size={18} />
              </article>
            ))}
          </div>
        </section>

        <section id="project" className="project-section">
          <div className="project-visual">
            <div className="visual-grid" />
            <div className="pcb-mark"><span>MR</span><small>DIGITAL INSTRUMENTATION</small></div>
            <div className="visual-readout"><span>INPUT</span><strong>05</strong><span>CHANNELS</span></div>
          </div>
          <div className="project-copy">
            <p className="eyebrow">04 — Utvecklingen</p>
            <h2>Från idé till<br /><em>fungerande hårdvara.</em></h2>
            <p>Vi utvecklar både elektronik och gränssnitt med samma mål: en produkt som känns genomtänkt i bilen, enkel att läsa och flexibel nog för olika motorbyggen.</p>
            <div className="project-facts"><div><span>FORMAT</span><strong>Kompakt display</strong></div><div><span>INPUT</span><strong>Universella sensorer</strong></div><div><span>FOCUS</span><strong>Automotive / Classic</strong></div></div>
          </div>
        </section>

        <section className="manifesto-section">
          <span className="manifesto-mark">MR</span>
          <blockquote>Modern teknik.<br /><em>Klassisk känsla.</em></blockquote>
          <p>Byggd för människor som hellre öppnar huven än instruktionsboken.</p>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-top"><span>05 / CONTACT</span><span>Morik Racing UF</span></div>
          <div className="contact-main"><p className="eyebrow">Vi bygger fortfarande</p><h2>Har du en bil<br /><em>vi borde bygga för?</em></h2><a className="contact-link" href="mailto:morik.racing@gmail.com">Morik.Racing@gmail.com <ArrowUpRight size={22} /></a></div>
          <div className="contact-bottom"><span>Sweden</span><span>Instagram · @morikracing</span><span>© 2026 Morik Racing UF</span></div>
        </section>
      </main>

      <footer className="footer"><span>Morik Racing UF</span><span>Built for people who build cars.</span></footer>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)

