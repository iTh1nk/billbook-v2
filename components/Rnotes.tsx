import React, {useState} from 'react';
import Modal from './Modal';

export default function Rnotes(props) {
  const [isLoading, setIsloading] = useState(true);

  return (
    <Modal
      title="Release Notes"
      isModal={props.isModal}
      isNotConfirm={true}
      cbIsModal={props.cb}
    >
      <h1>We0m Custom label</h1>
    </Modal>
  )
}