# Server for testing - Server sent events

## Setup

### Clone git repo

```console
git clone https://github.com/vitting/server-sent-events-example.git
```

### Install Deno from

[https://deno.land/#installation](https://deno.land/#installation)

### Install Denon - Reload on file changes (optional)

```console
deno install -qAf --unstable https://deno.land/x/denon/denon.ts
```

### Install npm packages

```console
npm install
```

### Start event server

```console
npm run server
```

### Client code

```javascript
const source = new EventSource("http://localhost:3000/sse");

source.addEventListener("newnews", (evt) => {
    const item = JSON.parse(evt.data);
    // Do something with news item
});
```
