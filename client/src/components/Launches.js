import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import "./Launches.css";
import LaunchItem from "./LaunchItem";
import MissionKey from './MissionKey';

//Query created with gql
const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

export class Launches extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <h1 className="display-4 my-3">Launches</h1>
          <MissionKey />
          <Query query={LAUNCHES_QUERY}>
            {({ loading, error, data }) => {
              if (loading)
                return (
                      <div class="lds-ripple">
                      <div></div>
                      <div></div>
                    </div>
                );
              if (error) console.log(error);

              return <Fragment>
                {
                  data.launches.map(launch => (
                    <LaunchItem key={launch.flight_number} launch={launch}/>
                  ))}
              </Fragment>;
            }}
          </Query>
        </div>
      </Fragment>
    );
  }
}

export default Launches;
