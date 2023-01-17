import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { IoPersonAddSharp } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";

function Students() {
  const [lgShow, setLgShow] = useState(false);
  const data = [
    {
      id: 1,
      name: "Teacher_1",
      email: "Teacher_1@gmail.com",
      address: "New York",
    },
    {
      id: 2,
      name: "Teacher_2",
      email: "Teacher_2@gmail.com",
      address: "Berlin",
    },
    {
      id: 3,
      name: "Teacher_3",
      email: "Teacher_3@gmail.com",
      address: "Moscow",
    },
  ];
  const [search, setSearch] = useSearchParams({});
  const handleSearch = (e) => {
    setSearch({ q: e.target.value });
  };
  const handleSubmit = (e) => {};
  return (
    <div>
      <div className="d-flex justify-content-around align-items-center my-5">
        <h1 style={{ color: "rgb(75 85 99)" }}>Students</h1>
        <Form>
          <Form.Group>
            <Form.Control placeholder="  Search" onChange={handleSearch} />
          </Form.Group>
        </Form>
        <Button
          type="button"
          onClick={() => setLgShow(true)}
          className="btn btn-success btn-sm d-flex align-items-center py-2"
          style={
            {
              // backgroundColor: "#3da65c",
            }
          }
        >
          <IoPersonAddSharp />
          <span className="px-1">Add New Student</span>
        </Button>
      </div>
      <div className="table-bordered" style={{ padding: "0% 15%" }}>
        <table className="table table-hover text-center">
          <thead style={{ backgroundColor: "#3da65c" }}>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody style={{ color: "rgb(75 85 99)" }}>
            {data
              .filter((student) => {
                console.log(student);
                return search.get("q") === "" ||
                  search.get("q") === null ||
                  search.get("q") === {} ||
                  search.get("q") === undefined
                  ? student
                  : student.name
                      .toLowerCase()
                      .includes(search.get("q").toLowerCase()) ||
                      student.email
                        .toLowerCase()
                        .includes(search.get("q").toLowerCase()) ||
                      student.address
                        .toLowerCase()
                        .includes(search.get("q").toLowerCase());
              })
              .map((element) => (
                <tr key={element.id}>
                  <td>{element.id}</td>
                  <td>{element.name}</td>
                  <td>{element.email}</td>
                  <td>{element.address}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Add Student
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col>
                  <Form.Group>
                    First Name:
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    Middle Name:
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    Last Name:
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="my-4 justify-content-center">
                <Col lg="4">
                  <Form.Group>
                    Username
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
                <Col lg="3">
                  <Form.Group>
                    Role
                    <Form.Control type="text" value="Student" disabled />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button className="attendin-btn" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default Students;
