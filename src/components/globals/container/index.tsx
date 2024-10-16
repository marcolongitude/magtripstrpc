import { TitlePage } from "../titlePage";

type ContainerProps = {
  title: string;
  children: React.ReactNode;
};

export function Container({ children, title }: ContainerProps) {
  return (
    <div className="m-20 flex h-full flex-col gap-12">
      <TitlePage title={title} />
      {children}
    </div>
  );
}
