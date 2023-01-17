import React from "react";
import { Button } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <div className="d-flex justify-content-center text-center m-6p">
        <div>
          <h2 className="font-weight-bold">Sorry, Page Not Found</h2>
          <div className="text-muted mt-3">
            The page you requested could not be found
          </div>
          <Link to="/">
            <Button className="mt-5 attendin-btn">
              <span className="px-2">Back To Homepage</span>
              <FaArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
