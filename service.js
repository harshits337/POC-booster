var axios = require('axios');
const { response } = require('express');
var qs = require('qs');

var cookie = '';
var csrftoken = '';

let getScrolledPostUsers = async (tag) => {
    let userList = []
    var data = {
        'include_persistent': '0',
        'page': '1',
        'surface': 'grid',
        'tab': 'top'
    };
    var config = {
        method: 'post',
        url: `https://i.instagram.com/api/v1/tags/${tag}/sections/`,
        headers: {
            'authority': 'i.instagram.com',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
            'x-ig-app-id': '936619743392459',
            'x-ig-www-claim': 'hmac.AR0ZaOA0KTjOeJ9tX1MyNEylFYFe2vHlTytX7DvHmlIljcdL',
            'sec-ch-ua-mobile': '?0',
            'x-instagram-ajax': '33f769c9620c',
            'content-type': 'application/x-www-form-urlencoded',
            'accept': '*/*',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
            'x-asbd-id': '198387',
            'x-csrftoken': csrftoken,
            'sec-ch-ua-platform': '"macOS"',
            'origin': 'https://www.instagram.com',
            'sec-fetch-site': 'same-site',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://www.instagram.com/',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'cookie': cookie
        },
        data: qs.stringify(data)
    };

    for (let i = 0; i < 5; i++) {
        data['page'] = JSON.stringify(i + 1);
        config.data = qs.stringify(data)
        let response = await axios(config);
        response = response.data.sections;
        let litt = []
        response.forEach(item => {
            let temp = item.layout_content.medias;
            temp.forEach( async (elem) => {
                let userItem = elem.media.user;
                userItem['like_count'] = elem.media.like_count;
                userItem['location'] = elem.media.location;
                // let userData =  getUserDetails(userItem.username);
                // userData = await userData.then(data=> data);
                // userList.push({...userItem,userData});
                userList.push(userItem);
            })
        })
    }
    return userList;

}

let getAllUsers = async (tag) => {
    var userList = []

    var config = {
        method: 'get',
        url: `https://www.instagram.com/explore/tags/${tag}/?__a=1`,
        headers: {
            'authority': 'www.instagram.com',
            'cache-control': 'max-age=0',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'sec-fetch-site': 'none',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-user': '?1',
            'sec-fetch-dest': 'document',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'cookie': cookie
        }
    };

    let instaResponse = await axios(config);
    // console.log(instaResponse);
    let top = instaResponse.data.data.top.sections;
    let recent = instaResponse.data.data.recent.sections;
    top.forEach(item => {
        let temp = item.layout_content.medias;
        temp.forEach(async (elem) => {
            let userItem = elem.media.user;
            userItem['like_count'] = elem.media.like_count;
            userItem['location'] = elem.media.location;
            // let userData =  getUserDetails(userItem.username);
            // userData = await userData.then(data=> data);
            // userList.push({...userItem,userData});
            userList.push(userItem);
        })
    })
    recent.forEach(item => {
        let temp = item.layout_content.medias;
        temp.forEach(async (elem) => {
            let userItem = elem.media.user;
            userItem['like_count'] = elem.media.like_count;
            userItem['location'] = elem.media.location;
            // let userData =  getUserDetails(userItem.username);
            // userData = await userData.then(data=> data);
            // userList.push({...userItem,userData});

            userList.push(userItem);
        })
    })
    let scrollerUserList = await getScrolledPostUsers(tag);
    // console.log(userList,userList.length);
    // console.log(scrollerUserList,scrollerUserList.length);
    userList = userList.concat(scrollerUserList);
    console.log("Done",userList.length);
    return userList;

}

let getUserDetails = async (userName) => {

    var config = {
        method: 'get',
        url: `https://www.instagram.com/${userName}/?__a=1&__d=dis`,
        headers: {
            'authority': 'www.instagram.com',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
            'x-ig-www-claim': 'hmac.AR0ZaOA0KTjOeJ9tX1MyNEylFYFe2vHlTytX7DvHmlIljfDo',
            'sec-ch-ua-mobile': '?0',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
            'accept': '*/*',
            'x-requested-with': 'XMLHttpRequest',
            'x-asbd-id': '198387',
            'sec-ch-ua-platform': '"macOS"',
            'x-ig-app-id': '936619743392459',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://www.instagram.com/shewon_alyosius/',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'cookie': cookie
        }
    };

    let userData = await axios(config);
    userData = userData.data;
    return {
        followers: userData.graphql.user.edge_followed_by.count,
        verified: userData.graphql.user.is_verified
    }


}

module.exports = getAllUsers;