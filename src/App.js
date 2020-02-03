import React from 'react';
import axios from 'axios';
import './App.css';
 var colors = ['#16a085','#27ae60','#2c3e50','#f39c12','#e74c3c','#9b59b6','#FB6964','#342224','#472E32','#BDBB99','#77B1A9','#73A857'];
 var colorIndex;
class RandomQuote extends React.Component{
  constructor(props){
    super(props)
      this.state={
        quote:'',
        author:'',
        divStyle:{
          BackgroundColor: '',
          color: ''
        },
        divStyle2:{
          BackgroundColor: ''
        }
      }
  }
  
  componentDidMount(){
    this.getQuote()
  }
  
   getQuote() {
      
      let url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
      colorIndex = Math.floor(Math.random()*colors.length);
      axios.get(url)
         .then(res => {
            let data = res.data.quotes
            let quoteNum = Math.floor(Math.random() * data.length) //quote number
            let randomQuote = data[quoteNum] //actual quote

            this.setState({
               quote: randomQuote['quote'],
               author: randomQuote['author'],
               divStyle: {
                backgroundColor: colors[colorIndex],
                color: colors[colorIndex]
               },
               divStyle2: {
                backgroundColor: colors[colorIndex]
               }
            })
         })
   }
   getNewQuote = () => {
      this.getQuote()
   }
  render(){
    const { quote, author } = this.state
    return(
      <div id="wrapper" style={this.state.divStyle}>
      <div className="text-center"><h1>Random Quote Machine</h1></div>
        <div className="card" id="quote-box">
          <div className="card-body">
            <div id="text"> <i className="fa fa-quote-left"/>{quote}{this.colorIndex}</div>
            <div id="author" className="text-right">-{author}</div>
            <div id="twitter">
              <a  id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${quote} ${author}`} target='_blank' title="Post this quote on twitter!">
                <span>
                  <i className="border border-#FF5733 fa fa-twitter-square twitter-icon fa-3x pull-down" style={this.state.divStyle2}></i>
                </span>
              </a>
              <div id="tumblr">
                <a  id='tumblr-quote' href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='${quote} ${author}`} target='_blank' title="Post this quote on twitter!">
                <span>
                  <i className="fa fa-tumblr-square fa-3x border border-#FF5733 tumblr-icon" style={this.state.divStyle2}></i>
                </span>
              </a>
              </div>
              <div className="text-right"> <button id='new-quote' className='buttons border rounded' onClick={this.getNewQuote} style={this.state.divStyle2}>New Quote</button></div>
            </div>
          </div>
        </div> 
      </div>
      )
  }
}
export default RandomQuote;