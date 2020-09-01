import React, { useState } from "react";
import { Modal } from "./Modal";

interface RnotesProps {
  isModal: boolean;
  cb: (e: any) => void;
}

export const Rnotes: React.FunctionComponent<RnotesProps> = (props) => {
  const [isLoading, setIsloading] = useState(true);

  return (
    <Modal
      title=""
      isNotConfirmBtn={true}
      isNotCancelBtn={true}
      isModal={props.isModal}
      cbIsModal={props.cb}
    >
      <div className="relative">
        <img
          src="/nextjs.svg"
          alt="NEXT.js Logo"
          className="bg-gray-200 p-6 md:p-10 rounded-lg"
        />
        <img
          src="/swr.png"
          alt="useSWR Logo"
          className="absolute bottom-1/20 right-1/20 w-10 h-6 md:w-20 md:h-10 mt-2 rounded-lg"
        />
      </div>
    </Modal>
  );
};
