import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Container = ({ children, className, id }: Props) => {
  return (
    <div
      id={id}
      className={cn("max-w-screen-xl mx-auto pb-14 px-4", className)}
    >
      {children}
    </div>
  );
};

export default Container;
