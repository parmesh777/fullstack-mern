import React from "react";

const Page = ({ perPage, total, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination pagination-lg">
        {pageNumbers.map((number) => (
          <li className="page-item " key={number}>
            <a className="page-link " onClick={() => paginate(number)} href="#">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Page;
