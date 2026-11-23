import Link from "next/link";
import React from "react";

export const ArrowIcon = ({
  className = "",
  sizeClass = "w-[clamp(18px,calc(22*100vw/1920),22px)] h-[clamp(18px,calc(22*100vw/1920),22px)]",
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
  label?: string;
  ariaLabel?: string;
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
type StaticProps = BaseProps & { as: "span"; href?: never; onClick?: never; type?: never };

export type ArrowButtonProps = LinkProps | ButtonProps | StaticProps;

const ArrowButton = (props: ArrowButtonProps) => {
  const { label, ariaLabel, tone = "light", className = "" } = props;

  const classes = `group inline-flex w-fit flex-col ${tone === "dark" ? "text-black" : "text-white"} ${
    label ? "gap-[13px]" : "gap-[11px] min-w-[clamp(32px,calc(43*100vw/1920),43px)] min-h-[clamp(34px,calc(45*100vw/1920),45px)]"
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
