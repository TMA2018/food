const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json' //закоммент так как отправляем не json 
        },
        //body: formData //т.к. мы еще неумеем возвращать json
        body: data //если JSON то так
    });
    return await res.json();
};

const getResources = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url} status is ${res.status}`);
    }

    return await res.json();
};

export {postData};
export {getResources};