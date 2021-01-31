import React, { useReducer } from "react";
import Admin from "../../components/admin/Admin";
import AdminPanel from "../../components/admin/AdminPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import IsError from "../../components/IsError";
import IsLoading from "../../components/IsLoading";
import toasterNotes from "../../components/ToasterNotes";
import moment from "moment";
import useSWR from "swr";
import { reducer, initialState } from "../../lib/m0Reducer";
import { GetStaticProps } from "next";

type APNS = {
  id: string;
  environment: string;
  username: string;
  apnsToken: string;
  ipAddr: string;
  loginTimes: number;
  createdAt: string;
  updatedAt: string;
};

const Apns: React.FunctionComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDelete = (id) => {
    Axios.delete(process.env.NEXT_PUBLIC_API + "apns/delete/" + id + "/", {
      headers: { authorization: localStorage.getItem("auth") },
    })
      .then((resp) => {
        toasterNotes("success", 5000);
      })
      .catch((err) => {
        console.log(err, err.response);
        toasterNotes("error", 5000);
      });
  };

  const fetcher = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API + "apns/get/", {
      headers: { authorization: localStorage.getItem("auth") },
    });
    const data = await res.json();
    return data;
  };
  const { data, error } = useSWR("/apns/get/", fetcher, {
    refreshInterval: 1000,
  });
  if (error) return <IsError />;
  if (!data) return <IsLoading />;

  return (
    <div>
      <Admin>
        <AdminPanel
          cbTab={(tabName) => dispatch({ type: "tab", tabName: tabName })}
        >
          {/* START - HOME */}
          <div className={state.tab === "home" ? "inline" : "hidden"}>
            {data?.length !== 0 ? (
              data?.map((item, idx) => (
                <div key={item.id}>
                  <div className=" mt-5">
                    {idx + 1}.{" "}
                    <span className="underline font-bold">{item.date}</span>
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
                      <span className="text-gray-500">id: </span>
                      {item.id}
                    </li>
                    <li>
                      <span className="text-gray-500">username: </span>
                      {item.username}
                    </li>
                    <li>
                      <span className="text-gray-500">apnsToken: </span>
                      {item.apnsToken}
                    </li>
                    <li>
                      <span className="text-gray-500">environment: </span>
                      {item.environment}
                    </li>
                    <li>
                      <span className="text-gray-500">loginTimes: </span>
                      {item.loginTimes}
                    </li>
                    <li>
                      <span className="text-gray-500">ipAddr: </span>
                      {item.ipAddr}
                    </li>
                    <li>
                      <span className="text-gray-500">Created: </span>
                      {item.createdAt}
                    </li>
                    <li>
                      <span className="text-gray-500">Updated: </span>
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
          {/* END - HOME */}
        </AdminPanel>
      </Admin>
    </div>
  );
};

export default Apns;
