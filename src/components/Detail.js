/* eslint-disable */
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import './../style.scss';

// function Detail(props){
const Detail = ({todos}) => {
  let history = useHistory();
  // index 뽑아내기 
  // console.log(history.location.pathname.split('/').pop());
  let order = history.location.pathname.split('/').pop();
  order = parseInt(order);

  const todoDetail = todos[order];

  return(
    <section className="detail-box">
      <article className="p-5">
        <h4 className="text-left mb-5">
          {todoDetail.todo}
        </h4>

        <textarea 
          className="textbox"
          onKeyPress={(e) => upload(e)}
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
      <Button variant="dark">upload</Button>
    </section>
  )
}
// when enter upload data
// to todo contents
function upload(e){
  if(e.key === "Enter"){
    console.log("enter");
  }
}

export default Detail;