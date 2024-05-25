import React from "react";
const NewsItem = (props)=> {

    let { title, description, imageUrl, newsUrl, author, date, source } =
      props
    return (
      <div className="my-3">
        <div className="card" style={{ width: "24rem", height: "30rem" }}>
          <span
            class="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
            style={{ zIndex: "1", left: "90%" }}
          >
            {source}.
          </span>
          <img
            src={imageUrl}
            className="card-img-top"
            alt="..."
            style={{ height: "200px", width: "auto" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}..</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="muted-text">
                By {author} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark my-1"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
