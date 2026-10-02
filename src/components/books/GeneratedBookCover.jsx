import {
  BookOpen,
  Calculator,
  FlaskConical,
  Languages,
  Landmark,
  GraduationCap,
} from "lucide-react";

import "./GeneratedBookCover.css";

const subjectConfig = {
  Mathematics: {
    tone: "violet",
    Icon: Calculator,
  },
  Science: {
    tone: "green",
    Icon: FlaskConical,
  },
  English: {
    tone: "pink",
    Icon: Languages,
  },
  History: {
    tone: "orange",
    Icon: Landmark,
  },
  University: {
    tone: "purple-paper",
    Icon: GraduationCap,
  },
};

export default function GeneratedBookCover({
  subject = "General",
  level = "Book",
  tone,
  icon,
}) {
  const config = subjectConfig[subject] ?? {
    tone: "yellow",
    Icon: BookOpen,
  };

  const Icon = icon ?? config.Icon;
  const coverTone = tone ?? config.tone;

  return (
    <div className={`generated-cover generated-cover--${coverTone}`}>
      <strong>{subject}</strong>

      <Icon className="generated-cover__icon" aria-hidden="true" />

      <span className="generated-cover__level">
        {level}
      </span>
    </div>
  );
}