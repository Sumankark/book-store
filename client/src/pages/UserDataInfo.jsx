import React from "react";
import { RxCross1 } from "react-icons/rx";

const UserDataInfo = ({ userDivData, userDiv, setUserDiv }) => {
  return (
    <div
      className={`${
        userDiv === "fixed" ? "fixed" : "hidden"
      } inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50`}
    >
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">User Information</h1>
          <button className="text-red-500" onClick={() => setUserDiv("hidden")}>
            <RxCross1 />
          </button>
        </div>

        <div className="mb-2">
          <label className="font-semibold">UserName: </label>
          <span>{userDivData?.userName || "N/A"}</span>
        </div>
        <div className="mb-2">
          <label className="font-semibold">Email: </label>
          <span>{userDivData?.email || "N/A"}</span>
        </div>
        <div className="mb-2">
          <label className="font-semibold">Address: </label>
          <span>{userDivData?.address || "N/A"}</span>
        </div>
      </div>
    </div>
  );
};

export default UserDataInfo;
