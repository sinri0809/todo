import React from 'react';

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
            <button className="page-link btn-sm"
              onClick={() => paginate(item)}
            >{item}</button>
          </li>
        ))
      }
      </ul>
    </nav>
  ) 
}

export default Pagination;