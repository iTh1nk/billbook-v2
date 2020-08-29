import React, { useState, useEffect } from "react";
import { IsLoadingSkeleton } from "./IsLoadingSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import moment from "moment";

type CycleStatements = {
  id: number;
  balance: string;
  notes: string;
  createdAt: string;
  updateAt: string;
  user: string;
  cycle: number;
};
type Cycles = {
  id: number;
  date: string;
  createdAt: string;
  updatedAt: string;
};
interface Props {
  data?: Array<CycleStatements>;
  data0: Array<Cycles>;
  year: string;
}

const Details: React.FunctionComponent<Props> = ({ data0, year }) => {
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
        className="mt-10 w-0 underline font-bold cursor-pointer text-gray-500 transition duration-300 hover:text-gray-300"
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
        {data0.map((item, idx) =>
          moment(item.date, "YYYY-MM-DD").format("YYYY") === year ? (
            <div key={item.id} className="inline relative m-1">
              <Link href={`/details/[id]`} as={`/details/`}>
                <a>
                  <button className="px-5 outline-none font-semibold m-1 bg-gray-300 text-gray-800 rounded-md shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                    <span className="px-1">{item.date}</span>
                  </button>
                  <div className="z-10 text-green-700 absolute top-0 right-0 mt-1">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                </a>
              </Link>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Details;
