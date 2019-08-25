import React from 'react';
import fetch from 'isomorphic-unfetch';


class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '2015-12-19',
      endDate: '2015-12-26',
    };

    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.submitSearch();
  }

  handleStartDate(e) {
    this.setState({ startDate: e.target.value });
  }

  handleEndDate(e) {
    this.setState({ endDate: e.target.value });
  }

  async submitSearch() {
    const {
      startDate,
      endDate,
    } = this.state;
    this.setState({ isLoading: true, error: null });
    const response = await fetch(`/api/asteroids?startDate=${startDate}&endDate=${endDate}`);

    this.setState({ isLoading: false, ...await response.json() });
  }

  render() {
    const {
      startDate,
      endDate,
      isLoading,
      error,
      closestAsteroid,
      avgMagnitudeOfHazardousAsteroids,
      medianAsteroidMagnitude,
    } = this.state;

    return (
      <div>
        <h1>Asteroids search</h1>

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
          onClick={this.submitSearch}
        >
          {'Submit'}
        </button>

        {isLoading || error ? <div className="results">{error ? 'Oopsie poopsie... :-(' : 'Fetching information...'}</div>
          : (
            <div className="results">
              <div>{`avgMagnitudeOfHazardousAsteroids: ${avgMagnitudeOfHazardousAsteroids}`}</div>
              <div>{`medianAsteroidMagnitude: ${medianAsteroidMagnitude}`}</div>
            </div>
          )}

        <style jsx>
          {`
        h1 {
          font-family: 'Arial';
        }

        .results {
          margin-top: 24px;
        }
      `}

        </style>
      </div>
    );
  }
}

export default MyApp;
