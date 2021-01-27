const source = new EventSource("http://localhost:3000/sse");

source.addEventListener("newnews", (evt) => {
  console.log(evt.data); 
});