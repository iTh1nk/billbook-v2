import React, { useState } from 'react';

interface Props {

}

const Activity: React.FunctionComponent<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div>
      <h1>We0m Custom</h1>
    </div>
  )
}

export default Activity