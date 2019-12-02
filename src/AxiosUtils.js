import axios from 'axios'

const HttpClientget = (url,params,headers) =>{
    return new Promise((resolve, reject) => {
        axios.get(url,{params:params},{headers:headers}
        ).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
}

const HttpClientpost = (url,params,headers) =>{
    return new Promise((resolve, reject) => {
        axios.post(url,params,{headers:headers}
        ).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
}

const HttpClientput = (url,params,headers) =>{
  return new Promise((resolve, reject) => {
      axios.put(url,params,{headers:headers}
      ).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
}

const HttpClientdelete = (url,params,headers) =>{
  return new Promise((resolve, reject) => {
      axios.delete(url,params,{headers:headers}
      ).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
}


const FetchApi = (url, data) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then((stories) => {
      resolve(stories);
    }).catch((err) => {
      reject(err);
    })
  });
}

export  {HttpClientget,HttpClientpost,HttpClientput,HttpClientdelete,FetchApi}