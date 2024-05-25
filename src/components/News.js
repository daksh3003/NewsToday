import React,{useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component"

const News = (props)=> {
  const [articles,setArticles] = useState([]);
  const [loading,setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults,setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  // document.title = `NewsToday-${props.category}`;
  useEffect(()=>{
    document.title = `NewsToday - ${props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines`;
  },[]);


const updateNews = async()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f8373ecf5d2a4e099fbc165f4424db5d&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    setHasMore(page*props.pageSize<parsedData.totalResults);
    props.setProgress(100);
  }


  // const handleNextClick = async () => {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //   props.country
  //   // }&category=${
  //   //   props.category
  //   // }&apiKey=f8373ecf5d2a4e099fbc165f4424db5d&page=${
  //   //   this.state.page + 1
  //   // }&pageSize=${props.pageSize}`;
  //   // if (
  //   //   !(
  //   //     this.state.page + 1 >
  //   //     Math.ceil(this.state.totalResults / props.pageSize)
  //   //   )
  //   // ) {
  //   //   this.setState({
  //   //     loading: true,
  //   //   });
  //   //   let data = await fetch(url);
  //   //   let parsedData = await data.json();
  //   //   console.log(parsedData);
  //   //   this.setState({
  //   //     page: this.state.page + 1,
  //   //     articles: parsedData.articles,
  //   //     loading: false,
  //   //     totalResults: parsedData.totalResults
  //   //   });
  //   // }
  //   setPage(page+1);
  //   updateNews();
  // };

  // const handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   props.country
    // }&category=${
    //   props.category
    // }&apiKey=f8373ecf5d2a4e099fbc165f4424db5d&page=${
    //   this.state.page - 1
    // }&pageSize=${props.pageSize}`;
    // this.setState({
    //   loading: true,
    // });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.isDisabled = false;
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    //   totalResults: parsedData.totalResults
    // });
    // setPage(page-1)
    // updateNews();
  // };
  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async ()=>{
    const nextPage = page+1;
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f8373ecf5d2a4e099fbc165f4424db5d&page=${nextPage}&pageSize=${props.pageSize}`;
 
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setHasMore(nextPage * props.pageSize < parsedData.totalResults);
    setPage(nextPage);
  }
    
    return (
      <div className="conatiner my-3">
        <h1 className="text-center" style={{margin: '35px 0px',marginTop: '90px'}}>{`NewsToday- Top Headlines from ${props.category}`}</h1>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Spinner/>}
        >
          <div className="row">
            {articles.map((element) => {
              return(
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title?element.title.slice(0, 128):""}
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
      </div>
    );
  }

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
  // apiKey:process.env.REACT_APP_NEWS_API,
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  // apiKey: PropTypes.string.isRequired,
};
export default News;
