import { PurchaseButton } from './components/purchase-button';
export const dynamic = 'force-dynamic';
export default function Home() {
  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <div className="demo-bar"><span className="status-dot" />Vista de demostración<span className="demo-bar__detail">Sin cobros reales</span></div>
    <header className="site-header shell">
      <a href="#" className="brand" aria-label="EPI10 Salud, inicio"><img src="/images/epi10-blue.png" alt="EPI10" width="132" height="47" /></a>
      <nav className="main-nav" aria-label="Navegación principal"><a href="#incluye">Qué incluye</a><a href="#experiencia">La experiencia</a></nav>
      <a className="header-link" href="#demo">Ver demo <span aria-hidden="true">↗</span></a>
    </header>
    <main id="contenido">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> NUTRIWELL · EPI10 SALUD</p>
          <h1 id="hero-title">Tu biología.<br />Tu próximo<br /><em>capítulo.</em></h1>
          <p className="hero-description">Comprende lo que te hace único. Convierte tu información genética en prioridades para tu bienestar, con acompañamiento profesional.</p>
          <div className="hero-purchase">
            <PurchaseButton />
            <p className="price-inline"><strong>100 €</strong><span>Pago único de prueba</span></p>
          </div>
          <p className="demo-note">Demostración de NutriWell. Sin cobro real ni contratación del servicio.</p>
          <div className="hero-footnote"><span className="small-number">01 — 05</span><span>Genética. Contexto. Interpretación. Acción.</span></div>
        </div>
        <figure className="hero-visual">
          <div className="portrait"><img src="/images/nutriwell-editorial.jpg" alt="Retrato de la portada de NutriWell, en tonos azules y cian" width="1055" height="1491" fetchPriority="high" /></div>
          <div className="visual-label"><span>NUTRIWELL</span><span>EPI10 / 01</span></div>
          <figcaption className="portrait-caption"><span>El punto de partida</span><p>Todo empieza<br /><em>por conocerte.</em></p></figcaption>
          <span className="visual-corner" aria-hidden="true">↗</span>
        </figure>
      </section>
      <div className="intro-strip shell"><p>Tu genética aporta información.<br /><strong>Comprenderla abre posibilidades.</strong></p><span>NUTRICIÓN &nbsp;·&nbsp; HÁBITOS &nbsp;·&nbsp; BIENESTAR</span></div>

      <section className="offer-section shell" id="incluye" aria-labelledby="offer-title">
        <div className="section-intro">
          <p className="eyebrow"><span className="eyebrow-line" /> UNA VISIÓN MÁS COMPLETA</p>
          <h2 id="offer-title">La información<br />cobra <em>sentido.</em></h2>
          <p>Tu ADN es el punto de partida. Lo conectamos con tus hábitos y tu contexto para ayudarte a entender qué puede ser relevante para ti.</p>
          <div className="editorial-note"><span className="note-mark" aria-hidden="true">↗</span><p>Una experiencia que une<br /><strong>conocimiento y acompañamiento.</strong></p></div>
        </div>
        <ol className="service-list">
          {[
            ['Tu información genética', 'Un test genético integral como punto de partida para comprender mejor tu biología.'],
            ['Tus hábitos y tu contexto', 'Un cuestionario sobre tu día a día, tus objetivos y aquello que te importa.'],
            ['Tu informe personalizado', 'La información relevante, explicada con claridad y puesta en contexto.'],
            ['Tu plan de acción', 'Orientaciones de bienestar priorizadas para saber por dónde empezar.'],
            ['Tu sesión profesional', 'Un espacio para recorrer tus resultados, comprenderlos y ordenar tus próximos pasos.'],
          ].map(([title, text], index) => <li key={title}><span className="service-index" aria-hidden="true">0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div><span className="service-dot" aria-hidden="true" /></li>)}
        </ol>
      </section>

      <section className="experience" id="experiencia" aria-labelledby="experience-title">
        <div className="shell">
          <div className="experience-heading"><p className="eyebrow">DE CONOCERTE A CUIDARTE</p><h2 id="experience-title">Un camino con<br /><em>más claridad.</em></h2><p>Así se plantea la experiencia NutriWell: información, interpretación y un siguiente paso con sentido.</p></div>
          <ol className="journey">
            <li><div className="journey-top"><span>01</span><span aria-hidden="true">→</span></div><h3>Empezamos por ti.</h3><p>Tus hábitos, tus objetivos y tu contexto nos ayudan a comprender el punto de partida.</p><span className="journey-label">CONTEXTO PERSONAL</span></li>
            <li><div className="journey-top"><span>02</span><span aria-hidden="true">→</span></div><h3>Exploramos tu biología.</h3><p>La recogida de muestra y el análisis genético externo aportan una nueva capa de información.</p><span className="journey-label">TEST GENÉTICO</span></li>
            <li><div className="journey-top"><span>03</span><span aria-hidden="true">↗</span></div><h3>Le damos sentido.</h3><p>Informe, plan de acción y sesión profesional para comprender resultados y prioridades.</p><span className="journey-label">INTERPRETACIÓN Y ACCIÓN</span></li>
          </ol>
          <p className="experience-note">Este recorrido describe el servicio representado. La demostración permite probar únicamente la compra.</p>
        </div>
      </section>

      <section className="purchase-section shell" id="demo" aria-labelledby="purchase-title">
        <div className="purchase-story"><p className="eyebrow"><span className="eyebrow-line" /> TU SIGUIENTE PASO</p><h2 id="purchase-title">Comprende.<br />Prioriza.<br /><em>Avanza.</em></h2><p>Una mirada más personal a tu bienestar empieza por comprender lo que te hace único.</p><a className="text-link" href="#incluye">Revisar qué incluye <span aria-hidden="true">↑</span></a></div>
        <div className="purchase-card">
          <div className="purchase-card__top"><span>NUTRIWELL</span><span className="demo-chip">DEMO</span></div>
          <h3>Test genético integral con informe personalizado</h3>
          <div className="purchase-price">
            <p className="purchase-price__label">Importe de prueba</p>
            <p className="purchase-price__amount">100<span className="euro"> €</span></p>
            <p>Pago único · Una unidad · Sin suscripción</p>
          </div>
          <ul className="purchase-includes"><li>Test genético y cuestionario de hábitos</li><li>Informe y plan de acción priorizado</li><li>Sesión profesional de interpretación</li></ul>
          <PurchaseButton wide />
          <p className="purchase-disclosure">Continuarás al entorno de pruebas de Stripe. El importe es ficticio: no se cobra ni se contrata el servicio.</p>
          <p className="payment-caption"><span className="status-dot" />Demostración sin cobros reales</p>
        </div>
      </section>

      <section className="questions shell" aria-labelledby="questions-title"><h2 id="questions-title">Antes de <em>probar.</em></h2><div>
        <details><summary>¿Qué ocurre al pulsar «Probar compra»?<span aria-hidden="true">+</span></summary><p>Se abre el checkout de NutriWell en el entorno de pruebas de Stripe. El importe es ficticio. Usa únicamente datos y tarjetas de prueba; esta demostración no inicia la prestación del servicio.</p></details>
        <details><summary>¿Es esta la oferta comercial definitiva?<span aria-hidden="true">+</span></summary><p>Esta vista presenta la propuesta de NutriWell para su revisión. El nombre, el precio y las condiciones comerciales definitivas se concretarán con EPI10. El servicio se orienta al bienestar y no sustituye el diagnóstico ni la atención médica.</p></details>
      </div></section>
    </main>
    <footer className="site-footer shell"><a href="#" className="brand" aria-label="Volver al inicio"><img src="/images/epi10-blue.png" alt="EPI10" width="110" height="39" loading="lazy" /></a><p>Bienestar desde la ciencia<br />y desde la conciencia.</p><div><span>VISTA DE DEMOSTRACIÓN</span><p>Preparada por Skilland · 2026</p></div></footer>

  </>;
}
