import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MonthYear = ( {selectedDate, setSelectedDate} ) => {

  const renderMonthContent = (month, shortMonth, longMonth, day) => {
    const fullYear = new Date(day).getFullYear();
    const tooltipText = `Tooltip for month: ${longMonth} ${fullYear}`;
    return <span title={tooltipText}>{shortMonth}</span>;
  };
  
  return (
    <DatePicker
      className="w-full border border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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