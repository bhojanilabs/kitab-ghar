import {
    ArrowRight,
    BookOpen,
    CircleDollarSign,
    HandHeart,
    MapPin,
    ShieldCheck,
    Store,
    Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import "./AboutPage.css";

export default function AboutPage() {
    return (
        <div className="about-page selection-purple">
            <section className="about-hero page">
                <div className="about-hero__copy">
                    <span className="about-label">ABOUT KITAB GHAR</span>

                    <h1>
                        BOOKS ARE
                        <br />
                        MEANT TO <em>MOVE.</em>
                    </h1>

                    <p>
                        Kitab Ghar helps useful books move from one desk to the next,
                        starting with students and readers across Karachi.
                    </p>
                </div>

                <div className="about-hero__art" aria-hidden="true">
                    <div className="about-move-art">
                        <span className="about-move-art__note about-move-art__note--start">
                            YOUR SHELF
                        </span>

                        <div className="about-move-art__book">
                            <span>DONE?</span>
                            <strong>PASS<br />IT ON.</strong>
                            <small>KEEP BOOKS MOVING</small>
                        </div>

                        <svg
                            className="about-move-art__path"
                            viewBox="0 0 620 330"
                            fill="none"
                        >
                            <path
                                className="about-move-art__route"
                                d="
          M 128 94
          C 220 45, 309 60, 332 122
          C 351 175, 300 207, 347 246
          C 392 284, 459 258, 507 226
        "
                            />

                            <path
                                className="about-move-art__arrow"
                                d="M 484 216 L 508 226 L 494 247"
                            />

                            <path
                                className="about-move-art__motion"
                                d="M 192 73 L 212 57"
                            />

                            <path
                                className="about-move-art__motion"
                                d="M 204 91 L 231 83"
                            />

                            <path
                                className="about-move-art__motion"
                                d="M 426 265 L 441 284"
                            />
                        </svg>

                        <span className="about-move-art__scribble">
                            keep it moving!
                        </span>

                        <div className="about-move-art__desk">
                            <span className="about-move-art__desk-label">
                                NEXT DESK
                            </span>

                            <div className="about-move-art__received-book">
                                <span>READ<br />ME NEXT</span>
                            </div>

                            <div className="about-move-art__desk-top" />
                            <i className="about-move-art__desk-leg about-move-art__desk-leg--left" />
                            <i className="about-move-art__desk-leg about-move-art__desk-leg--right" />
                        </div>

                        <span className="about-move-art__note about-move-art__note--end">
                            SOMEONE&apos;S NEXT →
                        </span>
                    </div>
                </div>
            </section>

            <section className="about-story page">
                <span className="about-label">THE IDEA</span>

                <div className="about-story__grid">
                    <h2>
                        ONE SHELF.
                        <br />
                        ANOTHER DESK.
                    </h2>

                    <div className="about-story__copy">
                        <p>
                            A book can finish its job for one person while still being
                            exactly what somebody else is looking for.
                        </p>

                        <p>
                            Kitab Ghar exists to make that movement easier: list the book,
                            let someone discover it, coordinate directly, and pass it on.
                        </p>
                    </div>
                </div>

                <div className="about-movement" aria-label="How a book moves">
                    <div className="about-movement__stop">
                        <span>01</span>
                        <BookOpen />
                        <strong>YOUR SHELF</strong>
                    </div>

                    <div className="about-movement__line">
                        <span>BOOK MOVES</span>
                    </div>

                    <div className="about-movement__stop about-movement__stop--middle">
                        <span>02</span>
                        <HandHeart />
                        <strong>KITAB GHAR</strong>
                    </div>

                    <div className="about-movement__line">
                        <span>KEEPS MOVING</span>
                    </div>

                    <div className="about-movement__stop">
                        <span>03</span>
                        <BookOpen />
                        <strong>NEXT DESK</strong>
                    </div>
                </div>
            </section>

            <section className="about-definition">
                <div className="page">
                    <span className="about-label">WHAT WE ARE</span>

                    <h2>A BOOK EXCHANGE. NOT A MARKETPLACE.</h2>

                    <div className="about-definition__grid">
                        <article className="about-board about-board--is">
                            <span className="about-board__stamp">KITAB GHAR IS</span>

                            <ul>
                                <li>
                                    <HandHeart />
                                    <span>
                                        <strong>Free</strong>
                                        Books are passed on, not priced.
                                    </span>
                                </li>

                                <li>
                                    <MapPin />
                                    <span>
                                        <strong>Local</strong>
                                        Built around discovery and coordination in Karachi.
                                    </span>
                                </li>

                                <li>
                                    <BookOpen />
                                    <span>
                                        <strong>Book-first</strong>
                                        Designed specifically around useful books.
                                    </span>
                                </li>

                                <li>
                                    <ShieldCheck />
                                    <span>
                                        <strong>Person-to-person</strong>
                                        People decide who they proceed with and coordinate directly.
                                    </span>
                                </li>
                            </ul>
                        </article>

                        <article className="about-board about-board--isnt">
                            <span className="about-board__stamp">KITAB GHAR ISN&apos;T</span>

                            <ul>
                                <li>
                                    <Store />
                                    <span>
                                        <strong>A bookstore</strong>
                                        We do not sell books.
                                    </span>
                                </li>

                                <li>
                                    <CircleDollarSign />
                                    <span>
                                        <strong>A payment platform</strong>
                                        No prices, checkout or payment processing.
                                    </span>
                                </li>

                                <li>
                                    <Truck />
                                    <span>
                                        <strong>A delivery company</strong>
                                        Handoffs are coordinated between people.
                                    </span>
                                </li>

                                <li>
                                    <CircleDollarSign />
                                    <span>
                                        <strong>A bargaining marketplace</strong>
                                        There is nothing to negotiate or bid on.
                                    </span>
                                </li>
                            </ul>
                        </article>
                    </div>
                </div>
            </section>

            <section className="about-beliefs page">
                <span className="about-label">WHAT WE BELIEVE</span>
                <h2>THREE SIMPLE IDEAS.</h2>

                <div className="about-beliefs__grid">
                    <article>
                        <span>01</span>
                        <BookOpen />
                        <h3>BOOKS SHOULD CIRCULATE.</h3>
                        <p>
                            A useful book has more life in it after its first reader is done.
                        </p>
                    </article>

                    <article>
                        <span>02</span>
                        <HandHeart />
                        <h3>GIVING SHOULD STAY SIMPLE.</h3>
                        <p>
                            Finding someone who needs your book should not become another
                            complicated transaction.
                        </p>
                    </article>

                    <article>
                        <span>03</span>
                        <ShieldCheck />
                        <h3>TRUST SHOULD BE VISIBLE.</h3>
                        <p>
                            Profiles, completed handoffs and ratings help people understand
                            who they are exchanging with.
                        </p>
                    </article>
                </div>
            </section>

            <section className="about-impact page">
                <div className="about-impact__heading">
                    <div>
                        <span className="about-label">THE SHELF SO FAR</span>
                        <h2>SMALL NUMBERS.<br />REAL BOOKS.</h2>
                    </div>

                    <p>
                        These numbers grow from actual activity on Kitab Ghar.
                    </p>
                </div>

                <div className="about-impact__stats">
                    <div>
                        <strong>0</strong>
                        <span>BOOKS GIVEN AWAY</span>
                    </div>

                    <div>
                        <strong>0</strong>
                        <span>LISTERS</span>
                    </div>

                    <div>
                        <strong>—</strong>
                        <span>RATINGS</span>
                    </div>
                </div>
            </section>

            <section className="about-karachi page">
                <div className="about-karachi__map" aria-hidden="true">
                    <svg
                        viewBox="0 0 620 420"
                        role="img"
                        aria-label="Stylized map showing Karachi on the Sindh coast"
                    >
                        {/* Sea */}
                        <path
                            className="karachi-map__sea"
                            d="
        M 20 302
        C 105 291, 168 307, 235 303
        C 310 299, 348 279, 403 264
        C 464 247, 527 249, 600 260
        L 600 400
        L 20 400
        Z
      "
                        />

                        {/* Balochistan */}
                        <path
                            className="karachi-map__balochistan"
                            d="
        M 20 50
        L 184 50
        C 193 91, 205 129, 228 164
        C 245 190, 249 218, 239 247
        C 228 277, 205 294, 174 301
        C 125 309, 76 302, 20 302
        Z
      "
                        />

                        {/* Lower Sindh */}
                        <path
                            className="karachi-map__sindh"
                            d="
        M 184 50
        L 574 50
        L 575 153
        C 559 171, 548 194, 541 217
        C 533 244, 515 258, 487 261
        C 448 264, 414 258, 383 270
        C 349 283, 323 300, 289 303
        C 266 305, 249 296, 239 278
        C 253 249, 254 218, 239 187
        C 219 147, 198 112, 184 50
        Z
      "
                        />

                        {/* Regional boundary */}
                        <path
                            className="karachi-map__boundary"
                            d="
        M 184 50
        C 193 91, 205 129, 228 164
        C 245 190, 249 218, 239 247
        C 234 260, 234 270, 239 278
      "
                        />

                        {/* Coastline emphasis */}
                        <path
                            className="karachi-map__coast"
                            d="
        M 239 278
        C 249 296, 266 305, 289 303
        C 323 300, 349 283, 383 270
        C 414 258, 448 264, 487 261
        C 515 258, 533 244, 541 217
      "
                        />

                        {/* Region labels */}
                        <text
                            className="karachi-map__region-label"
                            x="82"
                            y="155"
                            transform="rotate(-7 82 155)"
                        >
                            BALOCHISTAN
                        </text>

                        <text
                            className="karachi-map__region-label karachi-map__region-label--sindh"
                            x="370"
                            y="145"
                        >
                            SINDH
                        </text>

                        {/* Karachi locator */}
                        <g className="karachi-map__karachi">
                            <path
                                className="karachi-map__locator-line"
                                d="M 279 277 C 310 254, 333 241, 358 229"
                            />

                            <circle
                                className="karachi-map__marker-outer"
                                cx="279"
                                cy="277"
                                r="17"
                            />

                            <circle
                                className="karachi-map__marker-inner"
                                cx="279"
                                cy="277"
                                r="7"
                            />

                            <g transform="translate(350 198) rotate(-3)">
                                <rect
                                    className="karachi-map__label-box"
                                    x="0"
                                    y="0"
                                    width="126"
                                    height="48"
                                />

                                <text className="karachi-map__karachi-label" x="63" y="30" textAnchor="middle">
                                    KARACHI
                                </text>
                            </g>
                        </g>

                        {/* Sea waves */}
                        <g className="karachi-map__waves">
                            <path d="M 91 341 Q 107 330 123 341 T 155 341" />
                            <path d="M 190 367 Q 206 356 222 367 T 254 367" />
                            <path d="M 345 339 Q 361 328 377 339 T 409 339" />
                            <path d="M 468 365 Q 484 354 500 365 T 532 365" />
                        </g>

                        <text className="karachi-map__sea-label" x="370" y="375" textAnchor="middle">
                            ARABIAN SEA
                        </text>
                    </svg>

                    <span className="about-karachi__map-note">
                        KARACHI FIRST
                        <i />
                    </span>
                </div>

                <div>
                    <span className="about-label">KARACHI FIRST</span>

                    <h2>START LOCAL.<br />MAKE IT USEFUL.</h2>

                    <p>
                        Kitab Ghar begins in Karachi so discovery and handoffs can remain
                        practical. Listings use areas to help people understand where a
                        book is located without publishing private addresses.
                    </p>
                </div>
            </section>

            <section className="about-cta page selection-yellow">
                <div>
                    <span className="about-cta__sticker">YOUR SHELF → THEIR DESK</span>

                    <h2>
                        HAVE A BOOK
                        <br />
                        SITTING AROUND?
                    </h2>
                </div>

                <div className="about-cta__actions">
                    <Link className="about-cta__primary" to={ROUTES.giveBook}>
                        Give a Book
                        <ArrowRight />
                    </Link>

                    <Link className="about-cta__secondary" to={ROUTES.browse}>
                        Browse Books
                    </Link>
                </div>
            </section>
        </div>
    );
}