import React, { useState } from 'react';

interface Props {

}

const Cycle: React.FunctionComponent<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div>
      <h1>We0m Custom</h1>
    </div>
  )
}

export default Cycle