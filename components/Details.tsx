import React, { useState, useEffect, useContext } from "react";
import { IsLoadingSkeleton } from "./IsLoadingSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import moment from "moment";
import { AssignContext } from "./AssignContext";

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
  cbLogin: any;
}

const Details: React.FunctionComponent<Props> = ({ data0, year, cbLogin }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cycleRead, setCycleRead] = useState<string>();
  const [isExpand, setIsExpand] = useState<boolean>(true);
  const { isAuthenticated } = useContext(AssignContext);

  useEffect(() => {
    setCycleRead(localStorage.getItem("cycleRead"));
  });

  const markCycleRead = (cycle) => {
    localStorage.setItem("cycleRead", cycleRead + "," + cycle);
  };
  const chkCycleRead = (cycle) => {
    let spArr = localStorage.getItem("cycleRead")?.split(",");
    return spArr?.includes(cycle);
  };

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
              {isAuthenticated ? (
                <Link href={`/details/[cycleId]`} as={`/details/${item.id}`}>
                  <a>
                    <button
                      onClick={() => markCycleRead(item.date)}
                      className="px-3 outline-none font-semibold m-2 bg-gray-300 text-gray-800 rounded-md shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                      <span className="px-1">
                        {item.date.substring(5, item.date.length)}
                      </span>
                    </button>
                    <div className="z-10 text-green-700 absolute top-0 right-0 mt-1">
                      {chkCycleRead(item.date) ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : null}
                    </div>
                  </a>
                </Link>
              ) : (
                <span onClick={() => cbLogin()}>
                  <button className="px-3 outline-none font-semibold m-2 bg-gray-300 text-gray-800 rounded-md shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                    <span className="px-1">
                      {item.date.substring(5, item.date.length)}
                    </span>
                  </button>
                  <div className="z-10 text-green-700 absolute top-0 right-0 mt-1">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                </span>
              )}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Details;
