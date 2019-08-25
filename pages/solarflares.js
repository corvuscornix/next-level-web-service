import React from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/MyLayout';
import Error from '../components/Error';


class SolarflareSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '2015-12-19',
      endDate: '2016-12-26',
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
    const response = await fetch(`/api/solarflares?startDate=${startDate}&endDate=${endDate}`);

    this.setState({ isLoading: false, ...await response.json() });
  }

  render() {
    const {
      startDate,
      endDate,
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
