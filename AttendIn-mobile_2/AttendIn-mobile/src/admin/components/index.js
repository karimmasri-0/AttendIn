import React from "react";
import { Button, Form } from "react-bootstrap";
import { MdSchedule } from "react-icons/md";
function Main() {
  return (
    <div>
      <div className="d-flex justify-content-around align-items-center">
        <h1 style={{ color: "rgb(75 85 99)" }}>Schedule</h1>
        {/* <Form>
          <Form.Control type="text" className="" />
        </Form> */}
        <Button
          className="btn btn-sucess btn-sm py-2"
          style={{ backgroundColor: "#81B622" }}
        >
          <MdSchedule />
          <span className="p-1">Create Schedule</span>
        </Button>
      </div>
      <div style={{ backgroundColor: "rgb(229 231 235)" }}></div>
    </div>
  );
}

export default Main;
