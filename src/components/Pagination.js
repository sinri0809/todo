import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({perPage, totalPage, paginate}) => {
  // page list 만들기
  const pageNumbers = [];
  for(let i = 1; i<=Math.ceil(totalPage/perPage); i++){
    pageNumbers.push(i);
  }

  return(
    <nav>
      <ul className="pagination justify-content-center mt-3">
      {
        pageNumbers.map((item, index) => (
          <li key={index} className="page-item">
            <Link to="#" className="page-link btn-sm"
              onClick={() => paginate(item)}
            >{item}</Link>
          </li>
        ))
      }
      </ul>
    </nav>
  ) 
}

export default Pagination;