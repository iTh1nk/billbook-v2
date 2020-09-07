import React, { useState, useReducer } from "react";
import ReactPaginate from "react-paginate";
import IsError from "../../components/IsError";
import IsLoading from "../../components/IsLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";
import Axios from "axios";
import toasterNotes from "../../components/ToasterNotes";

interface Props {}

type Page = {
  pageSize: number;
  currentPage: number;
  previousPage: number;
  nextPage: number;
};
const initialStates: Page = {
  pageSize: 5,
  currentPage: 1,
  previousPage: 0,
  nextPage: 2,
};
type PageAction =
  | { type: "pageChange"; page: number }
  | { type: "pageSize"; page: number };
const pageReducer = (state: Page, action: PageAction) => {
  switch (action.type) {
    case "pageChange":
      return {
        ...state,
        currentPage: action.page + 1,
      };
    case "pageSize":
      return {
        ...state,
        pageSize: action.page,
      };
  }
};

const StatementPage: React.FunctionComponent<Props> = ({}) => {
  const [state, dispatch] = useReducer(pageReducer, initialStates);

  const fetcher = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API +
        "statements/get/page/" +
        "?page_size=" +
        state.pageSize +
        "&page=" +
        state.currentPage,
      {
        headers: { authorization: localStorage.getItem("auth") },
      }
    );
    const data = await res.json();
    return data;
  };
  const { data, error } = useSWR(
    `/statements/get/page/?page_size=${state.pageSize}&page=${state.currentPage}`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );
  if (error) return <IsError />;
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

  const handlePageClick = (e) => {
    dispatch({ type: "pageChange", page: e.selected });
  };

  return (
    <div>
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(data.total / data.page_size)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
      <br />
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
                <span className="text-gray-500">Username:</span> {item.username}
              </li>
              <li>
                <span className="text-gray-500">Balance:</span> ${item.balance}
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
                <span className="text-gray-500">Created:</span> {item.createdAt}
              </li>
              <li>
                <span className="text-gray-500">Updated:</span> {item.updatedAt}
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
  );
};

export default StatementPage;
