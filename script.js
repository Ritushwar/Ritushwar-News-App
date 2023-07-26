var articles = [];
let currentArticleIndex = 0;
const articlePerPage = 6;
async function fetchNews(){
    const API_ENDPOINT = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${API_KEY}`;
    try{
      const response = await fetch(API_ENDPOINT);
      const data =await response.json();
      articles = data.articles;
      return articles;    
    } catch(e){
          console.error(e);
          return[];
    }
}
function updateNewsDisplay(news_articles){
    const mainElement = document.querySelector('main');
     mainElement.innerText = '';

     const currentArticles = news_articles.slice(currentArticleIndex,currentArticleIndex+articlePerPage);
     currentArticles.forEach(article => {
        const articleElement = document.createElement("div");
        articleElement.classList.add("article");
        const titleElement = document.createElement("h2");
        titleElement.textContent = article.title;
        const imageElement = document.createElement("img");
        imageElement.src = article.urlToImage;
        imageElement.alt = article.title;
        articleElement.appendChild(titleElement);
        articleElement.appendChild(imageElement);
        mainElement.appendChild(articleElement);
        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = article.description;
        articleElement.appendChild(descriptionElement);
        const linkElement = document.createElement("a");
        linkElement.href = article.url;
        linkElement.textContent = "Read More";
        articleElement.appendChild(linkElement);
        linkElement.classList.add("read-more");
     });
          updatePagination(articles.length);
     
    }
    function updatePagination(totalArticles){
        const totalPages = Math.ceil(totalArticles/articlePerPage);
        const paginationElemant = document.querySelector(".pagination");
        paginationElemant.innerHTML = "";
        for(let i = 1; i<totalPages; i++){
          const pageButton = document.createElement("Button");
          pageButton.textContent = i;
          pageButton.addEventListener("click",()=>{
              currentArticleIndex = (i-1)*articlePerPage;
              updateNewsDisplay(articles);
          });
          paginationElemant.appendChild(pageButton)
        }
       const allButtons = document.querySelectorAll(".pagination button");
       allButtons.forEach(button=> button.classList.remove("active"));
       allButtons[currentArticleIndex/articlePerPage].classList.add("active");
       const prevButton = document.querySelector('.prev-button');
       const nextButtons = document.querySelector('.nextbutton');
    
   }
    async function loadNews(){
       const articlesData = await fetchNews();
       updateNewsDisplay(articlesData);
    }
    document.addEventListener("DOMContentLoaded",loadNews);