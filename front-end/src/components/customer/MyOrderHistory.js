import React, { useEffect, useState } from "react";
import Login from "./Login";
import { createNodejsUrl } from "../../utils/utils";
import Footer from "./Footer";
import CustomerNavbar2 from "./CustomerNavbar2";
import bgimage4 from "../../../src/images/bg4.jpg";

function MyOrderHistory() {
  var isLoggedIn = sessionStorage.getItem("isLoggedIn");
  var customerId = sessionStorage.getItem("customerId");

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log("Fetching order history");
    select();
  }, []);

  const select = () => {
    var id = { customer_id: customerId };
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      if (helper.readyState === 4 && helper.status === 200) {
        var result = JSON.parse(helper.responseText);
        setOrders(result);
      }
    };
    const url = createNodejsUrl("customer/orderhistory");
    helper.open("POST", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(id));
  };

  // Function to convert timestamp to IST and format it in 12-hour format
  const formatISTTime = (timestamp) => {
    let date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }).format(date);
  };

  if (isLoggedIn) {
    return (
      <div>
        <div
          style={{
            backgroundImage: `url(${bgimage4})`,
            backgroundAttachment: "fixed",
            position: "fixed",
            width: "100%",
            height: "100%",
            zIndex: -1,
            opacity: 0.5,
          }}
        ></div>
        <CustomerNavbar2 />

        <div className="row my-3" style={{ paddingTop: "180px" }}>
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div style={{ backgroundColor: "white" }}>
              <h2
                style={{
                  textAlign: "center",
                  marginTop: "15px",
                  padding: "10px",
                }}
              >
                My Orders
              </h2>
            </div>
            <div className="table-responsive my-3">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Tiffin</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Transaction Id</th>
                    <th>Timestamp (IST)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td>{order.tiffin_name}</td>
                      <td>{order.quantity}</td>
                      <td>{order.tiffin_price}</td>
                      <td>{order.transaction_id}</td>
                      <td>{formatISTTime(order.timestamp)}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>

        <Footer />
      </div>
    );
  } else {
    return <Login />;
  }
}

export default MyOrderHistory;
