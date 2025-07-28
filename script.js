let BASEURL =  " http://www.omdbapi.com/?t='3 Idiots'&apikey=d7d1bf1c";
let button = document.querySelector("button");
let main = document.querySelector("main");
let apiData = async(BASEURL) => {
   let response = await fetch(BASEURL);
   let data = response.json();
   return data;
}
let updateGenre = (str,div2) => {
   for(let i = 0 ; i < str.length ; i++){
      let subStr = "";
      while(i < str.length && str[i] != ','){
         subStr+=str[i];
         i++;
      } 
      if(subStr != ""){
         let div3 = document.createElement("div");
         div3.innerText = subStr;
         div3.style.height = "40px";
         div3.style.width = "80px";
         div3.style.borderRadius = "10px";
         div3.style.color = "white";
         div3.style.backgroundColor = "rgb(41, 40, 40)";
         div3.style.textAlign = "center";
         div3.style.marginRight = "10px";
         div3.style.paddingTop ="20px";
         div3.style.fontFamily = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";
         div2.append(div3);
      }
   }
}
let breakData = (str) => {
   let ans = "";
   for(let i = 0 ;  i < str.length ; i++){
     let count = 0;
     while(i < str.length && count <= 14){
        let str2 = "";
        while( i < str.length && str[i] != " "){
           str2+=str[i];
           i++;
        }
        i++;
        count++;
        ans+=str2;
        ans+=" ";
     }
     console.log(ans);
     ans+="\n";
     i--;
   } 
  
   return ans;
}
let getData = async(text) => {
    BASEURL = ` http://www.omdbapi.com/?t='${text.value}'&apikey=d7d1bf1c`
    let data = apiData(BASEURL);
    console.log(data);
    await data.then((res) => {
       if(res.Error === "Movie not found!"){
          main.innerHTML = "<p id ='screen'>No Movie Found</p>";
       } 
       else{
          let div = document.createElement("div");
          let para = document.createElement("p");
          let ratingPara = document.createElement("p");
          let poster = document.createElement("div");
          let img = document.createElement("img");
          let releaseDate = document.createElement("p");
          let duration = document.createElement("p");
          let cast = document.createElement("p");
          let plot = document.createElement("p");
          div.style.height = "500px";
          div.style.width = "1100px";
          div.style.position = "relative";
          div.style.right = "10px";
          div.style.backgroundColor = "white";  
          div.style.boxShadow ="0px 4px 10px black";
          para.innerText = res.Title;
          para.style.fontFamily = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";
          para.style.fontSize = "40px";
          para.style.fontWeight = "600";  
          para.style.position = "relative";
          para.style.left = "480px";
          para.style.top = "20px";
          ratingPara.innerHTML = `<strong>Rating :</strong>⭐ ${res.imdbRating}`;
          ratingPara.style.fontFamily = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";
          ratingPara.style.position = "relative";
          ratingPara.style.left = "485px";
          ratingPara.style.top = "100px";
          img.style.height = "500px";
          img.style.width = "300px";
          img.src = `${res.Poster}`;
          img.style.position = "relative";
          img.style.bottom = "71px";
          img.style.left = "0px";
          let div2 = document.createElement("div");
          div2.style.display = "flex";
          div2.style.position ="relative";
          div2.style.bottom = "430px";
          div2.style.left = "450px";
          let str = res.Genre;
          updateGenre(str,div2);
          releaseDate.innerHTML = `<strong>Released Date :</strong>${res.Released}`;
          releaseDate.style.position = "relative";
          releaseDate.style.bottom = "400px";
          releaseDate.style.left = "320px"; 
          releaseDate.style.fontFamily = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";
          duration.innerHTML = `<strong>Duration :</strong>${res.Runtime}`;
          duration.style.position = "relative";
          duration.style.bottom = "380px";
          duration.style.left = "320px"; 
          duration.style.fontFamily = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";
          cast.innerHTML = `<strong>Cast :</strong>${res.Actors}`;
          cast.style.position = "relative";
          cast.style.bottom = "360px";
          cast.style.left = "320px"; 
          cast.style.fontFamily = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";
          let str2 = res.Plot;
          str2 = breakData(str2);
          plot.style.display = "flex";
          plot.innerHTML = '<strong>Plot :</strong>'
          let plotPara = document.createElement("p");
          plotPara.innerText = `${str2}`;
          plot.append(plotPara);
          plot.style.position = "relative";
          plot.style.bottom = "340px";
          plot.style.left = "320px"; 
          plot.style.fontFamily = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";
          div.append(ratingPara);
          div.append(para);
          div.append(img);
          div.append(div2);
          div.append(releaseDate);
          div.append(duration);
          div.append(cast);
          div.append(plot);
          main.innerHTML = "";
          main.append(div);
       }
    }) 
}
button.addEventListener("click",() => { 
   main.innerHTML = "<p id ='screen'></p>"
   let screen = document.querySelector("#screen"); 
   screen.innerText = "Fetching Movie Information...";
   setTimeout(()=>{
      let text  = document.querySelector("#searchbar");
      getData(text);
   },2000)
})
