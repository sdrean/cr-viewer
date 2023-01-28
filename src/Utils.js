export const apiGet = (url) => {
    return fetch(url + '?' + Date.now(), {
        method: 'get',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .catch(e => {
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            return data
        })
};

export const apiPost = (url, body) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        return data
    })
};
