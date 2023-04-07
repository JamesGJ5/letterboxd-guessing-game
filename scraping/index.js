// TODO: consider opening the browser just once for all film pages
// TODO: lint and format file
// TODO: replace instances of "page" with "puppeteerPage"
const { parse } = require("node-html-parser");
const puppeteer = require("puppeteer");
const { scrollPageToBottom } = require("puppeteer-autoscroll-down");

function getFilmPosterURL(filmPageDoc) {
    return filmPageDoc.querySelector("#poster-zoom > div > div > img").getAttribute("src");
}

function getAverageRatingString(filmPageDoc) {
    return filmPageDoc.querySelector(".display-rating").text;
}

function getDirectorNameArray(filmPageDoc) {
    const directorNodeList = filmPageDoc.querySelectorAll("[href^='/director/']>span");
    if (directorNodeList.length === 0) {
        throw new Error("Director data not read correctly");
    }
    return directorNodeList.map((directorNode) => directorNode.text);
}

function getReleaseYearString(filmPageDoc) {
    return filmPageDoc.querySelector("[href^='/films/year/']").text;
}

function getFilmTitle(filmPageDoc) {
    return filmPageDoc.querySelector(".headline-1").text;
}

function checkIfAdult(filmPageDoc) {
    return !!filmPageDoc.querySelector(".-adult");
}

function getFilmDetailsObject(filmPageDoc) {
    if (checkIfAdult(filmPageDoc) === true) {return null;}
    try {
        return {
            filmTitle: getFilmTitle(filmPageDoc),
            releaseYearString: getReleaseYearString(filmPageDoc),
            directorNameArray: getDirectorNameArray(filmPageDoc),
            averageRatingString: getAverageRatingString(filmPageDoc),
            filmPosterURL: getFilmPosterURL(filmPageDoc),
        }
    } catch(err) {
        console.error(err);
        return null;
    }
}

async function getDynamicFilmPageBody(puppeteerBrowser, filmPageURL) {
    const page = await getPuppeteerPage(puppeteerBrowser, filmPageURL);
    return await getInnerHTMLFromPage(page);
}

async function getFilmPageDoc(puppeteerBrowser, filmPageURL) {
    try {
        const filmPageBody = await getDynamicFilmPageBody(puppeteerBrowser, filmPageURL);
        return parse(filmPageBody);
    } catch(err) {
        throw err;
    }
}

async function getDetailsObjectFromFilmPage(filmPageURL) {
    const puppeteerBrowser = await puppeteer.launch();
    const filmPageDoc = await getFilmPageDoc(puppeteerBrowser, filmPageURL);
    return Promise.all(
        [getFilmDetailsObject(filmPageDoc), puppeteerBrowser.close()]
    )
    .then(([filmDetails, _]) => filmDetails);
}

async function getNextFilmListPageURL(filmListPageDoc) {
    const nextPageAnchor = filmListPageDoc.querySelector("#content > div > div > section > div.pagination > div:nth-child(2) > a");
    if (nextPageAnchor === null) {return null;}
    const nextPagePath = nextPageAnchor.getAttribute("href");
    return getLetterboxdURL(nextPagePath);
}

function getLetterboxdURL(path) {
    return "https://letterboxd.com" + path;
}

function processListedFilm(filmAnchorNode, processor) {
    const filmPagePath = filmAnchorNode.getAttribute("href");
    processor(getLetterboxdURL(filmPagePath));
}

async function processFilmsOnListPage(filmListPageDoc, processor) {
    const filmAnchorNodeList = filmListPageDoc.querySelectorAll("#content > div > div > section > ul > li > div > div > a");
    filmAnchorNodeList.forEach((filmAnchorNode) => processListedFilm(filmAnchorNode, processor));
}

async function getPuppeteerPage(puppeteerBrowser, pageURL) {
    const page = await puppeteerBrowser.newPage();
    await page.goto(pageURL);
    return page;
}

async function getInnerHTMLFromPage(puppeteerPage) {
    return await puppeteerPage.evaluate(() => document.body.innerHTML)
}

async function getDynamicFilmListPageBody(puppeteerPage, listPageURL) {
    await puppeteerPage.goto(listPageURL);
    await scrollPageToBottom(puppeteerPage);
    return await getInnerHTMLFromPage(puppeteerPage);
}

async function getFilmListPageDoc(puppeteerPage, listPageURL) {
    const filmListPageBody = await getDynamicFilmListPageBody(puppeteerPage, listPageURL);
    filmListPageDoc = parse(filmListPageBody);
    return filmListPageDoc;
}

async function processFilmsInListStartingAt(listPageURL, processor) {
    const puppeteerBrowser = await puppeteer.launch({headless: false});
    const puppeteerPage = await puppeteerBrowser.newPage();
    while (listPageURL !== null) {
        const filmListPageDoc = await getFilmListPageDoc(puppeteerPage, listPageURL);
        await processFilmsOnListPage(filmListPageDoc, processor);
        listPageURL = await getNextFilmListPageURL(filmListPageDoc);
    }
    puppeteerBrowser.close();
}

module.exports = {getDetailsObjectFromFilmPage, processFilmsInListStartingAt};