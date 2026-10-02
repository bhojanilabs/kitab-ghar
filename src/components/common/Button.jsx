import { Link } from "react-router-dom";
import "./Button.css";

export default function Button({
  children,
  to,
  variant = "primary",
  icon: Icon,
  type = "button",
  className = "",
  ...props
}) {
  const classes = `kg-button kg-button--${variant} ${className}`.trim();

  const content = (
    <>
      {children}
      {Icon && <Icon aria-hidden="true" />}
    </>
  );

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  );
}