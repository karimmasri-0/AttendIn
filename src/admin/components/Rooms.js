import React from "react";
import { Button, Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { BiAddToQueue } from "react-icons/bi";
function Students() {
  const data = [
    {
      id: 1,
      name: "CF2",
      description: "-2nd floor",
      capacity: "50",
    },
    {
      id: 2,
      name: "CB",
      description: "Ground floor",
      capacity: "14",
    },
    {
      id: 3,
      name: "CF3",
      description: "3rd floor 2nd",
      capacity: "36",
    },
  ];
  const [search, setSearch] = useSearchParams({});
  const handleSearch = (e) => {
    setSearch({ q: e.target.value });
  };
  return (
    <div>
      <div className="d-flex justify-content-around align-items-center my-5">
        <h1 style={{ color: "rgb(75 85 99)" }}>Rooms</h1>
        <Form>
          <Form.Group>
            <Form.Control placeholder="  Search" onChange={handleSearch} />
          </Form.Group>
        </Form>
        <Button
          className="btn btn-success btn-sm d-flex align-items-center py-2"
          style={
            {
              // backgroundColor: "#3da65c",
            }
          }
        >
          <BiAddToQueue />
          <span className="px-1">Add New Room</span>
        </Button>
      </div>
      <div className="table-bordered" style={{ padding: "0% 15%" }}>
        <table className="table table-hover text-center">
          <thead style={{ backgroundColor: "#3da65c" }}>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Capacity</th>
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
                      student.description
                        .toLowerCase()
                        .includes(search.get("q").toLowerCase()) ||
                      student.capacity
                        .toLowerCase()
                        .includes(search.get("q").toLowerCase());
              })
              .map((element) => (
                <tr key={element.id}>
                  <td>{element.id}</td>
                  <td>{element.name}</td>
                  <td>{element.description}</td>
                  <td>{element.capacity}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;
