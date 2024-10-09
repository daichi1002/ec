import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[#f5f5dc] py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; 2023 Handmade Treasures. All rights reserved.
        </p>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Link href="#" className="hover:text-primary" prefetch={false}>
            About
          </Link>
          <Link href="#" className="hover:text-primary" prefetch={false}>
            Contact
          </Link>
          <Link href="#" className="hover:text-primary" prefetch={false}>
            Terms
          </Link>
          <Link href="#" className="hover:text-primary" prefetch={false}>
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
};
