import {
    ArrowDown,
    ArrowRight,
    BookOpen,
    Check,
    CircleCheck,
    Clock3,
    HandHeart,
    MapPin,
    MessageCircle,
    Search,
    ShieldCheck,
    Sparkles,
    UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import "./HowItWorksPage.css";

const giverSteps = [
    {
        number: "01",
        icon: BookOpen,
        title: "List the book",
        text: "Add the book, its academic details, condition, photos, and the area where it is available.",
    },
    {
        number: "02",
        icon: MessageCircle,
        title: "Choose a request",
        text: "When someone requests it, review the request and decide who the book will move to.",
    },
    {
        number: "03",
        icon: MapPin,
        title: "Coordinate",
        text: "Once accepted, coordinate the handoff directly without exposing a private address publicly.",
    },
    {
        number: "04",
        icon: HandHeart,
        title: "Pass it on",
        text: "Complete the handoff and confirm that the book has been given away.",
    },
];

const receiverSteps = [
    {
        number: "01",
        icon: Search,
        title: "Find a book",
        text: "Browse available books and narrow things down using useful academic and location details.",
    },
    {
        number: "02",
        icon: UserRound,
        title: "Request it",
        text: "Send a request for the book. You do not need an account just to discover what is available.",
    },
    {
        number: "03",
        icon: Clock3,
        title: "Wait for acceptance",
        text: "The lister reviews requests. If yours is accepted, the book becomes reserved for the handoff.",
    },
    {
        number: "04",
        icon: CircleCheck,
        title: "Receive it",
        text: "Coordinate with the lister, receive the book, and help complete the exchange.",
    },
];

const states = [
    {
        number: "01",
        name: "Available",
        note: "The book can be discovered and requested.",
        className: "how-state--available",
    },
    {
        number: "02",
        name: "Requested",
        note: "Someone has asked for the book.",
        className: "how-state--requested",
    },
    {
        number: "03",
        name: "Reserved",
        note: "A recipient has been selected for handoff.",
        className: "how-state--reserved",
    },
    {
        number: "04",
        name: "Given Away",
        note: "The exchange is complete and the listing leaves Browse.",
        className: "how-state--complete",
    },
];

export default function HowItWorksPage() {
    return (
        <div className="how-page">
            {/* HERO */}

            <section className="page how-hero">
                <div className="how-hero__copy">
                    <span className="how-label">How Kitab Ghar Works</span>

                    <h1>
                        FROM ONE
                        <br />
                        SHELF TO
                        <br />
                        <em>THE NEXT.</em>
                    </h1>

                    <p>
                        Kitab Ghar keeps book exchange structured without turning it into
                        shopping. Find a useful book, request it, coordinate directly, and
                        keep it moving.
                    </p>
                </div>

                <div className="how-hero__journey" aria-hidden="true">
                    <span className="how-hero__note">ONE SIMPLE JOURNEY</span>

                    <div className="how-journey__person how-journey__person--left">
                        <div className="how-journey__head" />
                        <div className="how-journey__body" />
                        <span>DONE WITH IT</span>
                    </div>

                    <div className="how-journey__book">
                        <BookOpen />
                        <strong>BOOK</strong>
                    </div>

                    <svg
                        className="how-journey__route"
                        viewBox="0 0 600 240"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M115 118 C190 25 290 30 345 105 C385 158 430 180 500 118"
                            className="how-journey__route-line"
                        />
                        <path
                            d="M486 103 L505 118 L484 132"
                            className="how-journey__route-arrow"
                        />
                    </svg>

                    <div className="how-journey__person how-journey__person--right">
                        <div className="how-journey__head" />
                        <div className="how-journey__body" />
                        <span>NEEDS IT</span>
                    </div>

                    <span className="how-journey__caption">
                        no checkout. no delivery system.
                        <br />
                        just a useful book moving.
                    </span>
                </div>
            </section>

            {/* QUICK PRINCIPLE */}

            <section className="how-principle">
                <div className="page how-principle__inner">
                    <span className="how-principle__mark">KG / 01</span>

                    <p>
                        <strong>THE BASIC RULE:</strong> A BOOK STAYS VISIBLE WHILE IT IS
                        AVAILABLE. ONCE THE HANDOFF IS COMPLETE, IT LEAVES BROWSE AND
                        BECOMES PART OF THE LISTER&apos;S HISTORY.
                    </p>

                    <a
                        className="how-principle__scroll"
                        href="#how-paths"
                        aria-label="Continue to how the exchange works"
                    >
                        <ArrowDown aria-hidden="true" />
                    </a>
                </div>
            </section>

            {/* TWO PATHS */}

            <section className="page how-paths" id="how-paths">
                <header className="how-section-heading">
                    <div>
                        <span className="how-label">Choose Your Side</span>
                        <h2>TWO SIDES.<br />ONE EXCHANGE.</h2>
                    </div>

                    <p>
                        Whether you have the book or need the book, the process stays
                        intentionally small.
                    </p>
                </header>

                <div className="how-paths__grid">
                    {/* GIVER */}

                    <article className="how-path how-path--giver">
                        <header className="how-path__header">
                            <div className="how-path__icon">
                                <HandHeart />
                            </div>

                            <div>
                                <span>I HAVE A BOOK</span>
                                <h3>I WANT TO GIVE IT.</h3>
                            </div>
                        </header>

                        <div className="how-path__steps">
                            {giverSteps.map(({ number, icon: Icon, title, text }) => (
                                <div className="how-path-step" key={number}>
                                    <span className="how-path-step__number">{number}</span>

                                    <div className="how-path-step__icon">
                                        <Icon />
                                    </div>

                                    <div className="how-path-step__copy">
                                        <h4>{title}</h4>
                                        <p>{text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link className="how-path__button" to={ROUTES.giveBook}>
                            Give a Book
                            <ArrowRight />
                        </Link>
                    </article>

                    {/* RECEIVER */}

                    <article className="how-path how-path--receiver">
                        <header className="how-path__header">
                            <div className="how-path__icon">
                                <Search />
                            </div>

                            <div>
                                <span>I NEED A BOOK</span>
                                <h3>I WANT TO FIND IT.</h3>
                            </div>
                        </header>

                        <div className="how-path__steps">
                            {receiverSteps.map(({ number, icon: Icon, title, text }) => (
                                <div className="how-path-step" key={number}>
                                    <span className="how-path-step__number">{number}</span>

                                    <div className="how-path-step__icon">
                                        <Icon />
                                    </div>

                                    <div className="how-path-step__copy">
                                        <h4>{title}</h4>
                                        <p>{text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link className="how-path__button" to={ROUTES.browse}>
                            Browse Books
                            <ArrowRight />
                        </Link>
                    </article>
                </div>
            </section>

            {/* LISTING LIFECYCLE */}

            <section className="how-lifecycle">
                <div className="page">
                    <header className="how-section-heading how-section-heading--light">
                        <div>
                            <span className="how-label">The Listing Lifecycle</span>
                            <h2>A BOOK DOESN&apos;T<br />JUST DISAPPEAR.</h2>
                        </div>

                        <p>
                            Every listing moves through a clear state so both sides know what
                            is happening.
                        </p>
                    </header>

                    <div className="how-states">
                        {states.map(({ number, name, note, className }, index) => (
                            <div className="how-state-wrap" key={name}>
                                <article className={`how-state ${className}`}>
                                    <span>{number}</span>
                                    <strong>{name}</strong>
                                    <p>{note}</p>
                                </article>

                                {index < states.length - 1 && (
                                    <div className="how-state-arrow" aria-hidden="true">
                                        <ArrowRight />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="how-given-note">
                        <div className="how-given-note__stamp">GIVEN AWAY</div>

                        <p>
                            <strong>Completed does not mean erased.</strong>
                            <br />
                            The book disappears from active Browse, but remains visible as
                            part of the lister&apos;s history.
                        </p>
                    </div>
                </div>
            </section>

            {/* COORDINATION */}

            <section className="page how-coordination">
                <div className="how-coordination__heading">
                    <span className="how-label">After Acceptance</span>

                    <h2>
                        KITAB GHAR ORGANIZES
                        <br />
                        THE EXCHANGE.
                        <br />
                        <em>PEOPLE COMPLETE IT.</em>
                    </h2>
                </div>

                <div className="how-coordination__board">
                    <div className="how-coordination__line" aria-hidden="true" />

                    <article>
                        <span>01</span>
                        <MessageCircle />
                        <h3>Connect</h3>
                        <p>
                            Once a request is accepted, the two sides can coordinate the
                            handoff directly.
                        </p>
                    </article>

                    <article>
                        <span>02</span>
                        <MapPin />
                        <h3>Meet Practically</h3>
                        <p>
                            Area-level discovery helps people understand where a book is
                            located without publishing private addresses.
                        </p>
                    </article>

                    <article>
                        <span>03</span>
                        <Check />
                        <h3>Confirm</h3>
                        <p>
                            When the handoff is complete, it is confirmed and the book
                            becomes Given Away.
                        </p>
                    </article>
                </div>
            </section>

            {/* SAFETY / BOUNDARIES */}

            <section className="how-boundaries">
                <div className="page how-boundaries__grid">
                    <div className="how-boundaries__title">
                        <div className="how-boundaries__eyebrow">
                            <ShieldCheck aria-hidden="true" />
                            <span>Built With Boundaries</span>
                        </div>

                        <h2>WHAT KITAB GHAR DOESN&apos;T NEED.</h2>

                        <p>
                            The platform handles discovery and the exchange workflow without
                            pretending to be an e-commerce system.
                        </p>
                    </div>

                    <div className="how-boundaries__list">
                        <div>
                            <span>×</span>
                            <strong>No prices</strong>
                            <p>Books on Kitab Ghar are given, not sold.</p>
                        </div>

                        <div>
                            <span>×</span>
                            <strong>No checkout</strong>
                            <p>There is no cart, payment gateway, or purchase flow.</p>
                        </div>

                        <div>
                            <span>×</span>
                            <strong>No public private address</strong>
                            <p>Discovery uses areas instead of publishing home addresses.</p>
                        </div>

                        <div>
                            <span>×</span>
                            <strong>No delivery network</strong>
                            <p>The people involved coordinate the actual handoff.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}

            <section className="page how-cta">
                <div>
                    <span className="how-cta__sticker">
                        <Sparkles />
                        THAT&apos;S THE WHOLE IDEA
                    </span>

                    <h2>
                        FIND ONE.
                        <br />
                        PASS ONE ON.
                    </h2>

                    <p>
                        The useful book is already somewhere in Karachi. Kitab Ghar simply
                        helps it reach the next desk.
                    </p>
                </div>

                <div className="how-cta__actions">
                    <Link to={ROUTES.browse} className="how-cta__primary">
                        Browse Books
                        <ArrowRight />
                    </Link>

                    <Link to={ROUTES.giveBook} className="how-cta__secondary">
                        Give a Book
                    </Link>
                </div>
            </section>
        </div>
    );
}