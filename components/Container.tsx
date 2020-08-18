import React, { ReactNode } from "react";

type ContainerProps = {
  title?: string;
};

const Container: React.FunctionComponent<ContainerProps> = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <div className="mt-16 ml-12 mr-12 mb-auto">{children}</div>;
};

export default Container;
