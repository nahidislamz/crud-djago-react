import "./playlist.css";
import React, { useState, useEffect } from "react";

function PlayList(props) {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    fetch(
      "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=12&playlistId=PL68vtVtLisq8D34w9ucTHO2XySDJ5tEm8&key=AIzaSyB9711lc70D6h8D8ZLwAfHboIQKH235hco"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const result = data.items.map((item) => {
          return {
            title: item.snippet.title,
            vid: item.contentDetails.videoId,
          };
        });
        setVideoList(result);
        uid(result.vid);
        utitle(result.title);
      });
  }, []);

  const [vid, uid] = useState(videoList.vid);

  const [title, utitle] = useState(videoList.title);

  return (
    <div className="p-5">
      <h1 className="p-2 text-center text-bold">Video PlayList</h1>
      <div className="v-list">
        <ol id="vid-list">
          {videoList.map((item) => {
            return (
              <li>
                <a
                  href="#!"
                  data-toggle="modal"
                  data-target="#modalYT"
                  onClick={() => {
                    uid(item.vid);
                    utitle(item.title);
                  }}
                >
                  <span className="vid-thumb">
                    <img
                      width="120"
                      src={
                        "https://img.youtube.com/vi/" +
                        item.vid +
                        "/default.jpg"
                      }
                    />
                  </span>
                  <div className="title">{item.title}</div>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
      <div>
        <div
          className="modal fade"
          id="modalYT"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-body mb-0 p-0">
                <div className="embed-responsive embed-responsive-16by9 z-depth-1-half">
                  <iframe
                    className="embed-responsive-item"
                    src={
                      "https://www.youtube.com/embed/" +
                      vid +
                      "?autoplay=1&rel=0&showinfo=0&autohide=1'"
                    }
                    allowfullscreen
                  ></iframe>
                </div>
              </div>

              <div className="modal-footer justify-content-center bg-dark text-white">
                <span className="mr-4">Share This Video</span>
                <a type="button" className="btn-floating btn-sm btn-fb">
                  <i className="fab fa-facebook-f"></i>
                </a>

                <a type="button" className="btn-floating btn-sm btn-tw">
                  <i className="fab fa-twitter"></i>
                </a>
                <a type="button" className="btn-floating btn-sm btn-gplus">
                  <i className="fab fa-google-plus-g"></i>
                </a>

                <a type="button" className="btn-floating btn-sm btn-ins">
                  <i className="fab fa-linkedin-in"></i>
                </a>

                <button
                  type="button"
                  className="btn btn-outline-primary btn-rounded btn-md ml-4"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="centralModalLg"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <iframe
                  className="embed-responsive-item"
                  src={
                    "https://www.youtube.com/embed/" +
                    vid +
                    "?autoplay=1&rel=0&showinfo=0&autohide=1'"
                  }
                  frameBorder="0"
                  width="560"
                  height="315"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayList;
