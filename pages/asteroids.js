import React from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/MyLayout';
import Error from '../components/Error';


class AsteroidSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '2015-12-19',
      endDate: '2015-12-26',
      isLoading: true,
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

    let results = null;
    if (isLoading) results = 'Fetching information...';
    else if (error) {
      results = (
        <Error message={error} />
      );
    } else {
      results = (
        <>
          <h3>Closest asteroid passing to Earth</h3>
          <div>
            {'The closest asteroid passing to Earth was '}
            <a href={closestAsteroid.nasaUrl} target="_blank" rel="noreferrer noopener">{closestAsteroid.name}</a>
            {` with distance of ${parseFloat(closestAsteroid.distanceInKm).toFixed(2)} km.`}
          </div>

          <h3>Hazardous asteroids</h3>
          <div>{`The average magnitude of hazardous asteroids during the period was ${avgMagnitudeOfHazardousAsteroids.toFixed(2)}.`}</div>

          <h3>Asteroid magnitude</h3>
          <div>{`The median asteroid magnitude during the period was ${medianAsteroidMagnitude.toFixed(2)}.`}</div>
        </>
      );
    }

    return (
      <Layout>
        <h2>Asteroids search</h2>

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

        <div className="results">
          {results}
        </div>
      </Layout>
    );
  }
}

export default AsteroidSearch;
