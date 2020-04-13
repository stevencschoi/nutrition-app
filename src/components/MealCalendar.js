import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-dates/initialize";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController,
} from "react-dates";
import "react-dates/lib/css/_datepicker.css";

export default function MealCalendar() {
  return (
    // <>
    <DateRangePicker
      startDate={this.state.startDate} // momentPropTypes.momentObj or null,
      startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
      endDate={this.state.endDate} // momentPropTypes.momentObj or null,
      endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
      onDatesChange={({ startDate, endDate }) =>
        this.setState({ startDate, endDate })
      } // PropTypes.func.isRequired,
      focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
      onFocusChange={(focusedInput) => this.setState({ focusedInput })} // PropTypes.func.isRequired,
    />
    // <SingleDatePicker
    //   date={this.state.date} // momentPropTypes.momentObj or null
    //   onDateChange={(date) => this.setState({ date })} // PropTypes.func.isRequired
    //   focused={this.state.focused} // PropTypes.bool
    //   onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
    //   id="your_unique_id" // PropTypes.string.isRequired,
    // />
    // </>
  );
}
