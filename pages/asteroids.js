import React from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/PageLayout';
import Error from '../components/Error';
import PeriodSearch from '../components/PeriodSearch';


class AsteroidSearch extends React.Component {
  constructor(props) {
    super(props);

    // Perform a default search on "page load"
    this.state = {
      isLoading: true,
      defaultStart: '2015-12-19',
      defaultEnd: '2015-12-26',
    };

    this.submitSearch = this.submitSearch.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const { defaultStart, defaultEnd } = this.state;
    this.submitSearch(defaultStart, defaultEnd);
  }

  async submitSearch(startDate, endDate) {
    this.setState({ isLoading: true, error: null });

    const response = await fetch(`/api/asteroids?startDate=${startDate}&endDate=${endDate}`);

    this.setState({ isLoading: false, ...await response.json() });
  }

  render() {
    const {
      isLoading,
      error,
      closestAsteroid,
      avgMagnitudeOfHazardousAsteroids,
      medianAsteroidMagnitude,
      defaultStart,
      defaultEnd,
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

        <PeriodSearch defaultStart={defaultStart} defaultEnd={defaultEnd} onSubmit={this.submitSearch} />

        <div className="results">
          {results}
        </div>
      </Layout>
    );
  }
}

export default AsteroidSearch;
