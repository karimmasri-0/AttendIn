import React from "react";

function Display() {
  const send = {
    about: "teacher",
    data: [
      { name: "Teacher_1", mail: "teacher_1@gmail.com", address: "New York" },
      { name: "Teacher_2", mail: "teacher_2@gmail.com", address: "Berlin" },
      { name: "Teacher_3", mail: "teacher_3@gmail.com", address: "Moscow" },
    ],
    header: "9",
  };
  return (
    <div>
      <table className="table">
        <thead className="attendin-btn">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Teacher_1</td>
            <td>teacher_1@gmail.com</td>
            <td>New York</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Teacher_2</td>
            <td>teacher_2@gmail.com</td>
            <td>Berlin</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Teacher_3</td>
            <td>teacher_3@gmail.com</td>
            <td>Moscow</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Display;
