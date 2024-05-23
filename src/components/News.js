import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    console.log("hi i am a aconstructor from the news component");
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalResults:0
    };
    document.title = `NewsToday-${this.props.category}`;
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f8373ecf5d2a4e099fbc165f4424db5d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
      totalResults: parsedData.totalResults
    });
  }
  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=f8373ecf5d2a4e099fbc165f4424db5d&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      this.setState({
        loading: true,
      });
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
        totalResults: parsedData.totalResults
      });
    }
  };

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=f8373ecf5d2a4e099fbc165f4424db5d&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.isDisabled = false;
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults
    });
  };
  render() {
    return (
      <div className="conatiner my-3">
        <h1 className="text-center">{`NewsToday- Top Headlines from ${this.props.category}`}</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 128) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 80)
                        : ""
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://cdn.ndtv.com/common/images/ogndtv.png"
                    }
                    newsUrl={element.url}
                    author={element.author ? element.author : "Unknown"}
                    date={element.publishedAt}
                    source={element.source.name.slice(0, 18)}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Prev
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
                ? true
                : false
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
