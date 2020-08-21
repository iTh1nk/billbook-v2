import React, { useState, useEffect } from "react";
import { IsLoadingSkeleton } from "./IsLoadingSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type DetailsData = {
  date: string;
  id: number;
};
interface Props {
  data: Array<DetailsData>;
  year: string;
  id: number;
}

const Details: React.FunctionComponent<Props> = ({ data, year }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isExpand, setIsExpand] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <div
        className="mt-10 w-0 underline font-bold cursor-pointer text-gray-600 transition duration-300 hover:text-gray-300"
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
        {data.map((item, idx) => (
          <div key={idx} className="inline relative m-1">
            <Link href={`/details/[id]`} as={`/details/${item.id}`}>
              <a>
                <button className="px-5 outline-none font-semibold m-1 bg-gray-300 text-gray-800 rounded-md shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                  <span className="px-1">{item.id}</span>
                </button>
                <div className="z-10 text-green-700 absolute top-0 right-0 mt-1">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
