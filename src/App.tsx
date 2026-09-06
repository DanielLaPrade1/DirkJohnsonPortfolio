import React, { useState } from "react";
import { Menu, ArrowDownRight, BookOpen, Library, Mail, Phone } from "lucide-react";

const COLORS = {
  uvaBlue: "#232D4B",
  uvaOrange: "#E57200",
  ivory: "#F7F4EE",
  mist: "#EEF1F5",
  ink: "#20283D",
  muted: "#586176",
};

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "courses", label: "Courses" },
  { id: "research", label: "Research" },
  { id: "publications", label: "Publications" },
  { id: "cv", label: "CV" },
  { id: "contact", label: "Contact" },
];

const RESEARCH_FOCUS = [
  "Friedrich Nietzsche",
  "Nietzsche and Darwin",
  "German literature and intellectual history",
  "German film and culture",
  "Holocaust representation",
  "German-language pedagogy and immersion learning",
];

const TIMELINE = [
  {
    date: "1983–1989",
    text: "University of Munich study, followed by a Magister from the University of Bonn in political science, German, and philosophy.",
  },
  {
    date: "1996–2000",
    text: "M.A. from Indiana University in 1996 and Ph.D. in German Studies in 2000.",
  },
  {
    date: "2001–2026",
    text: "Joined Hampden-Sydney College in 2001 and retired from teaching there in 2026.",
  },
  {
    date: "Current",
    text: "Professor of German in the General Faculty at the University of Virginia; director of the Münster Summer Program for more than fifteen years.",
  },
];

const COURSES = [
  {
    level: "Introductory",
    title: "100-Level German",
    description:
      "First-year language instruction emphasizing listening and reading comprehension, vocabulary, grammar foundations, everyday communication, and understandable speaking and writing.",
  },
  {
    level: "Intermediate",
    title: "200-Level German",
    description:
      "Continued development of listening, speaking, reading, and writing, with emphasis on grammatical accuracy, narration, comparison, recommendations, hypotheses, and future-oriented communication.",
  },
  {
    level: "Advanced · Conducted in German",
    title: "GERM 301 — Survey of Literature I",
    description:
      "German cultural history from the ancient Germanic tribes through 1775, with attention to language development, literary production, arts, history, and politics. Conducted in German.",
  },
  {
    level: "Advanced · Conducted in German",
    title: "GERM 302 — Survey of Literature II",
    description:
      "German literature and culture from 1775 to 1925, covering major writers, movements, genres, and historical contexts. Conducted in German.",
  },
  {
    level: "Advanced · Conducted in German",
    title: "GERM 303 — German Culture through Film",
    description:
      "German cinema from the Weimar Republic to the present, considered alongside social, political, and historical change. No previous film-study experience required. Conducted in German.",
  },
  {
    level: "Advanced",
    title: "GERM 305 — Advanced Conversation & Composition",
    description:
      "Advanced practice in speaking, listening, reading, and writing through grammar work and current German-language media. Culminates in a student-produced video project.",
  },
  {
    level: "Intermediate · Münster Summer Program",
    title: "GERM 306 — Germany in the Media: Past and Present",
    description:
      "A Münster Summer Program course examining contemporary German issues through newspapers and magazines, media analysis, presentations, and postwar history.",
  },
  {
    level: "Advanced · Conducted in German",
    title: "GERM 401 — German Drama: From Lessing to Bernhard",
    description:
      "A study of German drama from the late eighteenth century through the 1980s, focusing on theatrical form, themes, and innovation. Conducted in German.",
  },
  {
    level: "Advanced · Conducted in German",
    title: "GERM 405 — The Holocaust: Representation in Postwar German Literature and Culture",
    description:
      "Explores Germany's confrontation with the Holocaust through postwar literature, poetry, and debates including the Historikerstreit. Conducted in German.",
  },
  {
    level: "Advanced · Conducted in German",
    title: "GERM 485 — Berlin: Literature and Culture, 1871–1933",
    description:
      "Examines Berlin's modern transformation through literature, film, art, war, revolution, economic crisis, and political radicalism. Conducted in German.",
  },
];

const RESEARCH_THEMES = [
  "Nietzsche, science, and modernity",
  "German intellectual history",
  "Literature, film, and cultural memory",
  "Immersion learning and German pedagogy",
];

const PUBLICATIONS = [
  "Introduction to Nietzsche's Thus Spoke Zarathustra, Capstone Classics Edition, 2022",
  "\u201cZarathustra: Nietzsche's Rendezvous with Eternity,\u201d The New Cambridge Companion to Nietzsche, 2019",
  "\u201cThe Tragic Ambiguity, or the Ambiguous Tragedy, of Christa-Maria Sieland,\u201d in Totalitarianism on Screen: The Art and Politics of The Lives of Others, 2014",
  "\u201cTranslating Nietzsche's Atheism(s): A World beyond the Ethical Imperative,\u201d The Agonist, 2023",
  "\u201cJaspers' Reading of Nietzsche's Antichrist,\u201d Existenz, 2020",
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div
      className="w-full"
      style={{ background: COLORS.mist, color: COLORS.ink, fontFamily: '"Libre Franklin", sans-serif' }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:left-4 focus:top-4 focus:px-4 focus:py-3 focus:font-bold"
        style={{ background: COLORS.ivory, color: COLORS.uvaBlue }}
      >
        Skip to main content
      </a>

      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b shadow-sm"
        style={{ background: COLORS.ivory }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a
            href="#home"
            className="font-serif text-base font-bold tracking-tight sm:text-lg"
            style={{ color: COLORS.uvaBlue, fontFamily: '"Libre Baskerville", serif' }}
          >
            Dirk Johnson, PhD
          </a>

          <nav className="hidden items-center gap-5 text-xs font-bold uppercase tracking-wider lg:flex" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="border-b-2 border-transparent py-1 transition-colors hover:border-current"
                style={{ color: COLORS.uvaBlue }}
                onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.uvaOrange)}
                onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.uvaBlue)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="rounded-sm p-2 lg:hidden"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Menu width={23} height={23} aria-hidden="true" />
          </button>
        </div>

        {menuOpen && (
          <nav id="mobile-menu" className="border-t px-5 py-4 lg:hidden" aria-label="Mobile navigation">
            <div className="grid grid-cols-2 gap-x-5 gap-y-4 text-sm font-bold">
              {NAV_LINKS.map((link) => (
                <a key={link.id} href={`#${link.id}`} onClick={closeMenu}>
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="main-content">
        {/* Hero */}
        <section id="home" className="scroll-mt-20 overflow-hidden" style={{ background: COLORS.uvaBlue }}>
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:py-24 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.22em]" style={{ color: COLORS.uvaOrange }}>
                German Studies · Scholarship · Teaching
              </p>
              <div className="mt-5 h-[3px] w-16" style={{ background: COLORS.uvaOrange }} />
              <h1
                className="mt-7 max-w-3xl text-3xl leading-tight font-bold"
                style={{ color: COLORS.ivory, fontFamily: '"Libre Baskerville", serif' }}
              >
                Dirk Johnson, PhD
              </h1>
              <p className="mt-7 max-w-2xl text-lg font-semibold leading-8" style={{ color: COLORS.ivory }}>
                Professor of German, General Faculty, University of Virginia
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-7" style={{ color: "#DCE2EA" }}>
                Emeritus Professor of German, Hampden-Sydney College
              </p>
              <p className="mt-7 max-w-2xl text-lg leading-8" style={{ color: COLORS.ivory }}>
                Scholar and teacher of German language, literature, film, and intellectual history.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 rounded-sm px-5 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5"
                  style={{ background: COLORS.uvaOrange, color: "#fff" }}
                >
                  <span>About Dirk Johnson</span>
                  <ArrowDownRight width={17} aria-hidden="true" />
                </a>
                <a
                  href="#courses"
                  className="inline-flex items-center gap-2 rounded-sm border px-5 py-3 text-sm font-bold"
                  style={{ borderColor: "rgba(247,244,238,.62)", color: COLORS.ivory }}
                >
                  <span>View Courses</span>
                  <BookOpen width={17} aria-hidden="true" />
                </a>
                <a
                  href="#research"
                  className="inline-flex items-center gap-2 rounded-sm border px-5 py-3 text-sm font-bold"
                  style={{ borderColor: "rgba(247,244,238,.62)", color: COLORS.ivory }}
                >
                  <span>Research</span>
                  <Library width={17} aria-hidden="true" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-sm border px-5 py-3 text-sm font-bold"
                  style={{ borderColor: "rgba(247,244,238,.62)", color: COLORS.ivory }}
                >
                  <span>Contact</span>
                  <Mail width={17} aria-hidden="true" />
                </a>
              </div>
            </div>

            <figure className="relative mx-auto w-full max-w-md">
              <img
                loading="lazy"
                className="relative z-10 aspect-[4/5] w-full border object-cover grayscale"
                src="https://images.pexels.com/photos/5589950/pexels-photo-5589950.jpeg"
                alt="Portrait placeholder for Dirk Johnson, a scholar wearing glasses and holding a notebook."
              />
              <figcaption
                className="relative z-10 mt-5 border-l-2 pl-4 text-sm leading-6 italic"
                style={{ color: COLORS.ivory, borderColor: COLORS.uvaOrange }}
              >
                Dirk Johnson, PhD — German Studies scholar and teacher.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-20" style={{ background: COLORS.ivory }}>
          <div className="mx-auto max-w-7xl px-5 py-16 sm:py-24 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[.22em]" style={{ color: COLORS.uvaOrange }}>
                About
              </p>
              <div className="mt-4 h-[3px] w-16" style={{ background: COLORS.uvaOrange }} />
              <h2
                className="mt-6 text-2xl leading-tight font-bold"
                style={{ color: COLORS.uvaBlue, fontFamily: '"Libre Baskerville", serif' }}
              >
                A life in German language, culture, and intellectual history.
              </h2>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
              <div>
                <p className="max-w-3xl leading-8">
                  Born in Germany on a U.S. military base and raised in New York City, Dirk Johnson learned
                  German during summers spent with relatives in Kronach, Bavaria. Those formative experiences
                  established the bilingual and bicultural perspective that continues to animate his
                  scholarship and teaching.
                </p>
                <p className="mt-6 max-w-3xl leading-8">
                  Johnson earned a B.A., magna cum laude, from Bowdoin College with high honors in German and
                  history. He studied at the University of Munich in 1983–84, received a Magister from the
                  University of Bonn in 1989 in political science, German, and philosophy, completed an M.A.
                  at Indiana University in 1996, and earned his Ph.D. in German Studies in 2000. He joined
                  Hampden-Sydney College in 2001, retired from teaching there in 2026, and now teaches German
                  in the General Faculty at the University of Virginia.
                </p>
              </div>

              <aside className="rounded-sm border bg-white p-7 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[.18em]" style={{ color: COLORS.uvaOrange }}>
                  Research focus
                </p>
                <h3
                  className="mt-3 text-lg font-bold"
                  style={{ color: COLORS.uvaBlue, fontFamily: '"Libre Baskerville", serif' }}
                >
                  Questions pursued across disciplines
                </h3>
                <ul className="mt-6 space-y-3 border-t pt-5 text-sm leading-6">
                  {RESEARCH_FOCUS.map((item) => (
                    <li key={item} className="border-l-2 pl-3" style={{ borderColor: COLORS.uvaOrange }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>

            <div className="mt-12">
              <h3
                className="text-lg font-bold"
                style={{ color: COLORS.uvaBlue, fontFamily: '"Libre Baskerville", serif' }}
              >
                Education and academic career
              </h3>
              <ol className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {TIMELINE.map((item) => (
                  <li
                    key={item.date}
                    className="rounded-sm border bg-white p-5 transition-transform hover:-translate-y-1"
                    style={{ borderColor: "#C8CFDA" }}
                  >
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: COLORS.uvaOrange }}>
                      {item.date}
                    </p>
                    <p className="mt-3 text-sm leading-6">{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Courses */}
        <section id="courses" className="scroll-mt-20 border-y" style={{ background: COLORS.mist }}>
          <div className="mx-auto max-w-7xl px-5 py-16 sm:py-24 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[.22em]" style={{ color: COLORS.uvaOrange }}>
              Courses
            </p>
            <div className="mt-4 h-[3px] w-16" style={{ background: COLORS.uvaOrange }} />
            <h2
              className="mt-6 text-2xl leading-tight font-bold"
              style={{ color: COLORS.uvaBlue, fontFamily: '"Libre Baskerville", serif' }}
            >
              Teaching German through language, culture, literature, and film.
            </h2>
            <p className="mt-5 max-w-3xl leading-8">
              Course offerings move from foundational language instruction to advanced study of German
              literature, cultural history, film, media, and memory.
            </p>

            <div className="mt-11 grid gap-5 md:grid-cols-2">
              {COURSES.map((course) => (
                <article
                  key={course.title}
                  className="rounded-sm border bg-white p-6 transition-transform hover:-translate-y-1"
                >
                  <p className="text-xs font-bold uppercase tracking-[.18em]" style={{ color: COLORS.uvaOrange }}>
                    {course.level}
                  </p>
                  <h3
                    className="mt-3 text-lg font-bold"
                    style={{ color: COLORS.uvaBlue, fontFamily: '"Libre Baskerville", serif' }}
                  >
                    {course.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7">{course.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Research */}
        <section id="research" className="scroll-mt-20" style={{ background: COLORS.uvaBlue }}>
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:py-24 lg:grid-cols-[.78fr_1.22fr] lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.22em]" style={{ color: COLORS.uvaOrange }}>
                Research
              </p>
              <div className="mt-4 h-[3px] w-16" style={{ background: COLORS.uvaOrange }} />
              <h2
                className="mt-6 text-2xl leading-tight font-bold"
                style={{ color: COLORS.ivory, fontFamily: '"Libre Baskerville", serif' }}
              >
                Scholarship at the intersection of philosophy, science, literature, and culture.
              </h2>
              <p className="mt-6 max-w-xl leading-8" style={{ color: COLORS.ivory }}>
                Johnson's work examines the intellectual currents that shaped modern German thought, with
                particular attention to Friedrich Nietzsche, Darwinism, literary culture, film, and the ethics
                of historical representation.
              </p>
            </div>

            <article className="rounded-sm border p-7 sm:p-9" style={{ background: COLORS.ivory }}>
              <p className="text-xs font-bold uppercase tracking-[.2em]" style={{ color: COLORS.uvaOrange }}>
                Featured research
              </p>
              <h3
                className="mt-4 text-lg leading-tight font-bold"
                style={{ color: COLORS.uvaBlue, fontFamily: '"Libre Baskerville", serif' }}
              >
                Nietzsche's Anti-Darwinism
              </h3>
              <p className="mt-4 text-sm font-bold uppercase tracking-wider" style={{ color: COLORS.muted }}>
                Cambridge University Press, 2010
              </p>
              <p className="mt-7 leading-8">
                Nietzsche's Anti-Darwinism examines Nietzsche's relationship with Darwin and argues that
                Nietzsche's explicitly stated anti-Darwinism is central to understanding his broader critique
                of Darwinian thought and the Genealogy of Morals.
              </p>

              <div className="mt-8 border-t pt-6">
                <h4
                  className="font-bold"
                  style={{ color: COLORS.uvaBlue, fontFamily: '"Libre Baskerville", serif' }}
                >
                  Related themes
                </h4>
                <ul className="mt-5 grid gap-3 text-sm leading-6 sm:grid-cols-2">
                  {RESEARCH_THEMES.map((theme) => (
                    <li key={theme} className="border-l-2 pl-3" style={{ borderColor: COLORS.uvaOrange }}>
                      {theme}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </section>

        {/* Publications */}
        <section id="publications" className="scroll-mt-20" style={{ background: COLORS.ivory }}>
          <div className="mx-auto max-w-5xl px-5 py-16 sm:py-24 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[.22em]" style={{ color: COLORS.uvaOrange }}>
              Publications
            </p>
            <div className="mt-4 h-[3px] w-16" style={{ background: COLORS.uvaOrange }} />
            <h2
              className="mt-6 text-2xl leading-tight font-bold"
              style={{ color: COLORS.uvaBlue, fontFamily: '"Libre Baskerville", serif' }}
            >
              Selected scholarly work
            </h2>

            <ol className="mt-10 space-y-4">
              {PUBLICATIONS.map((pub, i) => (
                <li
                  key={i}
                  className="rounded-sm border bg-white p-6 transition-transform hover:-translate-y-1"
                >
                  <p className="leading-7">{pub}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CV */}
        <section id="cv" className="scroll-mt-20 border-y" style={{ background: COLORS.mist }}>
          <div className="mx-auto max-w-7xl px-5 py-16 sm:py-24 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[.22em]" style={{ color: COLORS.uvaOrange }}>
              Curriculum vitae
            </p>
            <div className="mt-4 h-[3px] w-16" style={{ background: COLORS.uvaOrange }} />
            <h2
              className="mt-6 text-2xl leading-tight font-bold"
              style={{ color: COLORS.uvaBlue, fontFamily: '"Libre Baskerville", serif' }}
            >
              Academic record and leadership
            </h2>
            <p className="mt-5 max-w-3xl leading-8">
              A concise overview of education, academic appointments, and long-standing leadership in
              immersive German study.
            </p>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              <article className="rounded-sm border bg-white p-7">
                <h3
                  className="text-lg font-bold"
                  style={{ color: COLORS.uvaBlue, fontFamily: '"Libre Baskerville", serif' }}
                >
                  Education
                </h3>
                <p className="mt-5 text-sm leading-7">
                  B.A., magna cum laude, Bowdoin College, with high honors in German and history; University
                  of Munich study, 1983–84; Magister, University of Bonn, 1989; M.A., Indiana University,
                  1996; Ph.D. in German Studies, Indiana University, 2000.
                </p>
              </article>
              <article className="rounded-sm border bg-white p-7">
                <h3
                  className="text-lg font-bold"
                  style={{ color: COLORS.uvaBlue, fontFamily: '"Libre Baskerville", serif' }}
                >
                  Academic appointments
                </h3>
                <p className="mt-5 text-sm leading-7">
                  Joined Hampden-Sydney College in 2001 and retired from teaching there in 2026. Professor of
                  German in the General Faculty at the University of Virginia.
                </p>
              </article>
              <article className="rounded-sm border bg-white p-7">
                <h3
                  className="text-lg font-bold"
                  style={{ color: COLORS.uvaBlue, fontFamily: '"Libre Baskerville", serif' }}
                >
                  Münster Summer Program
                </h3>
                <p className="mt-5 text-sm leading-7">
                  Directed the Münster Summer Program for more than fifteen years, supporting immersive study
                  of German language, media, culture, and history.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-20" style={{ background: COLORS.ivory }}>
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.22em]" style={{ color: COLORS.uvaOrange }}>
                Contact
              </p>
              <div className="mt-4 h-[3px] w-16" style={{ background: COLORS.uvaOrange }} />
              <h2
                className="mt-6 text-2xl leading-tight font-bold"
                style={{ color: COLORS.uvaBlue, fontFamily: '"Libre Baskerville", serif' }}
              >
                Academic inquiries and correspondence
              </h2>
              <p className="mt-6 max-w-xl leading-8">
                For inquiries concerning German studies, teaching, scholarship, speaking, or academic
                collaboration, please get in touch by email or telephone.
              </p>
            </div>

            <address className="rounded-sm border bg-white p-7 shadow-sm not-italic sm:p-9">
              <p className="text-sm font-bold uppercase tracking-[.15em]" style={{ color: COLORS.uvaBlue }}>
                University of Virginia · General Faculty
              </p>
              <div className="mt-7 space-y-5 border-t pt-7">
                <div className="flex gap-4">
                  <Mail width={20} aria-hidden="true" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: COLORS.muted }}>
                      Email
                    </p>
                    <a
                      href="mailto:ubc3au@virginia.edu"
                      className="mt-1 inline-block font-semibold underline decoration-2 underline-offset-4"
                      style={{ color: COLORS.uvaOrange }}
                    >
                      ubc3au@virginia.edu
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone width={20} aria-hidden="true" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: COLORS.muted }}>
                      Telephone
                    </p>
                    <a
                      href="tel:+14344145671"
                      className="mt-1 inline-block font-semibold underline decoration-2 underline-offset-4"
                      style={{ color: COLORS.uvaOrange }}
                    >
                      434-414-5671
                    </a>
                  </div>
                </div>
              </div>
            </address>
          </div>
        </section>
      </main>

      <footer style={{ background: COLORS.uvaBlue }}>
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 py-8 text-sm sm:flex-row sm:items-center lg:px-8">
          <p
            className="font-bold"
            style={{ color: COLORS.ivory, fontFamily: '"Libre Baskerville", serif' }}
          >
            Dirk Johnson, PhD
          </p>
          <p style={{ color: "#DCE2EA" }}>University of Virginia · German Studies</p>
        </div>
      </footer>
    </div>
  );
}
