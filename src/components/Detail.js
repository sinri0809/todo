import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import './style.scss';

function Detail(props){
  let history = useHistory();
  // let todoTitle = 
  
  return(
    <section className="detail-box">
      <article className="p-5">
        <h4 className="text-left">
          {props.todo[props.listIndex].todo}
        </h4>
        <textarea 
          className="textbox"
          onKeyPress={(e) => {
            upload(e)
          }}
          ></textarea>
      </article>

      <Button variant="white" onClick={() => {
        // main 페이지로 돌아가는 코드 임미당
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