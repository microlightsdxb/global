import Link from "next/link";
import React from "react";

// Same paths as public/assets/img/icons/btn-arrow.svg (white) and btn-arrow-2.svg (#7D7D7D),
// inlined so the stroke follows currentColor. 22×22 at 1920px, scaling down to 18px.
// Rotates 45° clockwise (↗ → →) when any parent `group` is hovered — the button itself,
// or a whole clickable card that wraps an `as="span"` button.
// `sizeClass` replaces the default size — pass it instead of w-/h- in className,
// since two width utilities would conflict.
export const ArrowIcon = ({
  className = "",
  sizeClass = "w-[clamp(18px,1.146vw,22px)] h-[clamp(18px,1.146vw,22px)]",
}: {
  className?: string;
  sizeClass?: string;
}) => (
  <svg
    viewBox="0 0 22 22"
    fill="none"
    aria-hidden
    className={`${sizeClass} shrink-0 transition-transform duration-300 ease-out group-hover:rotate-45 ${className}`}
  >
    <path d="M6.41666 15.5834L15.5833 6.41669" stroke="currentColor" strokeWidth="1.83333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.41666 6.41669H15.5833V15.5834" stroke="currentColor" strokeWidth="1.83333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type BaseProps = {
  /** Visible text. Omit for the icon-only variant (line + arrow). */
  label?: string;
  /** Required when there is no label, so screen readers still get a name. */
  ariaLabel?: string;
  /**
   * "light" (default) — line, text and arrow all white. For dark backgrounds, e.g. the hero.
   * "dark" — line and text black, arrow #7D7D7D. For light backgrounds.
   */
  tone?: "light" | "dark";
  className?: string;
};

type LinkProps = BaseProps & { href: string; onClick?: never; type?: never; as?: never };
type ButtonProps = BaseProps & {
  href?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
  as?: never;
};
/** Visual only — use inside an element that is already a link (e.g. a whole clickable card). */
type StaticProps = BaseProps & { as: "span"; href?: never; onClick?: never; type?: never };

export type ArrowButtonProps = LinkProps | ButtonProps | StaticProps;

/**
 * v2 CTA: a top rule spanning the full width, with the label on the left and
 * an up-right arrow on the right. Hover: arrow rotates 45° clockwise.
 * Colour is set with `tone` — see BaseProps.
 */
const ArrowButton = (props: ArrowButtonProps) => {
  const { label, ariaLabel, tone = "light", className = "" } = props;

  // Colour comes from `tone` — don't pass text-* colours in className, both would
  // apply and Tailwind's CSS order (not class order) decides which one wins.
  // With text: 13px between line and text.
  // Icon-only: 43×45 at 1920 (43 / 1920 = 2.2396vw, 45 / 1920 = 2.3438vw), line on top,
  // arrow 11px below it at the right.
  const classes = `group inline-flex w-fit flex-col ${tone === "dark" ? "text-black" : "text-white"} ${
    label ? "gap-[13px]" : "gap-[11px] min-w-[clamp(32px,2.2396vw,43px)] min-h-[clamp(34px,2.3438vw,45px)]"
  } ${className}`;

  const content = (
    <>
      <span className="block h-px w-full bg-current" />
      <span className={`flex items-center ${label ? "justify-between gap-[20px] transition-[gap] duration-300 ease-out group-hover:gap-[15px]" : "justify-end"} text-description`}>
        {label}
        <ArrowIcon className={tone === "dark" ? "text-[#7D7D7D]" : ""} />
      </span>
    </>
  );

  if (props.as === "span") {
    return (
      <span aria-hidden={label ? undefined : true} className={classes}>
        {content}
      </span>
    );
  }

  if (props.href !== undefined) {
    return (
      <Link href={props.href} aria-label={label ? undefined : ariaLabel} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      aria-label={label ? undefined : ariaLabel}
      className={`${classes} cursor-pointer`}
    >
      {content}
    </button>
  );
};

export default ArrowButton;
