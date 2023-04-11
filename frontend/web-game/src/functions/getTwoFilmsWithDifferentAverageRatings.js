async function getTwoFilmsWithDifferentAverageRatings() {
    try {
        const response = await fetch("http://localhost:3000/api/films?twoFilmsWithDifferentRatings=true");
        const data = await response.json();
        return data;
    } catch(err) {
        console.log(err);
    }
}

export default getTwoFilmsWithDifferentAverageRatings;