import styles from "./CalendarItem.module.css"

const CalendarItem = ({dayNumber, selectedDateHandler, isSelectedDate, isSelectedDateBeforeToday}) => {

    const onSelectedDate = (dayNumber) => {
        if(dayNumber != null && !isSelectedDateBeforeToday()) {
            selectedDateHandler();
        }
    }

    return(
        <div 
        className={`${styles.container} ${!isSelectedDate() 
                    ? !isSelectedDateBeforeToday()
                        ? styles.notSelectedDate 
                        : styles.beforeDate 
                    : styles.selectedDate}`} 
            onClick={() => onSelectedDate(dayNumber)}
        >
            {dayNumber}
        </div>
    )
}

export default CalendarItem;