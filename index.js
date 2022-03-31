// 1.
// We have a “regular” function. How to call async from it and use its result?
// GOOD LUCK!
function delay(ms) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Done!");
    }, ms);
  });
  return promise;
}

delay(3000).then(() => alert("runs after indicted time"));

// 2.
// GOOD LUCK!
async function wait() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return 10;
}

function f() {
  // ...what to write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"
  wait().then((res) => {
    console.log(res);
  });
}

f();

// 3.
// Resolve all promises and show in console their status and values
// HINT: Remember about usage of Promise.all(),
// there is a similar method that will help you to resolve all promises
// despite of their results
// GOOD LUCK!
const promise1 = new Promise((res) => setTimeout(() => res("done"), 1000));
const promise2 = Promise.reject("Through error");
const promise3 = 6;

const promises = [promise1, promise2, promise3];

Promise.allSettled(promises)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

//   // 4.
//   // You need to handle getPosts() function with Promise
//   // Now you need to handle getPosts() function with async/await
//   // receive posts and show in console, don't forget about error handling :)
//   // GOOD LUCK!
//====================================================Promises=========================================
function getPosts() {
  return fetch("https://jsonplaceholder.typicode.com/posts");
}

function handleGetPostsWithPromise() {
  getPosts().then((response) => {
    if (response.status >= 200 && response.status < 300) {
      //Or response.ok
      response.json().then((parsedRes) => {
        console.log(parsedRes);
      });
    } else {
      return response.json().then((errData) => {
        console.log(errData);
        throw new Error("Something went wrong with the server");
      });
    }
  });
  // .catch((error) => {
  //   console.log(error);
  //   throw new Error("Something went wrong!");
  // });
}

handleGetPostsWithPromise();

//========================================= Async - Await ===============================

function getPosts() {
  return fetch("https://jsonplaceholder.typicode.com/posts");
}

async function handleGetPostsWithAsyncAwait() {
  let result = await getPosts().then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((errData) => {
        console.log(errData);
        throw new Error("Something went wrong with the server");
      });
    }
  });
  console.log(result);
}

handleGetPostsWithAsyncAwait();

//============================ BONUS : XMLhttpRequest ======================

function getPosts(method, url) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = "json";
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error("Something went wrong"));
      }
    };
    xhr.send();
  });
  return promise;
}

async function handleGetPostsWithXmlHttpRequest() {
  let parsedResult = await getPosts(
    "GET",
    "https://jsonplaceholder.typicode.com/posts"
  );
  console.log(parsedResult);
  // console.log(parsedResult);X
}

handleGetPostsWithXmlHttpRequest();

