import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { inputFieldStyles } from "../../Utilities/commonStyles";

interface MonthYearProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const MonthYear = ( {selectedDate, setSelectedDate}: MonthYearProps ) => {

  const renderMonthContent = (month: number, shortMonth: string, longMonth: string, day: Date) => {
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
      onChange={(date => { if(date) setSelectedDate(date)})}
      renderMonthContent={renderMonthContent}
    />
  )
}

export default MonthYear;