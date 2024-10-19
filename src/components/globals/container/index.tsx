import { TitlePage } from "../titlePage";

type ContainerProps = {
  title: string;
  children: React.ReactNode;
};

export function Container({ children, title }: ContainerProps) {
  return (
    <div className="m-12 flex h-full flex-col gap-8">
      <TitlePage title={title} />
      {children}
    </div>
  );
}
