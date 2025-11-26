import styles from "./CalendarItem.module.css"

const CalendarItem = ({dayNumber, selectedDateHandler, isSelectedDate}) => {

    const onSelectedDate = (dayNumber) => {
        if(dayNumber != null) {
            selectedDateHandler();
        }
    }

    return(
        <div className={`${styles.container} ${!isSelectedDate ? styles.notSelectedDate : styles.selectedDate}`} 
            onClick={() => onSelectedDate(dayNumber)}
        >
            {dayNumber}
        </div>
    )
}

export default CalendarItem;