import React, { useState, Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-dates/initialize";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController,
} from "react-dates";
import "react-dates/lib/css/_datepicker.css";

export default function MealCalendar({ date, onChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <>
      {/* <DateRangePicker
      startDate={this.state.startDate} // momentPropTypes.momentObj or null,
      startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
      endDate={this.state.endDate} // momentPropTypes.momentObj or null,
      endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
      onDatesChange={({ startDate, endDate }) =>
        this.setState({ startDate, endDate })
      } // PropTypes.func.isRequired,
      focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
      onFocusChange={(focusedInput) => this.setState({ focusedInput })} // PropTypes.func.isRequired,
      /> */}

      <SingleDatePicker
        date={date} // momentPropTypes.momentObj or null
        onDateChange={(date) => onChange({ target: { value: date } })} // PropTypes.func.isRequired
        focused={focused} // PropTypes.bool
        onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
        id="your_unique_id" // PropTypes.string.isRequired,
        displayFormat="MM/DD/YYYY"
        hideKeyboardShortcutsPanel
        small="true"
        // showClearDate="ture"
        // noBorder="ture"
        // showDefaultInputIcon="ture"
        numberOfMonths={1}
        enableOutsideDays
        // show past macros, enable below
        isOutsideRange={() => false}
      />
    </>
  );
}
