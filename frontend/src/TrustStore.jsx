import React from 'react';
import { Link, Route } from 'react-router-dom';



const TrustStore = ({ match }) => {
return( <div>   
  <h2>Trust Store Container Management</h2>
  
      <ul>
        <li><Link to={`${match.url}/certificates`}>Certificates</Link></li>
        <li><Link to={`${match.url}/trust-stores`}>Trust Stores</Link></li>
        <li><Link to={`${match.url}/containers`}>Trust Store Containers</Link></li>
      </ul>
      <Route path={`${match.path}/:name`} render= {({match}) =>( <div> <h3> {match.params.name} </h3></div>)}/>
      </div>)
}
      
export default TrustStore;