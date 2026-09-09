import { useState, useEffect } from "react";
import { Menu, X, ArrowDownRight, ArrowUpRight, BookOpen, Library, Mail, Phone } from "lucide-react";

import { COLORS } from "./data/colors";
import PhotoCarousel from "./components/PhotoCarousel";

import dirkMainPhoto from "./assets/images/personal/dirk1.jpeg"
import dirkCVPhoto from "./assets/images/personal/dirk2.jpeg"
import nietzschesAntiDarwinism from "./assets/images/books/nad.jpg"
import totalitarianismOnScreen from "./assets/images/books/tos.jpg"
import k1 from "./assets/images/kronach/k1.jpeg"
import k2 from "./assets/images/kronach/k2.jpeg"
import k3 from "./assets/images/kronach/k3.jpeg"
import k4 from "./assets/images/kronach/k4.jpeg"
import k5 from "./assets/images/kronach/k5.jpeg"
import k6 from "./assets/images/kronach/k6.jpeg"

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "courses", label: "Courses" },
  { id: "research", label: "Research" },
  { id: "cv", label: "CV" },
];

const PHOTOS = [
  { src: k1, alt: "Kronach Photo #1" },
  { src: k2, alt: "Kronach Photo #2" },
  { src: k3, alt: "Kronach Photo #3" },
  { src: k4, alt: "Kronach Photo #4" },
  { src: k5, alt: "Kronach Photo #5" },
  { src: k6, alt: "Kronach Photo #6" },
];

const TIMELINE = [
  {
    date: "1981–1985",
    text: "B.A. from Bowdoin College, with high honors in both German and history. Studied at the University of Munich in 1983–84.",
  },
  {
    date: "1985–1992",
    text: "Lived and worked in Bonn, Germany, receiving a Magister in political science, philosophy, and German from the University of Bonn in 1989. Served as research assistant to Dr. Hans-Peter Schwarz and as Office Manager of the Wall Street Journal/Europe.",
  },
  {
    date: "1994–2000",
    text: "Doctoral study at Indiana University. M.A. in 1996 and Ph.D. in German Studies in 2000, followed by a year as Lecturer in German.",
  },
  {
    date: "2001–2026",
    text: "Assistant professor of German at Hampden-Sydney College, retiring from teaching there in 2026.",
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

const BOOKS = [
  {
    title: "Nietzsche's Anti-Darwinism",
    publisher: "Cambridge University Press, 2010",
    url: "https://www.amazon.com/Nietzsches-Anti-Darwinism-Dirk-Johnson/dp/0521196787",
    cover: nietzschesAntiDarwinism,
    coverAlt: "Cover of Nietzsche's Anti-Darwinism",
    description:
      "Challenging the common assumption that Nietzsche's thought converged with Darwin's, Johnson argues that Nietzsche's own stated opposition to Darwin is central to understanding his philosophy, and offers a reinterpretation of the Genealogy of Morals as a critique of Darwinian naturalism rather than an endorsement of it.",
  },
  {
    title:
      "\u201cThe Tragic Ambiguity, or the Ambiguous Tragedy, of Christa-Maria Sieland,\u201d in Totalitarianism on Screen: The Art and Politics of The Lives of Others",
    publisher: "University of Kentucky Press, 2014",
    url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_558c84613dbb4a0fbd9d13ed0eb942ab.pdf",
    cover: totalitarianismOnScreen,
    coverAlt: "Cover of Totalitarianism on Screen",
    description:
      "Johnson's essay on the film The Lives of Others appears in this collection examining its art and politics.",
  },
];

const REVIEWS = [
  { name: "Journal of Nietzsche Studies", url: "http://www.hunter.cuny.edu/jns/reviews/dirk-s-johnson-nietzsches-anti-darwinism" },
  { name: "Isis", url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_a1b63ee883e04cffbd9fc8d76a605044.pdf" },
  { name: "Environmental Philosophy", url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_f87b9a327db8403792c2f57952a517d8.pdf" },
  { name: "Quarterly Review of Biology", url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_c0c69742efaa45fa9b1e0e1470db7493.pdf" },
  { name: "Canadian Journal of History", url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_7ef6590919244e5598effeae77d47b6d.pdf" },
  { name: "Journal of the History of Philosophy", url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_ad882ea5dd9f46c2a9857c3f4cc71e38.pdf" },
  { name: "HOPOS", url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_76d0b33d8a14440bb0526cac5cd26466.pdf" },
  { name: "New Nietzsche Studies", url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_0b01902e448f495d85277ecdc3d822ac.pdf" },
  { name: "Nietzsche Studien", url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_999f248426d542afbba7e1b3f2bf1920.pdf" },
  { name: "Orbis Litterarum", url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_bde464b75f1b4ceeb1f8c4160d830fb3.pdf" },
  { name: "The European Legacy", url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_c264d981529d4a9f9f25ce92d83d7cdd.pdf" },
  { name: "Pli: Warwick Journal of Philosophy", url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_1a19d4fce29b4bc2abe1a00fc1a06a14.pdf" },
  { name: "Sven Gellens, friedrichnietzsche.nl", url: "https://friedrichnietzsche.nl/nietzsche-recensies/nietzsches-anti-darwinism/" },
];


export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
            Dirk Johnson - Professor of German
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
            className="relative z-50 rounded-sm p-2 lg:hidden"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X width={23} height={23} aria-hidden="true" />
            ) : (
              <Menu width={23} height={23} aria-hidden="true" />
            )}
          </button>
        </div>

        {menuOpen && (
          <nav
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
            style={{ background: COLORS.uvaBlue }}
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={closeMenu}
                className="text-2xl font-bold uppercase tracking-wider"
                style={{ color: COLORS.ivory, fontFamily: '"Libre Baskerville", serif' }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="main-content">
        {/* Hero */}
        <section id="home" className="scroll-mt-20 overflow-hidden" style={{ background: COLORS.uvaBlue }}>
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:py-24 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:px-8">
            <div className="sm:text-left md:text-center lg:text-left">
              <h1
                className="max-w-6xl text-4xl sm:text-5xl lg:text-6xl leading-tight font-bold"
                style={{ color: COLORS.ivory, fontFamily: '"Libre Baskerville", serif' }}
              >
                Dirk Johnson, PhD
              </h1>
              <div className="mx-auto mt-5 h-[3px] w-16 lg:mx-0" style={{ background: COLORS.uvaOrange }} />
              <p className="mx-auto mt-7 max-w-2xl text-xl font-semibold leading-8 lg:mx-0" style={{ color: COLORS.ivory }}>
                Professor of German, General Faculty, University of Virginia
              </p>
              <p className="mx-auto mt-2 max-w-2xl text-md leading-7 lg:mx-0" style={{ color: "#DCE2EA" }}>
                Emeritus Professor of German, Hampden-Sydney College
              </p>

              <div className="mt-9 flex flex-wrap sm:justify-start md:justify-center gap-3 lg:justify-start">
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
                  <span>Courses</span>
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
              </div>
            </div>

            <figure className="relative mx-auto w-full max-w-sm">
              <img
                loading="lazy"
                className="relative z-10 aspect-[4/5] w-full object-cover drop-shadow-[0_1px_2px]"
                style={{ color: COLORS.uvaOrange }}
                src={dirkMainPhoto}
                alt="Portrait of Dirk Johnson"
              />
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
                A life in German language, culture, and intellectual history
              </h2>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
              <div>
                <p className="max-w-3xl leading-8">
                  Dirk Johnson was born in Germany on a U.S. military base — his father served as a doctor
                  and his mother is a German native. He was raised in New York City, graduating from
                  Trinity High School in 1981. Summers spent with German relatives in Kronach, a small
                  medieval town in Upper Franconia, Bavaria, gave him an early command of the language.
                </p>
                <p className="mt-6 max-w-3xl leading-8">
                  He double-majored in German and history, both with high honors, at Bowdoin College, and
                  studied at the University of Munich in 1983–84. After graduating, he spent seven years
                  working and studying in Bonn, earning a Magister in political science, philosophy, and
                  German from the University of Bonn in 1989. While in Bonn, he served as a student and
                  research assistant to political scientist Dr. Hans-Peter Schwarz, translated a book by
                  political commentator Dr. Gerd Langguth, and worked as Office Manager of the Wall Street
                  Journal/Europe.
                </p>
                <p className="mt-6 max-w-3xl leading-8">
                  Johnson returned to the United States in 1992, working in New York City before beginning
                  doctoral study at Indiana University in 1994. He completed his M.A. in 1996 and his Ph.D.
                  in German Studies in 2000, then taught for a year as Lecturer in German at IU. In 2001 he
                  joined the faculty of Hampden-Sydney College as assistant professor of German, retiring
                  from teaching there in 2026. He now teaches German in the General Faculty at the
                  University of Virginia and lives in Charlottesville with his wife and two sons.
                </p>
                <p className="mt-6 max-w-3xl leading-8">
                  His research on Nietzsche and Darwin has appeared in peer-reviewed journals and been
                  presented at Cambridge, St Andrews, and the Technical University of Berlin, among other
                  venues; his monograph, Nietzsche's Anti-Darwinism, was published by Cambridge University
                  Press in 2010. Alongside this work, he has written and presented on German film, including
                  a contribution to a 2014 University of Kentucky Press volume on The Lives of Others.
                </p>
              </div>

               <div>
                <PhotoCarousel photos={PHOTOS} />

                <blockquote
                  className="mt-6 border-l-4 pl-5"
                  style={{ borderColor: COLORS.uvaOrange }}
                >
                  <p
                    className="text-lg italic leading-8"
                    style={{ color: COLORS.uvaBlue, fontFamily: '"Libre Baskerville", serif' }}
                  >
                    "I grew up in New York City. During the summers, I stayed with relatives in Kronach, a
                    picturesque medieval town in Northern Bavaria."
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="mt-12">
              <h3
                className="text-lg font-bold"
                style={{ color: COLORS.uvaBlue, fontFamily: '"Libre Baskerville", serif' }}
              >
                Education and academic career
              </h3>
              <ol className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
              Teaching German through language, culture, literature, and film
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
          <div className="mx-auto max-w-7xl px-5 py-16 sm:py-24 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[.22em]" style={{ color: COLORS.uvaOrange }}>
              Research
            </p>
            <div className="mt-4 h-[3px] w-16" style={{ background: COLORS.uvaOrange }} />
            <h2
              className="mt-6 max-w-2xl text-2xl leading-tight font-bold"
              style={{ color: COLORS.ivory, fontFamily: '"Libre Baskerville", serif' }}
            >
              Nietzsche, Darwin, and German literary and film history
            </h2>
            <p className="mt-6 max-w-xl leading-8" style={{ color: COLORS.ivory }}>
              Johnson's scholarship centers on Nietzsche's relationship to Darwin, alongside broader work on
              German literature, film, and cultural memory.
            </p>

            <div className="mt-12 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
              <div className="space-y-8">
                {BOOKS.map((book) => (
                  <article
                    key={book.title}
                    className="grid gap-7 rounded-sm border p-7 sm:grid-cols-[auto_1fr] sm:p-9"
                    style={{ background: COLORS.ivory }}
                  >
                    <a
                      href={book.url}
                      className="mx-auto block w-40 shrink-0 transition-transform hover:-translate-y-1 sm:mx-0"
                      aria-label={`View ${book.title}`}
                    >
                      <img
                        src={book.cover}
                        alt={book.coverAlt}
                        className="w-full rounded-sm shadow-md"
                      />
                    </a>
                    <div>
                      <a
                        href={book.url}
                        className="text-lg font-bold leading-snug underline decoration-2 underline-offset-4"
                        style={{ color: COLORS.uvaBlue, fontFamily: '"Libre Baskerville", serif' }}
                      >
                        {book.title}
                      </a>
                      <p className="mt-3 text-sm font-bold uppercase tracking-wider" style={{ color: COLORS.muted }}>
                        {book.publisher}
                      </p>
                      <p className="mt-5 leading-8">{book.description}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="rounded-sm border p-7 sm:p-9" style={{ background: COLORS.ivory }}>
                <h3
                  className="text-lg font-bold"
                  style={{ color: COLORS.uvaBlue, fontFamily: '"Libre Baskerville", serif' }}
                >
                  Reviews
                </h3>
                <ul className="mt-6 space-y-3 text-sm">
                  {REVIEWS.map((review) => (
                    <li key={review.name}>
                      <a
                        href={review.url}
                        className="font-semibold underline decoration-2 underline-offset-4"
                        style={{ color: COLORS.uvaOrange }}
                      >
                        {review.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

{/* CV */}
<section id="cv" className="scroll-mt-20 border-y" style={{ background: COLORS.mist }}>
  <div className="relative mx-auto max-w-7xl px-5 py-16 sm:py-24 lg:px-8">
    {/* Top-right image placeholder */}
    <div className="mb-8 flex justify-center lg:absolute lg:right-8 lg:top-8 lg:mb-0">
      <div className="h-40 w-40 overflow-hidden rounded-sm border border-gray-300 bg-gray-200 sm:h-48 sm:w-48">
        <img
          src={dirkCVPhoto}
          alt="Professor"
          className="h-full w-full object-cover"
        />
      </div>
    </div>

    <p
      className="text-xs font-bold uppercase tracking-[.22em]"
      style={{ color: COLORS.uvaOrange }}
    >
      Curriculum vitae
    </p>

    <div
      className="mt-4 h-[3px] w-16"
      style={{ background: COLORS.uvaOrange }}
    />

    <h2
      className="mt-6 text-2xl leading-tight font-bold"
      style={{
        color: COLORS.uvaBlue,
        fontFamily: '"Libre Baskerville", serif',
      }}
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
          B.A., Bowdoin College, with high honors in German and history; University of Munich study,
          1983–84; Magister, University of Bonn, 1989; M.A., Indiana University, 1996; Ph.D. in
          German Studies, Indiana University, 2000.
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
    <div className="mt-12 flex flex-wrap gap-4">
      <a
        href="DJCV.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5"
        style={{ background: COLORS.uvaOrange, color: "#fff" }}
      >
        <span>View Full English CV</span>
        <ArrowUpRight width={17} aria-hidden="true" />
      </a>
      <a
      
        href="https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_9bcfdf7c824848ee955641cb77e1e2f9.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5"
        style={{ background: COLORS.uvaOrange, color: "#fff" }}
      >
        <span>View Full German CV</span>
        <ArrowUpRight width={17} aria-hidden="true" />
      </a>
    </div>
  </div>
</section>
      </main>

      <footer style={{ background: COLORS.uvaBlue }}>
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-9 sm:grid-cols-3 sm:items-center lg:px-8">
          <div>
            <p
              className="font-bold"
              style={{ color: COLORS.ivory, fontFamily: '"Libre Baskerville", serif' }}
            >
              Dirk Johnson, PhD
            </p>
            <p className="mt-1 text-xs" style={{ color: "#DCE2EA" }}>
              University of Virginia
            </p>
            <p className="mt-1 text-xs" style={{ color: "#DCE2EA" }}>
              Department of Germanic Languages and Literatures
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 text-sm sm:items-center">
            <a
              href="mailto:ubc3au@virginia.edu"
              className="inline-flex items-center gap-2 font-semibold"
              style={{ color: COLORS.ivory }}
            >
              <Mail width={16} aria-hidden="true" style={{ color: COLORS.uvaOrange }} />
              <span>ubc3au@virginia.edu</span>
            </a>
            <a
              href="tel:+14344145671"
              className="inline-flex items-center gap-2 font-semibold"
              style={{ color: COLORS.ivory }}
            >
              <Phone width={16} aria-hidden="true" style={{ color: COLORS.uvaOrange }} />
              <span>434-414-5671</span>
            </a>
          </div>

          <p className="text-sm sm:text-right" style={{ color: "#DCE2EA" }}>
            © {new Date().getFullYear()} Dirk Johnson
          </p>
        </div>
      </footer>
    </div>
  );
}