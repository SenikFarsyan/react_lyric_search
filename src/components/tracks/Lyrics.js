import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';


class Lyrics extends Component {
    state ={
        track: {},
        lyrics: {}
    };
  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=4ac73a80e1d5b7153dcd8aee84296235`)
     .then(res => { 
         this.setState({
            lyrics: res.data.message.body.lyrics
        });
        return axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=4ac73a80e1d5b7153dcd8aee84296235`)
            .then(res => {
                this.setState({
                    track: res.data.message.body.track
                });
            })
            .catch(err => console.log(err));
     })
        .catch(err => console.log(err));
  }  
  render() {
      const { track, lyrics } = this.state;
    return (Object.keys(track).length > 0 || Object.keys(lyrics).length > 0)
     ? (
          <React.Fragment>
              <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
              <div className="card">
                 <h5 className="card-header">
                    { track.track_name } by <span className="text-secondary">{ track.artist_name }</span>
                 </h5>
                 <div className="card-body">
                    <p className="card-text">{ lyrics.lyrics_body }</p>
                 </div>
              </div>
              <ul className="list-group mt-3">
                 <li className="list-group-item">
                    <strong>Album Id</strong>: { track.album_id }
                 </li>
                 <li className="list-group-item">
                    <strong>Release Date</strong>: <Moment format="MM/DD/YYYY">{ track.first_release_date }</Moment>
                 </li>
              </ul>
          </React.Fragment>
       ) 
    : (<Spinner />);
  }
}

export default Lyrics;
