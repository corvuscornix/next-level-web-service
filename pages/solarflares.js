import React from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/PageLayout';
import Error from '../components/Error';
import PeriodSearch from '../components/PeriodSearch';

class SolarflareSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultStart: '2015-12-19',
      defaultEnd: '2016-12-26',
      isLoading: true,
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
    const response = await fetch(`/api/solarflares?startDate=${startDate}&endDate=${endDate}`);

    this.setState({ isLoading: false, ...await response.json() });
  }

  render() {
    const {
      defaultStart,
      defaultEnd,
      isLoading,
      error,
      mostCommonClassType,
      regionsWithMostSolarFlares,
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
          <h3>Regions with most solar flares</h3>
          <div>{`Top number of flares in a region during the period was ${regionsWithMostSolarFlares.count}. Those regions were: ${regionsWithMostSolarFlares.regions.join(', ')}.`}</div>

          <h3>Most common class type</h3>
          <div>{`Most common class type(s) appeared ${mostCommonClassType.count} times during the period. Those types were: ${mostCommonClassType.names.join(', ')}.`}</div>
        </>
      );
    }

    return (
      <Layout>
        <h2>Solar flares search</h2>

        <PeriodSearch defaultStart={defaultStart} defaultEnd={defaultEnd} onSubmit={this.submitSearch} />

        <div className="results">
          {results}
        </div>

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
      </Layout>
    );
  }
}

export default SolarflareSearch;
