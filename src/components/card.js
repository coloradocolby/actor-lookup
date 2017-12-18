import React, { Component } from 'react';
const ROOT_IMG_URL = "https://image.tmdb.org/t/p/original";

class Card extends Component {

  roundToWhole(num){
    return Math.round(num);
  }

  getBirthday(date) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let current_date = new Date(date);
    let month_value = current_date.getMonth();
    let day_value = current_date.getDate() + 1;
    let year_value = current_date.getFullYear();
    return `${months[month_value]} ${day_value}, ${year_value}`;
  }

  componentDidUpdate(){
    if(this.props.knownFor){
      document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.85) 15%,rgba(0, 0, 0, 0.85) 15%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 1) 100%), url(${ROOT_IMG_URL}${this.props.knownFor[0].backdrop_path})`;
    }
  }

  render() {
    if(this.props.fullName && this.props.knownFor){
      return (
        <div>
          <div className="card text-center">
            <div className="card-block row">
              <div className="col-lg-5 d-flex align-items-center justify-content-center">
                <img className="img-fluid poster-img" alt={ this.props.fullName }src={`${ROOT_IMG_URL}${this.props.profilePath}`}/>
              </div>
              <div className="col-lg-7 lg-padding-right">
                <div className="row">
                  <div className="col-xl-12">
                    <h1 className="card-title personName">{this.props.fullName}</h1>
                    <p className="biography">{ this.props.biography }</p>
                  </div>
                </div>
                <button className="btn btn-outline-tmdb" data-toggle="modal" data-target="#knownForCarouselModal">Known For</button>
                  <table className="table md-top-bottom-margin">
                    <thead>
                      <tr>
                        <th>Birthday</th>
                        <th>Hometown</th>
                        <th>Popularity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{ this.getBirthday(this.props.birthday) }</td>
                        <td>{ this.props.placeOfBirth }</td>
                        <td>{ this.roundToWhole(this.props.popularity) }</td>
                      </tr>
                    </tbody>
                  </table>
              </div>
            </div>
          </div>

          {/* Known For Carousel Modal */}

          <div className="modal fade" id="knownForCarouselModal" tabIndex="-1" role="dialog" aria-labelledby="knownForCarouselModalTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div id="knownForCarousel" className="carousel slide" data-ride="carousel">
                  <ol className="carousel-indicators">
                    {
                      this.props.knownFor.map((movie, i) => {
                        if(movie) {
                            return (
                              <li data-target="#knownForCarousel" data-slide-to={i} key={i} className={(i === 0 ? 'active' : '')}></li>
                              )
                          }
                          else return ''
                        })
                      }
                  </ol>
                  <div className="carousel-inner" role="listbox">
                      {
                        this.props.knownFor.map((movie, i) => {
                          if(movie) {
                            return (
                                <div className={"carousel-item " + (i === 0 ? 'active' : '')} key={i}>
                                  <img className="d-block img-fluid carousel-image" src={`${ROOT_IMG_URL}${this.props.knownFor[i].backdrop_path}`} height="200" alt={`Slide ${i}`} />
                                  <div className="carousel-caption d-none d-md-block">
                                    <h3>{ this.props.knownFor[i].original_title}</h3>
                                  </div>
                                </div>
                              )
                            }
                            else return ''
                          })
                        }
                  </div>
                  <a className="carousel-control-prev" href="#knownForCarousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a className="carousel-control-next" href="#knownForCarousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
      </div> // closing return tag
      )
    }
    else{
      return <div>Loading...</div>
    }
  }
}

export default Card;
