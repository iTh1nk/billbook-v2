import React, { useState, useEffect } from "react";
import { IsLoadingSkeleton } from "./IsLoadingSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type DetailsData = {
  date: string;
};
interface Props {
  data: Array<DetailsData>;
  year: string;
}

export const Details: React.FunctionComponent<Props> = ({ data, year }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isExpand, setIsExpand] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <div
        className="mt-10 w-0 underline font-bold cursor-pointer"
        onClick={(e) => setIsExpand(!isExpand)}
      >
        {year}
      </div>
      <div
        className={
          (isExpand
            ? " duration-500 opacity-100 transform translate-y-3 "
            : "invisible duration-500 opacity-0 ") + "mt-2"
        }
      >
        {isLoading ? (
          <IsLoadingSkeleton />
        ) : (
          data.map((item, idx) => (
            <div key={idx} className="inline relative m-1">
              <button className="px-2 font-semibold m-1 bg-purple-200 text-purple-800 rounded-md shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                {item.date}
              </button>
              <div className="z-10 text-green-700 absolute top-0 right-0 mt-1">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
