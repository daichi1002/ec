import Link from "next/link";
import { SVGProps } from "react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#f5f5dc] border-b">
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold"
          prefetch={false}
        >
          <img src="/dog.png" alt="Logo" className="w-8 h-8" />
          ロンとハニ
        </Link>
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:text-primary" prefetch={false}>
            <SearchIcon className="w-6 h-6" />
            <span className="sr-only">Search</span>
          </Link>
          <Link href="/cart" className="hover:text-primary" prefetch={false}>
            <ShoppingCartIcon className="w-6 h-6" />
            <span className="sr-only">Cart</span>
          </Link>
          <Link href="#" className="hover:text-primary" prefetch={false}>
            <UserIcon className="w-6 h-6" />
            <span className="sr-only">Account</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ShoppingCartIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
