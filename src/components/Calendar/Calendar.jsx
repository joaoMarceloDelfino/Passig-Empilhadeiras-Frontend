import { useEffect, useState } from "react";
import styles from "./Calendar.module.css";
import CalendarItem from "./CalendarItem/CalendarItem";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Calendar = ({selectedDate, setSelectedDate}) => {

    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    const [calendarContent, setCalendarContent] = useState([]);
    const months = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        let content = []
        const emptyDays = new Date(year, monthIndex, 1).getDay();
        content = Array(emptyDays).fill(null);
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        for(let i = 1; i <= daysInMonth; i++) {
            content.push(i);
        }

        for(let i = content.length; i % 7 != 0; i++){
            content.push(null);
        }

        setCalendarContent(content);

    }, [monthIndex])

    const onSetSelectedDate = (day, month, year) => {
        const data = new Date(year, month, day);
        const dataFormatada = data.toISOString().split("T")[0]
        setSelectedDate(dataFormatada);
    }

    const isSelectedDateBeforeToday = (day, month, year) => {
        const selectedDate = new Date(year, month, day);
        selectedDate.setHours(0, 0, 0, 0); 

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return selectedDate < today;
    };

    
    const isSelectedDate = (day, month, year) => {

        if(day === null) return false;

        const data = new Date(year, month, day);
        const dataFormatada = data.toISOString().split("T")[0]
        return dataFormatada === selectedDate;
    }       

    const onMonthBefore = () => {
        const monthBefore = monthIndex - 1;

        if(new Date(year, monthBefore, 1) < new Date(new Date().getFullYear(), new Date().getMonth(), 1)) return;

        if(monthBefore >= 0) {
            setMonthIndex(monthBefore);
        } else {
            setMonthIndex(11);
            setYear(prev => prev - 1);
        }
    }

    const onMonthAfter = () => {
        const monthAfter = monthIndex + 1;

        if(monthAfter > 11) {
            setMonthIndex(0);
            setYear(prev => prev + 1);
        } else {
            setMonthIndex(monthAfter);
        }
    }


   

    return (
        <div className={styles.calendarWrapper}>
            <h1 className={styles.title}>{`${months[monthIndex].toUpperCase()} ${year}`}</h1>
            <div className = {styles.calendarContent}>
                <button type="button" onClick={onMonthBefore} className={styles.button}>
                    <FaArrowLeft size={30}/>
                </button>
                <div className = {styles.calendarDiv}>
                    {
                        daysOfWeek.map((item) => {
                            return <div className={styles.dayOfWeek}>{item}</div>
                        })
                    }
                    {
                        calendarContent.map((item) => (
                        
                            <CalendarItem dayNumber={item}
                                selectedDateHandler={() => onSetSelectedDate(item, monthIndex, year)}   
                                isSelectedDate={() => isSelectedDate(item, monthIndex, year)} 
                                isSelectedDateBeforeToday={() => isSelectedDateBeforeToday(item, monthIndex, year)}
                            />
                        
                        ))

                    }
                </div>
                <button type="button" onClick={onMonthAfter} className={styles.button}>
                    <FaArrowRight size={30}/>
                </button>
            </div>
        </div>
    )
}

export default Calendar;