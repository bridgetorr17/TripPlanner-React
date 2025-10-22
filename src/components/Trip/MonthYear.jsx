import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { inputFieldStyles } from "../../components/Utilities/commonStyles";

const MonthYear = ( {selectedDate, setSelectedDate} ) => {

  const renderMonthContent = (month, shortMonth, longMonth, day) => {
    const fullYear = new Date(day).getFullYear();
    const tooltipText = `Tooltip for month: ${longMonth} ${fullYear}`;
    return <span title={tooltipText}>{shortMonth}</span>;
  };
  
  return (
    <DatePicker
      className={inputFieldStyles}
      showIcon
      toggleCalendarOnIconClick
      showMonthYearPicker
      dateFormat="MM/yyyy"
      selected={selectedDate}
      onChange={(date => setSelectedDate(date))}
      renderMonthContent={renderMonthContent}
    />
  )
}

export default MonthYear;