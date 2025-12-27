import { useEffect, useState } from "react";
import axios from "axios";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedback = async () => {
    const res = await axios.get("http://localhost/api/feedback_list.php");
    setFeedbacks(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.get(
      `http://localhost/api/feedback_status.php?id=${id}&status=${status}`
    );
    fetchFeedback();
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Customer Feedback</h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>#</th>
            <th>Order No</th>
            <th>Name</th>
            <th>Rating</th>
            <th>Message</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {feedbacks.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.order_number || "N/A"}</td>
              <td>{item.customer_name}</td>
              <td>{"⭐".repeat(item.rating)}</td>
              <td>{item.message}</td>
              <td>
                <span
                  style={{
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    background:
                      item.status === "ACTIVE" ? "green" : "red",
                  }}
                >
                  {item.status}
                </span>
              </td>
              <td>
                {item.status === "ACTIVE" ? (
                  <button
                    style={btnRed}
                    onClick={() => updateStatus(item.id, "HIDDEN")}
                  >
                    Hide
                  </button>
                ) : (
                  <button
                    style={btnGreen}
                    onClick={() => updateStatus(item.id, "ACTIVE")}
                  >
                    Show
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* 🔹 Styles */
const tableStyle = {
  width: "100%",
  background: "#fff",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const btnRed = {
  background: "#e74c3c",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: "4px",
  cursor: "pointer",
};

const btnGreen = {
  background: "#27ae60",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: "4px",
  cursor: "pointer",
};

export default Feedback;
