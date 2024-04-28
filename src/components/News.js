import React, { Component } from "react";
import NewsItem from "./NewsItem";
export class News extends Component {
  constructor() {
    super();
    console.log("hi i am a aconstructor from the news component");
    this.state = {
      articles: [],
      page:1
    };
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f8373ecf5d2a4e099fbc165f4424db5d&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles,
    totalResults:parsedData.totalResults })
  } 
  isDisabled;
  handleNextClick = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f8373ecf5d2a4e099fbc165f4424db5d&page=${this.state.page+1}&pageSize=20`;
    if(this.state.page+1 > Math.ceil(this.state.totalResults/20)){
      this.isDisabled = true;
    }
    else{
      this.isDisabled =false;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page:this.state.page+1,
      articles: parsedData.articles,
    })
  }
  }
  
  handlePrevClick = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f8373ecf5d2a4e099fbc165f4424db5d&page=${this.state.page-1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page:this.state.page-1,
      articles: parsedData.articles,
    })
  }
  render() {
    return (
      <div className="conatiner my-3">
        <h1>NewsToday- top headlines.</h1>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title?element.title.slice(0,61):""}
                  description={element.description?element.description.slice(0,98):""}
                  imageUrl={element.urlToImage?element.urlToImage:"https://cdn.ndtv.com/common/images/ogndtv.png"}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
        <button disabled = {this.isDisabled} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
