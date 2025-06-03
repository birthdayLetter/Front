import '../scss/LetterDetailList.scss'
import {useEffect, useState} from "react";


const LetterDetailList = ({date,content,fromUser,toUser}) => {
    const inputDate = new Date(date);
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const day = inputDate.getDate().toString().padStart(2, '0');
    const hour = inputDate.getHours();
    const minute = inputDate.getMinutes();
    const period = hour >= 12 ? '오후' : '오전';

    const formattedHour = (hour % 12).toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');

    const formattedDateString = `${year}년 ${month}월 ${day}일 ${period} ${formattedHour}시 ${formattedMinute}분`;

    return (
        <li className="ldl-container">
            <div className="ldl-user-box">
                <p className="ldl-fromUser">보낸사람 : {fromUser}</p>
                <p className="ldl-toUser">받은사람 : {toUser}</p>
            </div>
            <div className="ldl-content-box">
                <p className="ldl-content">{content}</p>
                <p className="ldl-date">{formattedDateString}</p>
            </div>
        </li>
    )
}

export default LetterDetailList;