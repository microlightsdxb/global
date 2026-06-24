import Link from "next/link";
import Image from "next/image";

interface ArrowButtonProps {
  title: string;
  href: string;
  variant?: 1 | 2;
  className?: string;
  download?: boolean;
}

const ArrowButton = ({
  title,
  href,
  variant = 1,
  className = "",
  download = false,
}: ArrowButtonProps) => {
  const isV1 = variant === 1;

  return (
    <Link
      href={href}
      className={`
        group inline-flex items-center justify-between gap-5
        px-[30px] py-4 transition-colors duration-300 max-h-[57px]
        ${
          isV1
            ? "bg-primary text-white hover:bg-white hover:text-black border-primary border"
            : "bg-white text-black hover:bg-primary hover:text-white border-white border"
        }
        ${className}
      `}
    >
      <span className="text-sm leading-[1.3888888888888888] -tracking-[0.01em]">
        {title}
      </span>

      {download ? (
        <Image
          src={"/assets/img/icons/download.svg"}
          alt=""
          width={20}
          height={20}
          aria-hidden
        />
      ) : (
        <Image
          src={"/assets/img/icons/right-top-arrow.svg"}
          alt=""
          width={16}
          height={16}
          className="transition-transform duration-400 group-hover:scale-[1.05] group-hover:rotate-45 group-hover:translate-x-2"
          aria-hidden
        />
      )}
    </Link>
  );
};

export default ArrowButton;
