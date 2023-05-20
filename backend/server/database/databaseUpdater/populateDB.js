import '../mongoConfig.js';
import processFilmsInList from '../../scraping/dist/index.js';
import Film from '../../models/film.js';
import { CronJob } from 'cron';

function updateAverageRatingString(existingFilmDoc, newAverageRatingString) {
  const updatedFilmDoc = existingFilmDoc;
  updatedFilmDoc.averageRatingString = newAverageRatingString;
  return updatedFilmDoc;
}

function getUpdatedFilmDoc(existingFilmDoc, filmDetailsObject) {
  const updatedFilmDoc = updateAverageRatingString(
    existingFilmDoc,
    filmDetailsObject.averageRatingString
  );
  return updatedFilmDoc;
}
function makeNewFilmDoc(filmDetailsObject) {
  return new Film(filmDetailsObject);
}
async function getExistingFilmDoc(filmDetailsObject) {
  const { filmTitle, releaseYearString, directorNameArray } = filmDetailsObject;
  return Film.findOne({ filmTitle, releaseYearString, directorNameArray });
}

async function saveScrapedFilmDetailsObject(filmDetailsObject) {
  try {
    const existingFilmDoc = await getExistingFilmDoc(filmDetailsObject);
    const savedFilmDoc =
      existingFilmDoc != null
        ? getUpdatedFilmDoc(existingFilmDoc, filmDetailsObject)
        : makeNewFilmDoc(filmDetailsObject);
    console.log(savedFilmDoc);
    await savedFilmDoc.save();
  } catch (err) {
    console.log(err);
  }
}

async function scrapePopularFilmsList() {
  await processFilmsInList(
    'https://letterboxd.com/bucksalypse/list/letterboxd-500-most-watched-movies-of-all/',
    saveScrapedFilmDetailsObject
  );
}

const job = new CronJob({
  cronTime: '0 0 * * *',
  onTick: scrapePopularFilmsList,
  timeZone: 'Europe/London',
});

job.start();
