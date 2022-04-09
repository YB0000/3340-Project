import axios from 'axios'



export default function setDataFromAxios(url, type, data) {
    url = url.replace("/api", "http://localhost:8080")
    return new Promise((resolve, reject) => {
        if (type == 'get') {
            axios.get(url).then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                });
        } else if (type == 'post') {
            //console.log("Enter the post method")
            axios.post(url, data).then(response => {
                    //console.log("post return",response.data)
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                });
        } else if (type == 'put') {
            axios.put(url).then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                });
        } else if (type == 'delete') {
            axios.delete(url).then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                });
        }
    })
}