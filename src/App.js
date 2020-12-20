import React, {useState, useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import wordsToNumbers from 'words-to-numbers';
import useStyles from './styles.js';

const alanKey = '8d1427713fa92cb02cc58ba14dcd835a2e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () => {
    const classes = useStyles();
    const [activeArticle, setActiveArticle] = useState(-1);
    const [newsArticles, setNewsArticles] = useState([]);
    useEffect(() =>{
        alanBtn({
            key: alanKey,
            onCommand:({ command, articles, number }) => {
                if(command === 'newHeadlines'){
                    //alert('This code is executed');
                    console.log(articles);
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }else if (command === 'highlight'){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle +1);
                }else if(command === 'open'){
                    // for 2 digit numbers
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy:true}) : number;
                    const article = articles[parsedNumber - 1];
                    if(parsedNumber > 20){
                        alanBtn().playText('Please try again');
                    }else if(article){
                    window.open(article.url, '_blank');
                    alanBtn().playText('Opening...');
                    }
                }
            }
        })
    },[])
    return(
        <div>
            <div className={classes.logoContainer}>
                <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="alan logo" />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    );
}
export default App;