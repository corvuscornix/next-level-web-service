import React from 'react';

export default class PeriodSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: props.defaultStart,
      endDate: props.defaultEnd,
    };

    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const {
      startDate,
      endDate,
    } = this.state;
    this.props.onSubmit(startDate, endDate);
  }

  handleStartDate(e) {
    this.setState({ startDate: e.target.value });
  }

  handleEndDate(e) {
    this.setState({ endDate: e.target.value });
  }

  render() {
    const {
      startDate,
      endDate,
    } = this.state;

    return (
      <div>
        <input
          onChange={this.handleStartDate}
          value={startDate}
        />

        <input
          onChange={this.handleEndDate}
          value={endDate}
        />

        <button
          type="button"
          onClick={this.onSubmit}
        >
          {'Submit'}
        </button>
      </div>
    );
  }
}
