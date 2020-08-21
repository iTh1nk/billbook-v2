import React, { ReactNode } from "react";

interface ContainerProps {
  title?: string;
}

export const Container: React.FunctionComponent<ContainerProps> = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="z-0 mt-20 ml-6 mr-6 mb-auto md:ml-12 md:mr-12">
      {children}
    </div>
  );
};
