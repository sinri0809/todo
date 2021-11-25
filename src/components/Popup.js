/* eslint-disable */
import './../style.scss';
import { useEffect } from 'react';

const Popup = ({popup, setPopup, message}) => {
  useEffect(() => {
    let timer = setTimeout(() => {
      setPopup(false)
    }, 1000);
    return () => clearTimeout(timer);
  }, [popup]);

  return<div className="popup">
    {
      popup
      ? <span>{message}</span>
      : null
    }
  </div>
}

export default Popup;