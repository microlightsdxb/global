import Image from "next/image";
import Link from "next/link";
import React from "react";

type BaseProps = {
  label: string;
  /**
   * "light" (default) — white box, black text. For dark backgrounds.
   * "dark" — black box, white text. For light backgrounds.
   * The arrow is #7D7D7D in both.
   */
  tone?: "light" | "dark";
  className?: string;
};

type LinkProps = BaseProps & { href: string; onClick?: never; type?: never };
type ButtonProps = BaseProps & {
  href?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
};

export type BoxButtonProps = LinkProps | ButtonProps;

/**
 * v2 solid CTA — a filled box with the label and a 16×16 up-right arrow
 * (public/assets/img/icons/btn-common-arrow.svg, #7D7D7D).
 * px 30 / py 16, max height 57px, 20px label → arrow gap.
 * Hover: colours invert smoothly (light → black box / white text) and the arrow
 * rotates 45° clockwise. The size and gap stay fixed.
 * A 1px top border in the starting colour (white on light, black on dark) is always there,
 * so it shows as a top line once the fill flips; top padding is 1px less to keep 16 overall.
 * The side padding also eases to 4px on hover while the gap grows by the same 52px (20 → 72),
 * so the label slides to the left edge and the arrow to the right without the button
 * changing width — a width change would move the edge under the cursor and flicker.
 */
const BoxButton = (props: BoxButtonProps) => {
  const { label, tone = "light", className = "" } = props;

  const toneClasses =
    tone === "dark"
      ? "border-black bg-black text-white hover:bg-white hover:text-black"
      : "border-white bg-white text-black hover:bg-black hover:text-white";

  const classes = `group inline-flex w-fit max-h-[57px] items-center gap-[20px] border-t px-[30px] pt-[15px] pb-[16px] text-description transition-[color,background-color,border-color,padding,gap] duration-300 ease-out hover:px-[4px] hover:gap-[72px] ${toneClasses} ${className}`;

  const content = (
    <>
      {label}
      <Image
        src="/assets/img/icons/btn-common-arrow.svg"
        alt=""
        width={16}
        height={16}
        unoptimized // SVG — skip the image optimizer, which rejects SVGs
        className="block w-[16px] h-[16px] max-w-none shrink-0 transition-transform duration-300 ease-out group-hover:rotate-45"
      />
    </>
  );

  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={props.type ?? "button"} onClick={props.onClick} className={`${classes} cursor-pointer`}>
      {content}
    </button>
  );
};

export default BoxButton;
