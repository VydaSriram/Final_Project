import React, { useContext, useEffect } from "react";
import userContext from "../context/users/userContext";
import AllOrderTable from "./AllOrderTable";
export default function AllOrders() {
  let context = useContext(userContext);
  const { allordersfunc, allorders } = context;
  useEffect(() => {
    allordersfunc();
  }, []);
  console.log(allorders);
  let row = 0;
  return (
    <>
      <div className="container my-3" style={{ textAlign: "center" }}>
        <h1> All Orders </h1>
      </div>
      <div className="container">
        <table className="table container my-5">
          <thead>
            <tr>
              <th scope="col">S.no</th>
              <th scope="col"> UserName </th>
              <th scope="col"> UserEmail </th>
              <th scope="col"> Vehiclename </th>
              <th scope="col"> Category </th>
            </tr>
          </thead>
          <tbody>
            {allorders.map((order) => {
              return (
                <AllOrderTable
                  key={order._id}
                  uname={order.username}
                  mail={order.useremail}
                  vehiclename={order.vehicleName}
                  Category={order.vehicleCategory}
                  row={++row}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
