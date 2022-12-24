import React from "react";
import "../AllCode.css";
const Pagination = ({ users, pageHandler }) => {
  let pageNumbers = [];
  for (let i = 1; i < Math.ceil(users.length / 5) + 1; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination">
      {pageNumbers.map((page) => (
        <div className="pageBtn" onClick={() => pageHandler(page)}>
          {page}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
