import { renderToString } from "react-dom/server";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, BookOpen, ChevronLeft, ChevronRight, Library, Mail, Menu, Phone, X } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/data/colors.ts
var COLORS = {
	uvaBlue: "#232D4B",
	uvaOrange: "#E57200",
	ivory: "#F7F4EE",
	mist: "#EEF1F5",
	ink: "#20283D",
	muted: "#586176"
};
//#endregion
//#region src/components/PhotoCarousel.tsx
var ANIMATION_LOCK_MS = 700;
function PhotoCarousel({ photos }) {
	const count = photos.length;
	const extended = [
		photos[count - 1],
		...photos,
		photos[0]
	];
	const trackLength = extended.length;
	const [trackIndex, setTrackIndex] = useState(1);
	const [transitionEnabled, setTransitionEnabled] = useState(true);
	const [isHovered, setIsHovered] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const intervalRef = useRef(null);
	const lockTimerRef = useRef(null);
	const isAnimatingRef = useRef(false);
	const activeDot = (trackIndex - 1 + count) % count;
	const releaseLock = useCallback(() => {
		if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
		lockTimerRef.current = null;
		isAnimatingRef.current = false;
	}, []);
	const lockAnimation = useCallback(() => {
		if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
		isAnimatingRef.current = true;
		lockTimerRef.current = setTimeout(releaseLock, ANIMATION_LOCK_MS);
	}, [releaseLock]);
	const advance = useCallback((direction) => {
		if (isAnimatingRef.current) return;
		lockAnimation();
		setTransitionEnabled(true);
		setTrackIndex((prev) => Math.min(Math.max(prev + direction, 0), trackLength - 1));
	}, [lockAnimation, trackLength]);
	const goToDot = useCallback((dotIndex) => {
		if (isAnimatingRef.current) return;
		if (dotIndex === activeDot) return;
		lockAnimation();
		setTransitionEnabled(true);
		setTrackIndex(dotIndex + 1);
	}, [lockAnimation, activeDot]);
	const handleTransitionEnd = (e) => {
		if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
		if (trackIndex === 0 || trackIndex === trackLength - 1) {
			if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
			lockTimerRef.current = null;
			setTransitionEnabled(false);
			setTrackIndex(trackIndex === 0 ? count : 1);
			requestAnimationFrame(() => requestAnimationFrame(releaseLock));
		} else releaseLock();
	};
	useEffect(() => {
		if (isHovered || isFocused) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		intervalRef.current = setInterval(() => advance(1), 5e3);
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [
		isHovered,
		isFocused,
		advance
	]);
	useEffect(() => {
		return () => {
			if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
		};
	}, []);
	const goPrev = () => advance(-1);
	const goNext = () => advance(1);
	return /* @__PURE__ */ jsxs("div", {
		onMouseEnter: () => setIsHovered(true),
		onMouseLeave: () => setIsHovered(false),
		onFocus: () => setIsFocused(true),
		onBlur: () => setIsFocused(false),
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative aspect-[5/5] w-full overflow-hidden rounded-sm",
			style: { background: COLORS.mist },
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "flex h-full",
					style: {
						width: `${trackLength * 100}%`,
						transform: `translateX(-${100 / trackLength * trackIndex}%)`,
						transition: transitionEnabled ? "transform 500ms ease-in-out" : "none"
					},
					onTransitionEnd: handleTransitionEnd,
					children: extended.map((photo, i) => {
						const isClone = i === 0 || i === trackLength - 1;
						return /* @__PURE__ */ jsx("img", {
							src: photo.src,
							alt: isClone ? "" : photo.alt,
							"aria-hidden": isClone || void 0,
							loading: "lazy",
							decoding: "async",
							width: 800,
							height: 800,
							className: "h-full object-cover",
							style: {
								width: `${100 / trackLength}%`,
								flexShrink: 0
							}
						}, i);
					})
				}),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: goPrev,
					"aria-label": "Previous photo",
					className: "absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-1.5",
					style: { background: "rgba(35,45,75,.75)" },
					children: /* @__PURE__ */ jsx(ChevronLeft, {
						width: 18,
						height: 18,
						color: COLORS.ivory,
						"aria-hidden": "true"
					})
				}),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: goNext,
					"aria-label": "Next photo",
					className: "absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5",
					style: { background: "rgba(35,45,75,.75)" },
					children: /* @__PURE__ */ jsx(ChevronRight, {
						width: 18,
						height: 18,
						color: COLORS.ivory,
						"aria-hidden": "true"
					})
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-4 flex justify-center gap-2",
			children: photos.map((photo, i) => /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => goToDot(i),
				"aria-label": `Go to photo ${i + 1}`,
				"aria-current": i === activeDot,
				className: "h-2 w-2 rounded-full transition-colors",
				style: { background: i === activeDot ? COLORS.uvaOrange : "#C8CFDA" }
			}, photo.src))
		})]
	});
}
//#endregion
//#region src/assets/images/personal/dirk1.jpeg
var dirk1_default = "/assets/dirk1-D1Ojop6h.jpeg";
//#endregion
//#region src/assets/images/personal/dirk2.jpeg
var dirk2_default = "/assets/dirk2-tsXD4ah1.jpeg";
//#endregion
//#region src/assets/images/books/nad.jpg
var nad_default = "/assets/nad-BFy6YoNZ.jpg";
//#endregion
//#region src/assets/images/books/tos.jpg
var tos_default = "/assets/tos-CJeAO6W6.jpg";
//#endregion
//#region src/assets/images/kronach/k1.jpeg
var k1_default = "/assets/k1-Cuitl1z2.jpeg";
//#endregion
//#region src/assets/images/kronach/k2.jpeg
var k2_default = "/assets/k2-BCHDlfEm.jpeg";
//#endregion
//#region src/assets/images/kronach/k3.jpeg
var k3_default = "/assets/k3-DjhCeXG8.jpeg";
//#endregion
//#region src/assets/images/kronach/k4.jpeg
var k4_default = "/assets/k4-viW6021k.jpeg";
//#endregion
//#region src/assets/images/kronach/k5.jpeg
var k5_default = "/assets/k5-S_bgKZoV.jpeg";
//#endregion
//#region src/assets/images/kronach/k6.jpeg
var k6_default = "/assets/k6-Bsr9OpFp.jpeg";
//#endregion
//#region src/App.tsx
var NAV_LINKS = [
	{
		id: "home",
		label: "Home"
	},
	{
		id: "about",
		label: "About"
	},
	{
		id: "courses",
		label: "Courses"
	},
	{
		id: "research",
		label: "Research"
	},
	{
		id: "cv",
		label: "CV"
	}
];
var PHOTOS = [
	{
		src: k1_default,
		alt: "Kronach, a medieval town in Upper Franconia, Bavaria (photo 1 of 6)"
	},
	{
		src: k2_default,
		alt: "Kronach, a medieval town in Upper Franconia, Bavaria (photo 2 of 6)"
	},
	{
		src: k3_default,
		alt: "Kronach, a medieval town in Upper Franconia, Bavaria (photo 3 of 6)"
	},
	{
		src: k4_default,
		alt: "Kronach, a medieval town in Upper Franconia, Bavaria (photo 4 of 6)"
	},
	{
		src: k5_default,
		alt: "Kronach, a medieval town in Upper Franconia, Bavaria (photo 5 of 6)"
	},
	{
		src: k6_default,
		alt: "Kronach, a medieval town in Upper Franconia, Bavaria (photo 6 of 6)"
	}
];
var TIMELINE = [
	{
		date: "1981–1985",
		text: "B.A. from Bowdoin College, with high honors in both German and history. Studied at the University of Munich in 1983–84."
	},
	{
		date: "1985–1992",
		text: "Lived and worked in Bonn, Germany, receiving a Magister in political science, philosophy, and German from the University of Bonn in 1989. Served as research assistant to Dr. Hans-Peter Schwarz and as Office Manager of the Wall Street Journal/Europe."
	},
	{
		date: "1994–2000",
		text: "Doctoral study at Indiana University. M.A. in 1996 and Ph.D. in German Studies in 2000, followed by a year as Lecturer in German."
	},
	{
		date: "2001–2026",
		text: "Assistant professor of German at Hampden-Sydney College, retiring from teaching there in 2026."
	},
	{
		date: "Current",
		text: "Professor of German in the General Faculty at the University of Virginia; director of the Münster Summer Program for more than fifteen years."
	}
];
var COURSES = [
	{
		level: "Introductory",
		title: "100-Level German",
		description: "First-year language instruction emphasizing listening and reading comprehension, vocabulary, grammar foundations, everyday communication, and understandable speaking and writing."
	},
	{
		level: "Intermediate",
		title: "200-Level German",
		description: "Continued development of listening, speaking, reading, and writing, with emphasis on grammatical accuracy, narration, comparison, recommendations, hypotheses, and future-oriented communication."
	},
	{
		level: "Advanced · Conducted in German",
		title: "GERM 301 — Survey of Literature I",
		description: "German cultural history from the ancient Germanic tribes through 1775, with attention to language development, literary production, arts, history, and politics. Conducted in German."
	},
	{
		level: "Advanced · Conducted in German",
		title: "GERM 302 — Survey of Literature II",
		description: "German literature and culture from 1775 to 1925, covering major writers, movements, genres, and historical contexts. Conducted in German."
	},
	{
		level: "Advanced · Conducted in German",
		title: "GERM 303 — German Culture through Film",
		description: "German cinema from the Weimar Republic to the present, considered alongside social, political, and historical change. No previous film-study experience required. Conducted in German."
	},
	{
		level: "Advanced",
		title: "GERM 305 — Advanced Conversation & Composition",
		description: "Advanced practice in speaking, listening, reading, and writing through grammar work and current German-language media. Culminates in a student-produced video project."
	},
	{
		level: "Intermediate · Münster Summer Program",
		title: "GERM 306 — Germany in the Media: Past and Present",
		description: "A Münster Summer Program course examining contemporary German issues through newspapers and magazines, media analysis, presentations, and postwar history."
	},
	{
		level: "Advanced · Conducted in German",
		title: "GERM 401 — German Drama: From Lessing to Bernhard",
		description: "A study of German drama from the late eighteenth century through the 1980s, focusing on theatrical form, themes, and innovation. Conducted in German."
	},
	{
		level: "Advanced · Conducted in German",
		title: "GERM 405 — The Holocaust: Representation in Postwar German Literature and Culture",
		description: "Explores Germany's confrontation with the Holocaust through postwar literature, poetry, and debates including the Historikerstreit. Conducted in German."
	},
	{
		level: "Advanced · Conducted in German",
		title: "GERM 485 — Berlin: Literature and Culture, 1871–1933",
		description: "Examines Berlin's modern transformation through literature, film, art, war, revolution, economic crisis, and political radicalism. Conducted in German."
	}
];
var BOOKS = [{
	title: "Nietzsche's Anti-Darwinism",
	publisher: "Cambridge University Press, 2010",
	url: "https://www.amazon.com/Nietzsches-Anti-Darwinism-Dirk-Johnson/dp/0521196787",
	cover: nad_default,
	coverAlt: "Cover of Nietzsche's Anti-Darwinism",
	description: "Challenging the common assumption that Nietzsche's thought converged with Darwin's, Johnson argues that Nietzsche's own stated opposition to Darwin is central to understanding his philosophy, and offers a reinterpretation of the Genealogy of Morals as a critique of Darwinian naturalism rather than an endorsement of it."
}, {
	title: "“The Tragic Ambiguity, or the Ambiguous Tragedy, of Christa-Maria Sieland,” in Totalitarianism on Screen: The Art and Politics of The Lives of Others",
	publisher: "University of Kentucky Press, 2014",
	url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_558c84613dbb4a0fbd9d13ed0eb942ab.pdf",
	cover: tos_default,
	coverAlt: "Cover of Totalitarianism on Screen",
	description: "Johnson's essay on the film The Lives of Others appears in this collection examining its art and politics."
}];
var REVIEWS = [
	{
		name: "Journal of Nietzsche Studies",
		url: "/JNS.pdf"
	},
	{
		name: "Isis",
		url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_a1b63ee883e04cffbd9fc8d76a605044.pdf"
	},
	{
		name: "Environmental Philosophy",
		url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_f87b9a327db8403792c2f57952a517d8.pdf"
	},
	{
		name: "Quarterly Review of Biology",
		url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_c0c69742efaa45fa9b1e0e1470db7493.pdf"
	},
	{
		name: "Canadian Journal of History",
		url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_7ef6590919244e5598effeae77d47b6d.pdf"
	},
	{
		name: "Journal of the History of Philosophy",
		url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_ad882ea5dd9f46c2a9857c3f4cc71e38.pdf"
	},
	{
		name: "HOPOS",
		url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_76d0b33d8a14440bb0526cac5cd26466.pdf"
	},
	{
		name: "New Nietzsche Studies",
		url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_0b01902e448f495d85277ecdc3d822ac.pdf"
	},
	{
		name: "Nietzsche Studien",
		url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_999f248426d542afbba7e1b3f2bf1920.pdf"
	},
	{
		name: "Orbis Litterarum",
		url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_bde464b75f1b4ceeb1f8c4160d830fb3.pdf"
	},
	{
		name: "The European Legacy",
		url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_c264d981529d4a9f9f25ce92d83d7cdd.pdf"
	},
	{
		name: "Pli: Warwick Journal of Philosophy",
		url: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_1a19d4fce29b4bc2abe1a00fc1a06a14.pdf"
	},
	{
		name: "Sven Gellens, friedrichnietzsche.nl",
		url: "https://friedrichnietzsche.nl/nietzsche-recensies/nietzsches-anti-darwinism/"
	}
];
function App() {
	const [menuOpen, setMenuOpen] = useState(false);
	const closeMenu = () => setMenuOpen(false);
	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);
	return /* @__PURE__ */ jsxs("div", {
		className: "w-full",
		style: {
			background: COLORS.mist,
			color: COLORS.ink,
			fontFamily: "\"Libre Franklin\", sans-serif"
		},
		children: [
			/* @__PURE__ */ jsx("a", {
				href: "#main-content",
				className: "sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:left-4 focus:top-4 focus:px-4 focus:py-3 focus:font-bold",
				style: {
					background: COLORS.ivory,
					color: COLORS.uvaBlue
				},
				children: "Skip to main content"
			}),
			/* @__PURE__ */ jsxs("header", {
				className: "sticky top-0 z-50 border-b shadow-sm",
				style: { background: COLORS.ivory },
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8",
					children: [
						/* @__PURE__ */ jsx("a", {
							href: "#home",
							className: "font-serif text-base font-bold tracking-tight sm:text-lg",
							style: {
								color: COLORS.uvaBlue,
								fontFamily: "\"Libre Baskerville\", serif"
							},
							children: "Dirk Johnson - Professor of German"
						}),
						/* @__PURE__ */ jsx("nav", {
							className: "hidden items-center gap-5 text-xs font-bold uppercase tracking-wider lg:flex",
							"aria-label": "Primary navigation",
							children: NAV_LINKS.map((link) => /* @__PURE__ */ jsx("a", {
								href: `#${link.id}`,
								className: "border-b-2 border-transparent py-1 transition-colors hover:border-current",
								style: { color: COLORS.uvaBlue },
								onMouseEnter: (e) => e.currentTarget.style.color = COLORS.uvaOrange,
								onMouseLeave: (e) => e.currentTarget.style.color = COLORS.uvaBlue,
								children: link.label
							}, link.id))
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "relative z-50 rounded-sm p-2 lg:hidden",
							"aria-controls": "mobile-menu",
							"aria-expanded": menuOpen,
							"aria-label": menuOpen ? "Close navigation menu" : "Open navigation menu",
							onClick: () => setMenuOpen((open) => !open),
							children: menuOpen ? /* @__PURE__ */ jsx(X, {
								width: 23,
								height: 23,
								"aria-hidden": "true"
							}) : /* @__PURE__ */ jsx(Menu, {
								width: 23,
								height: 23,
								"aria-hidden": "true"
							})
						})
					]
				}), menuOpen && /* @__PURE__ */ jsx("nav", {
					id: "mobile-menu",
					className: "fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 lg:hidden",
					style: { background: COLORS.uvaBlue },
					"aria-label": "Mobile navigation",
					children: NAV_LINKS.map((link) => /* @__PURE__ */ jsx("a", {
						href: `#${link.id}`,
						onClick: closeMenu,
						className: "text-2xl font-bold uppercase tracking-wider",
						style: {
							color: COLORS.ivory,
							fontFamily: "\"Libre Baskerville\", serif"
						},
						children: link.label
					}, link.id))
				})]
			}),
			/* @__PURE__ */ jsxs("main", {
				id: "main-content",
				children: [
					/* @__PURE__ */ jsx("section", {
						id: "home",
						className: "scroll-mt-20 overflow-hidden",
						style: { background: COLORS.uvaBlue },
						children: /* @__PURE__ */ jsxs("div", {
							className: "mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:py-24 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:px-8",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "sm:text-left md:text-center lg:text-left",
								children: [
									/* @__PURE__ */ jsx("h1", {
										className: "max-w-6xl text-4xl sm:text-5xl lg:text-6xl leading-tight font-bold",
										style: {
											color: COLORS.ivory,
											fontFamily: "\"Libre Baskerville\", serif"
										},
										children: "Dirk Johnson, PhD"
									}),
									/* @__PURE__ */ jsx("div", {
										className: "mx-auto mt-5 h-[3px] w-16 lg:mx-0",
										style: { background: COLORS.uvaOrange }
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mx-auto mt-7 max-w-2xl text-xl font-semibold leading-8 lg:mx-0",
										style: { color: COLORS.ivory },
										children: "Professor of German, General Faculty, University of Virginia"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mx-auto mt-2 max-w-2xl text-md leading-7 lg:mx-0",
										style: { color: "#DCE2EA" },
										children: "Emeritus Professor of German, Hampden-Sydney College"
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mt-9 flex flex-wrap sm:justify-start md:justify-center gap-3 lg:justify-start",
										children: [
											/* @__PURE__ */ jsxs("a", {
												href: "#about",
												className: "inline-flex items-center gap-2 rounded-sm px-5 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5",
												style: {
													background: COLORS.uvaOrange,
													color: "#fff"
												},
												children: [/* @__PURE__ */ jsx("span", { children: "About Dirk Johnson" }), /* @__PURE__ */ jsx(ArrowDownRight, {
													width: 17,
													"aria-hidden": "true"
												})]
											}),
											/* @__PURE__ */ jsxs("a", {
												href: "#courses",
												className: "inline-flex items-center gap-2 rounded-sm border px-5 py-3 text-sm font-bold",
												style: {
													borderColor: "rgba(247,244,238,.62)",
													color: COLORS.ivory
												},
												children: [/* @__PURE__ */ jsx("span", { children: "Courses" }), /* @__PURE__ */ jsx(BookOpen, {
													width: 17,
													"aria-hidden": "true"
												})]
											}),
											/* @__PURE__ */ jsxs("a", {
												href: "#research",
												className: "inline-flex items-center gap-2 rounded-sm border px-5 py-3 text-sm font-bold",
												style: {
													borderColor: "rgba(247,244,238,.62)",
													color: COLORS.ivory
												},
												children: [/* @__PURE__ */ jsx("span", { children: "Research" }), /* @__PURE__ */ jsx(Library, {
													width: 17,
													"aria-hidden": "true"
												})]
											})
										]
									})
								]
							}), /* @__PURE__ */ jsx("figure", {
								className: "relative mx-auto w-full max-w-sm",
								children: /* @__PURE__ */ jsx("img", {
									fetchPriority: "high",
									decoding: "async",
									width: 640,
									height: 800,
									className: "relative z-10 aspect-[4/5] w-full object-cover drop-shadow-[0_1px_2px]",
									style: { color: COLORS.uvaOrange },
									src: dirk1_default,
									alt: "Portrait of Dirk Johnson"
								})
							})]
						})
					}),
					/* @__PURE__ */ jsx("section", {
						id: "about",
						className: "scroll-mt-20",
						style: { background: COLORS.ivory },
						children: /* @__PURE__ */ jsxs("div", {
							className: "mx-auto max-w-7xl px-5 py-16 sm:py-24 lg:px-8",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "max-w-3xl",
									children: [
										/* @__PURE__ */ jsx("p", {
											className: "text-xs font-bold uppercase tracking-[.22em]",
											style: { color: COLORS.uvaOrange },
											children: "About"
										}),
										/* @__PURE__ */ jsx("div", {
											className: "mt-4 h-[3px] w-16",
											style: { background: COLORS.uvaOrange }
										}),
										/* @__PURE__ */ jsx("h2", {
											className: "mt-6 text-2xl leading-tight font-bold",
											style: {
												color: COLORS.uvaBlue,
												fontFamily: "\"Libre Baskerville\", serif"
											},
											children: "A life in German language, culture, and intellectual history"
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-12 grid gap-10 lg:grid-cols-[1.15fr_.85fr]",
									children: [/* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsx("p", {
											className: "max-w-3xl leading-8",
											children: "Dirk Johnson was born in Germany on a U.S. military base — his father served as a doctor and his mother is a German native. He was raised in New York City, graduating from Trinity High School in 1981. Summers spent with German relatives in Kronach, a small medieval town in Upper Franconia, Bavaria, gave him an early command of the language."
										}),
										/* @__PURE__ */ jsx("p", {
											className: "mt-6 max-w-3xl leading-8",
											children: "He double-majored in German and history, both with high honors, at Bowdoin College, and studied at the University of Munich in 1983–84. After graduating, he spent seven years working and studying in Bonn, earning a Magister in political science, philosophy, and German from the University of Bonn in 1989. While in Bonn, he served as a student and research assistant to political scientist Dr. Hans-Peter Schwarz, translated a book by political commentator Dr. Gerd Langguth, and worked as Office Manager of the Wall Street Journal/Europe."
										}),
										/* @__PURE__ */ jsx("p", {
											className: "mt-6 max-w-3xl leading-8",
											children: "Johnson returned to the United States in 1992, working in New York City before beginning doctoral study at Indiana University in 1994. He completed his M.A. in 1996 and his Ph.D. in German Studies in 2000, then taught for a year as Lecturer in German at IU. In 2001 he joined the faculty of Hampden-Sydney College as assistant professor of German, retiring from teaching there in 2026. He now teaches German in the General Faculty at the University of Virginia and lives in Charlottesville with his wife and two sons."
										}),
										/* @__PURE__ */ jsx("p", {
											className: "mt-6 max-w-3xl leading-8",
											children: "His research on Nietzsche and Darwin has appeared in peer-reviewed journals and been presented at Cambridge, St Andrews, and the Technical University of Berlin, among other venues; his monograph, Nietzsche's Anti-Darwinism, was published by Cambridge University Press in 2010. Alongside this work, he has written and presented on German film, including a contribution to a 2014 University of Kentucky Press volume on The Lives of Others."
										})
									] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(PhotoCarousel, { photos: PHOTOS }), /* @__PURE__ */ jsx("blockquote", {
										className: "mt-6 border-l-4 pl-5",
										style: { borderColor: COLORS.uvaOrange },
										children: /* @__PURE__ */ jsx("p", {
											className: "text-lg italic leading-8",
											style: {
												color: COLORS.uvaBlue,
												fontFamily: "\"Libre Baskerville\", serif"
											},
											children: "\"I grew up in New York City. During the summers, I stayed with relatives in Kronach, a picturesque medieval town in Northern Bavaria.\""
										})
									})] })]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-12",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "text-lg font-bold",
										style: {
											color: COLORS.uvaBlue,
											fontFamily: "\"Libre Baskerville\", serif"
										},
										children: "Education and academic career"
									}), /* @__PURE__ */ jsx("ol", {
										className: "mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3",
										children: TIMELINE.map((item) => /* @__PURE__ */ jsxs("li", {
											className: "rounded-sm border bg-white p-5 transition-transform hover:-translate-y-1",
											style: { borderColor: "#C8CFDA" },
											children: [/* @__PURE__ */ jsx("p", {
												className: "text-xs font-bold uppercase tracking-widest",
												style: { color: COLORS.uvaOrange },
												children: item.date
											}), /* @__PURE__ */ jsx("p", {
												className: "mt-3 text-sm leading-6",
												children: item.text
											})]
										}, item.date))
									})]
								})
							]
						})
					}),
					/* @__PURE__ */ jsx("section", {
						id: "courses",
						className: "scroll-mt-20 border-y",
						style: { background: COLORS.mist },
						children: /* @__PURE__ */ jsxs("div", {
							className: "mx-auto max-w-7xl px-5 py-16 sm:py-24 lg:px-8",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-xs font-bold uppercase tracking-[.22em]",
									style: { color: COLORS.uvaOrange },
									children: "Courses"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-4 h-[3px] w-16",
									style: { background: COLORS.uvaOrange }
								}),
								/* @__PURE__ */ jsx("h2", {
									className: "mt-6 text-2xl leading-tight font-bold",
									style: {
										color: COLORS.uvaBlue,
										fontFamily: "\"Libre Baskerville\", serif"
									},
									children: "Teaching German through language, culture, literature, and film"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-5 max-w-3xl leading-8",
									children: "Course offerings move from foundational language instruction to advanced study of German literature, cultural history, film, media, and memory."
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-11 grid gap-5 md:grid-cols-2",
									children: COURSES.map((course) => /* @__PURE__ */ jsxs("article", {
										className: "rounded-sm border bg-white p-6 transition-transform hover:-translate-y-1",
										children: [
											/* @__PURE__ */ jsx("p", {
												className: "text-xs font-bold uppercase tracking-[.18em]",
												style: { color: COLORS.uvaOrange },
												children: course.level
											}),
											/* @__PURE__ */ jsx("h3", {
												className: "mt-3 text-lg font-bold",
												style: {
													color: COLORS.uvaBlue,
													fontFamily: "\"Libre Baskerville\", serif"
												},
												children: course.title
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-4 text-sm leading-7",
												children: course.description
											})
										]
									}, course.title))
								})
							]
						})
					}),
					/* @__PURE__ */ jsx("section", {
						id: "research",
						className: "scroll-mt-20",
						style: { background: COLORS.uvaBlue },
						children: /* @__PURE__ */ jsxs("div", {
							className: "mx-auto max-w-7xl px-5 py-16 sm:py-24 lg:px-8",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-xs font-bold uppercase tracking-[.22em]",
									style: { color: COLORS.uvaOrange },
									children: "Research"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-4 h-[3px] w-16",
									style: { background: COLORS.uvaOrange }
								}),
								/* @__PURE__ */ jsx("h2", {
									className: "mt-6 max-w-2xl text-2xl leading-tight font-bold",
									style: {
										color: COLORS.ivory,
										fontFamily: "\"Libre Baskerville\", serif"
									},
									children: "Nietzsche, Darwin, and German literary and film history"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-6 max-w-xl leading-8",
									style: { color: COLORS.ivory },
									children: "Johnson's scholarship centers on Nietzsche's relationship to Darwin, alongside broader work on German literature, film, and cultural memory."
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-12 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start",
									children: [/* @__PURE__ */ jsx("div", {
										className: "space-y-8",
										children: BOOKS.map((book) => /* @__PURE__ */ jsxs("article", {
											className: "grid gap-7 rounded-sm border p-7 sm:grid-cols-[auto_1fr] sm:p-9",
											style: { background: COLORS.ivory },
											children: [/* @__PURE__ */ jsx("a", {
												href: book.url,
												className: "mx-auto block w-40 shrink-0 transition-transform hover:-translate-y-1 sm:mx-0",
												"aria-label": `View ${book.title}`,
												children: /* @__PURE__ */ jsx("img", {
													src: book.cover,
													alt: book.coverAlt,
													loading: "lazy",
													decoding: "async",
													width: 320,
													height: 480,
													className: "w-full rounded-sm shadow-md"
												})
											}), /* @__PURE__ */ jsxs("div", { children: [
												/* @__PURE__ */ jsx("a", {
													href: book.url,
													className: "text-lg font-bold leading-snug underline decoration-2 underline-offset-4",
													style: {
														color: COLORS.uvaBlue,
														fontFamily: "\"Libre Baskerville\", serif"
													},
													children: book.title
												}),
												/* @__PURE__ */ jsx("p", {
													className: "mt-3 text-sm font-bold uppercase tracking-wider",
													style: { color: COLORS.muted },
													children: book.publisher
												}),
												/* @__PURE__ */ jsx("p", {
													className: "mt-5 leading-8",
													children: book.description
												})
											] })]
										}, book.title))
									}), /* @__PURE__ */ jsxs("div", {
										className: "rounded-sm border p-7 sm:p-9",
										style: { background: COLORS.ivory },
										children: [/* @__PURE__ */ jsx("h3", {
											className: "text-lg font-bold",
											style: {
												color: COLORS.uvaBlue,
												fontFamily: "\"Libre Baskerville\", serif"
											},
											children: "Reviews"
										}), /* @__PURE__ */ jsx("ul", {
											className: "mt-6 space-y-3 text-sm",
											children: REVIEWS.map((review) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
												href: review.url,
												"aria-label": `Review of Nietzsche's Anti-Darwinism: ${review.name}`,
												className: "font-semibold underline decoration-2 underline-offset-4",
												style: { color: COLORS.uvaOrange },
												children: review.name
											}) }, review.name))
										})]
									})]
								})
							]
						})
					}),
					/* @__PURE__ */ jsx("section", {
						id: "cv",
						className: "scroll-mt-20 border-y",
						style: { background: COLORS.mist },
						children: /* @__PURE__ */ jsxs("div", {
							className: "relative mx-auto max-w-7xl px-5 py-16 sm:py-24 lg:px-8",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "mb-8 flex justify-center lg:absolute lg:right-8 lg:top-8 lg:mb-0",
									children: /* @__PURE__ */ jsx("div", {
										className: "h-40 w-40 overflow-hidden rounded-sm border border-gray-300 bg-gray-200 sm:h-48 sm:w-48",
										children: /* @__PURE__ */ jsx("img", {
											src: dirk2_default,
											alt: "Dirk Johnson, Professor of German",
											loading: "lazy",
											decoding: "async",
											width: 192,
											height: 192,
											className: "h-full w-full object-cover"
										})
									})
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xs font-bold uppercase tracking-[.22em]",
									style: { color: COLORS.uvaOrange },
									children: "Curriculum vitae"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-4 h-[3px] w-16",
									style: { background: COLORS.uvaOrange }
								}),
								/* @__PURE__ */ jsx("h2", {
									className: "mt-6 text-2xl leading-tight font-bold",
									style: {
										color: COLORS.uvaBlue,
										fontFamily: "\"Libre Baskerville\", serif"
									},
									children: "Academic record and leadership"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-5 max-w-3xl leading-8",
									children: "A concise overview of education, academic appointments, and long-standing leadership in immersive German study."
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-10 grid gap-5 lg:grid-cols-3",
									children: [
										/* @__PURE__ */ jsxs("article", {
											className: "rounded-sm border bg-white p-7",
											children: [/* @__PURE__ */ jsx("h3", {
												className: "text-lg font-bold",
												style: {
													color: COLORS.uvaBlue,
													fontFamily: "\"Libre Baskerville\", serif"
												},
												children: "Education"
											}), /* @__PURE__ */ jsx("p", {
												className: "mt-5 text-sm leading-7",
												children: "B.A., Bowdoin College, with high honors in German and history; University of Munich study, 1983–84; Magister, University of Bonn, 1989; M.A., Indiana University, 1996; Ph.D. in German Studies, Indiana University, 2000."
											})]
										}),
										/* @__PURE__ */ jsxs("article", {
											className: "rounded-sm border bg-white p-7",
											children: [/* @__PURE__ */ jsx("h3", {
												className: "text-lg font-bold",
												style: {
													color: COLORS.uvaBlue,
													fontFamily: "\"Libre Baskerville\", serif"
												},
												children: "Academic appointments"
											}), /* @__PURE__ */ jsx("p", {
												className: "mt-5 text-sm leading-7",
												children: "Joined Hampden-Sydney College in 2001 and retired from teaching there in 2026. Professor of German in the General Faculty at the University of Virginia."
											})]
										}),
										/* @__PURE__ */ jsxs("article", {
											className: "rounded-sm border bg-white p-7",
											children: [/* @__PURE__ */ jsx("h3", {
												className: "text-lg font-bold",
												style: {
													color: COLORS.uvaBlue,
													fontFamily: "\"Libre Baskerville\", serif"
												},
												children: "Münster Summer Program"
											}), /* @__PURE__ */ jsx("p", {
												className: "mt-5 text-sm leading-7",
												children: "Directed the Münster Summer Program for more than fifteen years, supporting immersive study of German language, media, culture, and history."
											})]
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-12 flex flex-wrap gap-4",
									children: [/* @__PURE__ */ jsxs("a", {
										href: "/DJCV.pdf",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5",
										style: {
											background: COLORS.uvaOrange,
											color: "#fff"
										},
										children: [/* @__PURE__ */ jsx("span", { children: "View Full English CV" }), /* @__PURE__ */ jsx(ArrowUpRight, {
											width: 17,
											"aria-hidden": "true"
										})]
									}), /* @__PURE__ */ jsxs("a", {
										href: "https://57d1520d-03a5-43bf-ad5f-b5dda0c4414d.filesusr.com/ugd/e300f2_9bcfdf7c824848ee955641cb77e1e2f9.pdf",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5",
										style: {
											background: COLORS.uvaOrange,
											color: "#fff"
										},
										children: [/* @__PURE__ */ jsx("span", { children: "View Full German CV" }), /* @__PURE__ */ jsx(ArrowUpRight, {
											width: 17,
											"aria-hidden": "true"
										})]
									})]
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ jsx("footer", {
				style: { background: COLORS.uvaBlue },
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto grid max-w-7xl gap-6 px-5 py-9 sm:grid-cols-3 sm:items-center lg:px-8",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("p", {
								className: "font-bold",
								style: {
									color: COLORS.ivory,
									fontFamily: "\"Libre Baskerville\", serif"
								},
								children: "Dirk Johnson, PhD"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-xs",
								style: { color: "#DCE2EA" },
								children: "University of Virginia"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-xs",
								style: { color: "#DCE2EA" },
								children: "Department of Germanic Languages and Literatures"
							})
						] }),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col items-start gap-2 text-sm sm:items-center",
							children: [/* @__PURE__ */ jsxs("a", {
								href: "mailto:ubc3au@virginia.edu",
								className: "inline-flex items-center gap-2 font-semibold",
								style: { color: COLORS.ivory },
								children: [/* @__PURE__ */ jsx(Mail, {
									width: 16,
									"aria-hidden": "true",
									style: { color: COLORS.uvaOrange }
								}), /* @__PURE__ */ jsx("span", { children: "ubc3au@virginia.edu" })]
							}), /* @__PURE__ */ jsxs("a", {
								href: "tel:+14344145671",
								className: "inline-flex items-center gap-2 font-semibold",
								style: { color: COLORS.ivory },
								children: [/* @__PURE__ */ jsx(Phone, {
									width: 16,
									"aria-hidden": "true",
									style: { color: COLORS.uvaOrange }
								}), /* @__PURE__ */ jsx("span", { children: "434-414-5671" })]
							})]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "text-sm sm:text-right",
							style: { color: "#DCE2EA" },
							suppressHydrationWarning: true,
							children: [
								"© ",
								(/* @__PURE__ */ new Date()).getFullYear(),
								" Dirk Johnson"
							]
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/entry-server.tsx
function render() {
	return renderToString(/* @__PURE__ */ jsx(App, {}));
}
//#endregion
export { render };
