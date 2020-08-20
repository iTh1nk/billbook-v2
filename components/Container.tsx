import React, { ReactNode } from "react";

interface ContainerProps {
  title?: string;
}

export const Container: React.FunctionComponent<ContainerProps> = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <div className=" z-0 mt-20 ml-12 mr-12 mb-auto">{children}</div>;
};
