const source = new EventSource("http://localhost:3000/sse");

source.addEventListener("ping", (evt) => {
  console.log(evt.data); // should log a string of `{"hello":"world"}`
});