const puppeteer = require("puppeteer");

const loginLink = 'https://www.hackerrank.com/auth/login'

const email = 'sidananikhil00@gmail.com'
const password = 'Nikhil@hell2608'

let browserOpen = puppeteer.launch({
    headless:false, // will make the browser visible 

    args :['--start-maximized'],

    defaultViewport:null 

})
let page ;


browserOpen.then(function(browserObj){
    let BrowserOpenPromise = browserObj.newPage()
    return BrowserOpenPromise;
}).then(function(newTab){
    page = newTab
    let hackenRankOpenPromise = newTab.goto(loginLink)
    return hackenRankOpenPromise;
}).then(function(){
    let emailIsEntered = page.type("input[id='input-1']", email,{delay:50})
    return emailIsEntered;
}).then(function(){
    let passwordIsEntered = page.type("input[type='password']", password, {delay:50})
    return passwordIsEntered;
}).then(function(){
    let loginButtonClicked = page.click("button[data-analytics='LoginPassword']", {delay:50})
    return loginButtonClicked;
}).then(function(){
    let waitForAlgo = page.waitForSelector('.topic-card a[data-attr1="algorithms"]', {visible:true})
    return waitForAlgo
})
.then(function(){
    let clickOnAlgoPromise = page.click('.topic-card a[data-attr1="algorithms"]')
    return clickOnAlgoPromise;
}).then(function(){
    let WaitForWarmUp = page.waitForSelector('input[value="implementation"]', {visible:true})
    return WaitForWarmUp;
})
.then(function(){
    let getToWarmUp = page.click('input[value="implementation"]');
    return getToWarmUp;
})














function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
        let waitForModelPromise = cPage.waitForSelector(selector)
        waitForModelPromise.then(function(){
            let clickModal = cPage.click(selector)
            return clickModal;
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })
    })
}