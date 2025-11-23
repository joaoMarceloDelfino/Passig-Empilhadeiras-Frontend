import styles from "./CalendarItem.module.css"

const CalendarItem = ({dayNumber}) => {
    return(
        <div className={styles.container}>
            {dayNumber}
        </div>
    )
}

export default CalendarItem;