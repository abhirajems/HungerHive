import React, { useEffect, useState } from "react";
import VendorLogin from "./VendorLogin";
import VendorNavbar from "./VendorNavbar";
import Footer from "./Footer";
import { createNodejsUrl, log } from "../../utils/utils";
import bgimage4 from "../../../src/images/bg4.jpg";

function VendorOrderHistory() {
  var vendorId = sessionStorage.getItem("vendorId");
  var isLoggedIn = sessionStorage.getItem("vendorLoggedIn");

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log("Inside Component Did Mount");
    getMyOrders();
  }, []);

  useEffect(() => {
    console.log("Component Did Update is called..");
  }, [orders]);

  const getMyOrders = () => {
    var obj = { vendor_id: vendorId };
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      if (helper.readyState === 4 && helper.status === 200) {
        var result = JSON.parse(helper.responseText);
        log(result);
        // Convert timestamps to 12-hour IST format
        const formattedOrders = result.map((order) => ({
          ...order,
          timestamp: formatTimestamp(order.timestamp),
        }));
        setOrders(formattedOrders);
      }
    };
    const url = createNodejsUrl("vendor/orderhistory");
    helper.open("POST", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(obj));
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-IN", options).format(date);
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
        <VendorNavbar />

        <div className="row" style={{ paddingTop: "180px" }}>
          <div className="col-md-3 my-3"></div>

          <div className="col-md-6">
            <div style={{ backgroundColor: "white" }}>
              <h2
                style={{
                  textAlign: "center",
                  marginTop: "15px",
                  padding: "10px",
                }}
              >
                Orders History
              </h2>
            </div>
            <div className="table-responsive my-3">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Tiffin</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Timestamp (IST)</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td>{order.name}</td>
                      <td>{order.tiffin_name}</td>
                      <td>{order.quantity}</td>
                      <td>{order.total_price}</td>
                      <td>{order.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-3 my-3"></div>
        </div>

        <Footer />
      </div>
    );
  } else {
    return <VendorLogin />;
  }
}

export default VendorOrderHistory;
