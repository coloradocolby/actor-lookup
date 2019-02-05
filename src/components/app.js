import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/app.css';

import Card from './card';
import SearchBar from './search_bar';

// must start server if running locally (node server.js)
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';

class App extends Component {
  constructor(props) {
    super(props);
    // Steve Carell
    this.fetchPersonByID(4495);
    this.fetchPersonByName('Steve Carell');
   }

   _handleChange = (event) => {
     if(event[0]){
       let { id, name } = event[0];
       this.fetchPersonByID(id);
       this.fetchPersonByName(name);
     }
   }

   _handleSearch = query => {
     if (!query) return;
     axios.post(`${BASE_URL}/api/people`, { query })
       .then(resp => {
         const { data } = resp;
        this.setState(() => ({
          options: data.results
         }));
       });
   }

  fetchPersonByID(id) {
    axios.post(`${BASE_URL}/api/person/id`, { id })
      .then(resp => {
        const { data}  = resp;
        this.setState(() => ({
          biography: data.biography,
          birthday: data.birthday,
          fullName: data.name,
          id: data.id,
          options: [],
          placeOfBirth: data.place_of_birth,
          popularity: data.popularity,
          profilePath: data.profile_path
        }));
      });
   }

   fetchPersonByName(name) {
    axios.post(`${BASE_URL}/api/person/name`, { name })
      .then(resp => {
        this.setState(() => ({
          knownFor: resp.data.results[0].known_for,
        }));
      });
    }

    render() {
      return (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 offset-lg-4">
                <SearchBar
                  {...this.state}
                  onChangeCallback={this._handleChange}
                  onSearchCallback={this._handleSearch}
                  />
              </div>
              <div className="col-sm-12 d-flex align-items-center">
                <Card
                  {...this.state}
                  />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-start">
            <a href="https://www.tmdb.org" target="_blank" rel="noopener noreferrer">
              <img id="tmdb-logo" src="/assets/tmdb-logo.svg" alt="TMDB Logo"/>
            </a>
          </div>
        </div>
      );
    }
}

export default App;
