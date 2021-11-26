/* eslint-disable */
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import './../style.scss';

const Detail = ({todos, url}) => {
  let history = useHistory();
  const [contents, setContents] = useState("");
  // index 뽑아내기 
  // console.log(history.location.pathname.split('/').pop());
  let order = history.location.pathname.split('/').pop();
  order = parseInt(order);
  const url_index = `${url}/${order}`
  const todoDetail = todos[order];

  return(
    <section className="detail-box">
      <article className="p-5">
        <h4 className="text-left mb-5">
          {todoDetail.todo}
        </h4>
        <textarea 
          className="textbox"
          onClick={(event) => event.target.value=''}
          onChange={(event) => setContents(event.target.value)}
          onKeyPress={(event) => upload(event, contents, url_index)}
          placeholder={todoDetail.todoContents}
          ></textarea>

        <p className="mt-2">
          작성 날짜 &#58; {todoDetail.date}
        </p>
      </article>

      <Button variant="white" onClick={() => {
        // main 페이지로 돌아가는 코드 임미당
        // hook을 넣은 것입니다.
        history.push('/');
      }}>back</Button>
      <Button variant="dark"
        onClick={(event) => upload(event, contents, url_index)}
      >upload</Button>
    </section>
  )
}
// when enter upload data
// to todo contents
function upload(event, contents, url_index){

  if(event.key === "Enter"){
    console.log("enter");
    console.error(contents);
    patchJSON(url_index, contents)
  }
}
const patchJSON = (url_index, contents) => {
  axios.patch(url_index, {todoContents : contents})
  .then(() => {
    console.log("patched");
  })
}
export default Detail;