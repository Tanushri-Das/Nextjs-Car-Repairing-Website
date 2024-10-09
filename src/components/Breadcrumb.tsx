import Link from "next/link";

const Breadcrumb = ({ page }: { page: string }) => {
  return (
    <div className="relative inline-block">
      <div className="bg-[#FF3811] py-2 px-10 text-white text-[16px] font-medium inline-block clip-path-style">
        <Link href="/" passHref>
          Home
        </Link>
        <span className="mx-1">{"/"}</span>
        <span>{page}</span>
      </div>
    </div>
  );
};

export default Breadcrumb;
