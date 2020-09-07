import React, { useState, useReducer } from "react";
import IsError from "../../components/IsError";
import IsLoading from "../../components/IsLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";
import Axios from "axios";
import toasterNotes from "../../components/ToasterNotes";

interface Props {
  pageSize: number;
  currentPage: number;
  cb: (num: number) => void;
}

const StatementPage: React.FunctionComponent<Props> = ({
  pageSize,
  currentPage,
  cb,
}) => {
  const fetcher = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API +
        "statements/get/page/" +
        "?page_size=" +
        pageSize +
        "&page=" +
        currentPage,
      {
        headers: { authorization: localStorage.getItem("auth") },
      }
    );
    const data = await res.json();
    cb(Math.ceil(data.total / data.page_size));
    return data;
  };
  const { data, error } = useSWR(
    `/statements/get/page/?page_size=${pageSize}&page=${currentPage}`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );
  if (error) {
    console.log(error);
    return <IsError />;
  }
  if (!data) return <IsLoading />;

  const handleDelete = (id) => {
    Axios.delete(
      process.env.NEXT_PUBLIC_API + "statements/delete/" + id + "/",
      { headers: { authorization: localStorage.getItem("auth") } }
    )
      .then((resp) => {
        toasterNotes("success", 5000);
      })
      .catch((err) => {
        console.log(err, err.response);
        toasterNotes("error", 5000);
      });
  };

  return (
    <div>
      <div>
        {data?.results?.length !== 0 ? (
          data?.results?.map((item, idx) => (
            <div key={item.id}>
              <div className=" mt-5">
                {idx + 1}.{" "}
                <span className="underline font-bold">${item.balance}</span>
                <FontAwesomeIcon
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                  className="ml-2 text-red-500 cursor-pointer"
                  icon={faTrashAlt}
                />
              </div>
              <ul className="list-disc ml-6">
                <li>
                  <span className="text-gray-500">id:</span> {item.id}
                </li>
                <li>
                  <span className="text-gray-500">Username:</span>{" "}
                  {item.username}
                </li>
                <li>
                  <span className="text-gray-500">Balance:</span> $
                  {item.balance}
                </li>
                <li>
                  <span className="text-gray-500">Notes:</span> {item.notes}
                </li>
                <li>
                  <span className="text-gray-500">User:</span> {item.user}
                </li>
                <li>
                  <span className="text-gray-500">Cycle:</span> {item.cycle}
                </li>
                <li>
                  <span className="text-gray-500">Created:</span>{" "}
                  {item.createdAt}
                </li>
                <li>
                  <span className="text-gray-500">Updated:</span>{" "}
                  {item.updatedAt}
                </li>
              </ul>
            </div>
          ))
        ) : (
          <div className="font-mono text-lg animate-pulse">
            No data has been recorded yet...
          </div>
        )}
      </div>
    </div>
  );
};

export default StatementPage;
