import React, { useState } from "react";
import { Modal } from "./Modal";

interface Props {
  isModal: boolean;
  cb: any;
}

export const GotIt: React.FunctionComponent<Props> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div>
      <Modal
        isModal={props.isModal}
        cbIsModal={() => props.cb()}
        title={"Got it?"}
        isNotConfirmBtn={true}
        isNotCancelBtn={true}
        isNotClose={false}
      >
        Got it
      </Modal>
    </div>
  );
};
