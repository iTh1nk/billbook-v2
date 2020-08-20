import React, { useState } from "react";
import { Modal } from "./Modal";

interface RnotesProps {
  isModal: boolean;
  cb: (e: any) => void;
};

export const Rnotes: React.FunctionComponent<RnotesProps> = (props) => {
  const [isLoading, setIsloading] = useState(true);

  return (
    <Modal title="Release Notes" isModal={props.isModal} cbIsModal={props.cb}>
      <h1>We0m Custom label</h1>
    </Modal>
  );
};
