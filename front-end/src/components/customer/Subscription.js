

// import React, { useEffect, useState } from "react";
// import Login from "./Login";
// import { createNodejsUrl } from "../../utils/utils";
// import Footer from "./Footer";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import CustomerNavbar2 from "./CustomerNavbar2";
// import bgimage4 from "../../../src/images/bg4.jpg";

// function Subscription() {
//   var isLoggedIn = sessionStorage.getItem("isLoggedIn");
//   var customerId = sessionStorage.getItem("customerId") || "";

//   const [subs, setSubs] = useState([]);
//   const [status, setStatus] = useState("");

//   useEffect(() => {
//     console.log("Fetching subscription data...");
//     select();
//   }, []);

//   const select = async () => {
//     try {
//       if (!customerId) {
//         console.warn("No customer ID found.");
//         setSubs([]);
//         setStatus("inactive");
//         return;
//       }

//       const id = { customer_id: customerId };
//       const url = createNodejsUrl("customer/getsubscription");

//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(id),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log("API Response:", result);

//       if (Array.isArray(result) && result.length > 0) {
//         setSubs(result);
//         setStatus(result[0]?.status || "inactive");
//       } else {
//         setSubs([]);
//         setStatus("inactive");
//       }
//     } catch (error) {
//       console.error("Error fetching subscription data:", error);
//       setSubs([]);
//       setStatus("inactive");
//     }
//   };

//   const buy = () => {
//     if (subs.length > 0) {
//       toast.error("You already have one subscription plan.");
//     } else {
//       toast.success("Redirecting to purchase page...");
//       window.location.href = "/buy-subscription";
//     }
//   };

//   const cancel = () => {
//     toast.success("Plan canceled");
//     setStatus("inactive");
//   };

//   const active = () => {
//     toast.success("Plan activated");
//     setStatus("active");
//   };

//   if (isLoggedIn) {
//     return (
//       <div>
//         <div
//           style={{
//             backgroundImage: `url(${bgimage4})`,
//             backgroundAttachment: "fixed",
//             content: "",
//             position: "fixed",
//             width: "100%",
//             height: "100%",
//             zIndex: -1,
//             opacity: 0.5,
//           }}
//         ></div>
//         <CustomerNavbar2 />

//         <div className="row my-3" style={{ paddingTop: "180px" }}>
//           <div className="col-md-3"></div>
//           <div className="col-md-6">
//             <div className="row">
//               <div className="col-md-9"></div>
//               <div className="col-md-3">
//                 <button className="btn btn-dark btn-lg my-3 mx-3" onClick={buy}>
//                   Buy Subscription
//                 </button>
//               </div>
//             </div>
//             <div style={{ backgroundColor: "white" }}>
//               <h2
//                 style={{
//                   textAlign: "center",
//                   marginTop: "15px",
//                   padding: "10px",
//                 }}
//               >
//                 My Subscriptions
//               </h2>
//             </div>
//             <div className="table-responsive my-3">
//               <table className="table table-bordered">
//                 <thead>
//                   <tr>
//                     <th>Plan</th>
//                     <th>Description</th>
//                     <th>Price</th>
//                     <th>No. of meals</th>
//                     <th>Transaction Id</th>
//                     <th>Status</th>
//                     <th>Cancel/Active</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {subs && subs.length > 0 ? (
//                     subs.map((sub, index) => (
//                       <tr key={index}>
//                         <td>{sub.name}</td>
//                         <td>{sub.description}</td>
//                         <td>{sub.price}</td>
//                         <td>{sub.no_of_meals}</td>
//                         <td>{sub.transaction_id}</td>
//                         <td>{sub.status}</td>
//                         <td>
//                           {status === "active" ? (
//                             <button className="btn btn-danger" onClick={cancel}>
//                               Cancel plan
//                             </button>
//                           ) : (
//                             <button
//                               className="btn btn-success"
//                               onClick={active}
//                             >
//                               Activate Plan
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="7" className="text-center">
//                         No Subscription Found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div className="col-md-3"></div>
//         </div>

//         <Footer />
//       </div>
//     );
//   } else {
//     return <Login />;
//   }
// }

// export default Subscription;
