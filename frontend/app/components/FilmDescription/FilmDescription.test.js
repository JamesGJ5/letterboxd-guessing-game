// import React from "react";
// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import FilmDescription from "./FilmDescription";

// function checkDirectorNames(testFilmDescription, testDirectorNameArray) {
//     render(testFilmDescription);
//     const testDirectorNamesString = testDirectorNameArray.join(", ");
//     expect(screen.getByText(testDirectorNamesString, {exact: false})).toBeInTheDocument();
// }

// function checkReleaseYear(testFilmDescription, testReleaseYearString) {
//     render(testFilmDescription);
//     expect(screen.getByText(testReleaseYearString, {exact: false})).toBeInTheDocument();
// }

// function checkFilmTitle(testFilmDescription, testFilmTitle) {
//     render(testFilmDescription);
//     expect(screen.getByText(testFilmTitle, {exact: false})).toBeInTheDocument();
// }

// const testFilmTitle = "Film 1";
// const testReleaseYearString = "1989";
// const testDirectorNameArray = ["Director 1", "Director 2"];
// const testAverageRatingString = "3.7";
// describe("FilmDescription component", () => {
//     describe("chosen to show average rating", () => {
//         const testFilmDescription = <FilmDescription
//             filmTitle={testFilmTitle}
//             releaseYearString={testReleaseYearString}
//             directorNameArray={testDirectorNameArray}
//             averageRatingString={testAverageRatingString}
//             showAverageRating={true}
//         />
//         it("mentions correct film", () => {
//             checkFilmTitle(testFilmDescription, testFilmTitle);
//         });
//         it("mentions correct release year", () => {
//             checkReleaseYear(testFilmDescription, testReleaseYearString);
//         });
//         it("mentions correct director names", () => {
//             checkDirectorNames(testFilmDescription, testDirectorNameArray);
//         });
//         it("shows average rating", () => {
//             render(testFilmDescription);
//             expect(screen.getByText(testAverageRatingString, {exact: false})).toBeInTheDocument();
//         });
//     });
//     describe("chosen to hide average rating", () => {
//         const testFilmDescription = <FilmDescription
//             filmTitle={testFilmTitle}
//             releaseYearString={testReleaseYearString}
//             directorNameArray={testDirectorNameArray}
//             averageRatingString={testAverageRatingString}
//             showAverageRating={false}
//         />
//         it("mentions correct film", () => {
//             checkFilmTitle(testFilmDescription, testFilmTitle);
//         });
//         it("mentions correct release year", () => {
//             checkReleaseYear(testFilmDescription, testReleaseYearString);
//         });
//         it("mentions correct director names", () => {
//             checkDirectorNames(testFilmDescription, testDirectorNameArray);
//         });
//         it("hides average rating", () => {
//             render(testFilmDescription);
//             expect(screen.queryByText(testAverageRatingString, {exact: false})).toBeNull();
//         })
//     });
// });