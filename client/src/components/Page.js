import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const Page = ({ pagination, onPaginationChange }) => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const value = pagination.end * counter;
    // console.log("start", value - pagination.end);
    // console.log("end", value);
    onPaginationChange(value - pagination.end, value);
  }, [counter]);

  return (
    <div className="d-flex justify-content-between container">
      <Button variant="outline-primary" onClick={() => setCounter(counter - 1)}>
        Prev
      </Button>
      <Button variant="outline-success" onClick={() => setCounter(counter + 1)}>
        Next
      </Button>
    </div>
  );
};
export default Page;
