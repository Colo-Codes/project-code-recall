import LinkNextJS from "next/link";

// This component leverages NextJS Link component which includes built-in prefetching functionality
export default function Link({
  children,
  href,
  className = null,
}: {
  children: React.ReactNode,
  href: string,
  className?: string,
}) {
  return (
    <LinkNextJS
      href={href}
      className={
        className || "text-blue-600 hover:text-blue-800 hover:underline"
      }
    >
      {children}
    </LinkNextJS>
  );
}
