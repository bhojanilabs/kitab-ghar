import { Heart, MapPin, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import GeneratedBookCover from "./GeneratedBookCover";
import GivenAwayStamp from "./GivenAwayStamp";
import "./BookCard.css";

export default function BookCard({
  id,
  title,
  metadata = [],
  area,
  condition,
  listerName,
  listerAvatar,
  coverType = "generated",
  coverUrl,
  coverAlt,
  subject = "General",
  level = "Book",
  coverTone,
  isFavorite = false,
  isGivenAway = false,
  onFavorite,
}) {
  const metadataLines = metadata
    .filter(Boolean)
    .slice(0, 2);

  function handleFavorite(event) {
    event.preventDefault();
    event.stopPropagation();

    if (onFavorite) {
      onFavorite(id);
    }
  }

  return (
    <article
      className={`book-card ${isGivenAway ? "book-card--given" : ""}`}
    >
      <Link
        to={`/book/${id}`}
        className="book-card__link"
        aria-label={`View ${title}`}
      />

      <section className="book-card__cover-area">
        <button
          type="button"
          className={`book-card__favorite ${
            isFavorite ? "book-card__favorite--active" : ""
          }`}
          onClick={handleFavorite}
          aria-label={
            isFavorite
              ? `Remove ${title} from favorites`
              : `Add ${title} to favorites`
          }
          aria-pressed={isFavorite}
        >
          <Heart aria-hidden="true" />
        </button>

        <div className="book-card__cover-wrap">
          {coverType === "uploaded" && coverUrl ? (
            <img
              className="book-card__cover-image"
              src={coverUrl}
              alt={coverAlt || `${title} cover`}
            />
          ) : (
            <GeneratedBookCover
              subject={subject}
              level={level}
              tone={coverTone}
            />
          )}

          {isGivenAway && (
            <div className="book-card__stamp">
              <GivenAwayStamp />
            </div>
          )}
        </div>
      </section>

      <section className="book-card__content">
        <h3 className="book-card__title" title={title}>
          {title}
        </h3>

        <div className="book-card__metadata">
          {metadataLines.map((line, index) => (
            <p key={`${line}-${index}`}>{line}</p>
          ))}
        </div>

        <div className="book-card__details">
          <span className="book-card__area">
            <MapPin aria-hidden="true" />
            <span>{area}</span>
          </span>

          <span className="book-card__condition">
            {condition}
          </span>
        </div>
      </section>

      <footer className="book-card__lister">
        {listerAvatar ? (
          <img
            className="book-card__avatar"
            src={listerAvatar}
            alt=""
          />
        ) : (
          <span className="book-card__avatar book-card__avatar--fallback">
            <UserRound aria-hidden="true" />
          </span>
        )}

        <span className="book-card__lister-name">
          {listerName}
        </span>
      </footer>
    </article>
  );
}