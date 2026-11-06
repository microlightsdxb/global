import Image from "next/image";
import Link from "next/link";
import React from "react";

type BaseProps = {
  label: string;
  tone?: "light" | "dark";
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
};

type LinkProps = BaseProps & { href: string; onClick?: never; type?: never };
type ButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: never;
  };

export type BoxButtonProps = LinkProps | ButtonProps;

const BoxButton = React.forwardRef<HTMLButtonElement, BoxButtonProps>((props, ref) => {
  const { label, tone = "light", icon, fullWidth = false, className = "" } = props;

  const toneClasses =
    tone === "dark"
      ? "border-black bg-black text-white hover:bg-white hover:text-black"
      : "border-white bg-white text-black hover:bg-black hover:text-white";

  const sizing = fullWidth ? "w-full justify-between" : "w-fit hover:gap-[72px]";

  const classes = `group inline-flex ${sizing} max-h-[57px] items-center gap-[20px] border-t px-[30px] pt-[15px] pb-[16px] text-description transition-[color,background-color,border-color,padding,gap] duration-300 ease-out hover:px-[4px] ${toneClasses} ${className}`;

  const content = (
    <>
      <span className="whitespace-nowrap">{label}</span>
      {icon ?? (
        <Image
          src="/assets/img/icons/btn-common-arrow.svg"
          alt=""
          width={16}
          height={16}
          unoptimized
          className="block w-[16px] h-[16px] max-w-none shrink-0 transition-transform duration-300 ease-out group-hover:rotate-45"
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
  const { label: _l, tone: _t, icon: _i, fullWidth: _f, className: _c, href: _h, type, ...rest } = props;

  return (
    <button ref={ref} type={type ?? "button"} {...rest} className={`${classes} cursor-pointer`}>
      {content}
    </button>
  );
});

BoxButton.displayName = "BoxButton";

export default BoxButton;
