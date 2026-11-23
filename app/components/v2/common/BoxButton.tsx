import Image from "next/image";
import Link from "next/link";
import React from "react";

type BaseProps = {
  label: string;
  tone?: "light" | "dark";
  icon?: React.ReactNode;
  fullWidth?: boolean;
  /** "large": 117px tall block (px 33 / py 38, 124px gap, text-subtitle-2), e.g. the footer brochure */
  size?: "default" | "large";
  className?: string;
};

type LinkProps = BaseProps & { href: string; onClick?: never; type?: never };
type ButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: never;
  };

export type BoxButtonProps = LinkProps | ButtonProps;

const BoxButton = React.forwardRef<HTMLButtonElement, BoxButtonProps>((props, ref) => {
  const { label, tone = "light", icon, fullWidth = false, size = "default", className = "" } = props;

  const toneClasses =
    tone === "dark"
      ? "border-black bg-black text-white hover:bg-white hover:text-black"
      : "border-white bg-white text-black hover:bg-black hover:text-white";

  // Spacing as variables so the hover gap can grow by exactly what the side padding loses (keeps the width fixed)
  const box =
    size === "large"
      ? "[--bx:clamp(20px,calc(33*100vw/1920),33px)] [--bg:clamp(24px,calc(124*100vw/1920),124px)] max-h-[clamp(84px,calc(117*100vw/1920),117px)] pt-[clamp(23px,calc(37*100vw/1920),37px)] pb-[clamp(24px,calc(38*100vw/1920),38px)] text-subtitle-2"
      : "[--bx:clamp(20px,calc(30*100vw/1920),30px)] [--bg:clamp(14px,calc(20*100vw/1920),20px)] max-h-[clamp(44px,calc(57*100vw/1920),57px)] pt-[clamp(11px,calc(15*100vw/1920),15px)] pb-[clamp(12px,calc(16*100vw/1920),16px)] text-description";

  const sizing = fullWidth ? "w-full justify-between" : "w-fit hover:gap-[calc(var(--bg)+2*(var(--bx)-4px))]";

  const classes = `group inline-flex ${box} ${sizing} items-center gap-(--bg) px-(--bx) border-t transition-[color,background-color,border-color,padding,gap] duration-300 ease-out hover:px-[4px] ${toneClasses} ${className}`;

  const content = (
    <>
      <span className="whitespace-nowrap !tracking-[-0.01em]">{label}</span>
      {icon ?? (
        <Image
          src="/assets/img/icons/btn-common-arrow.svg"
          alt=""
          width={16}
          height={16}
          unoptimized
          className="block w-[16px] h-[16px] max-w-none shrink-0 transition-transform duration-300 ease-out group-hover:rotate-45 pointer-events-none"
        />
      )}
    </>
  );

  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label: _l, tone: _t, icon: _i, fullWidth: _f, size: _s, className: _c, href: _h, type, ...rest } = props;

  return (
    <button ref={ref} type={type ?? "button"} {...rest} className={`${classes} cursor-pointer`}>
      {content}
    </button>
  );
});

BoxButton.displayName = "BoxButton";

export default BoxButton;
