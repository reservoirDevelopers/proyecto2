const controller = {}
const Review = require("../models/Review");
// Predicts user ratings based on similarity scores
controller.inferRatings = (req, res, next) => {
  //TODO add scores brought from API so algorithm is more intelligent
  //Change "select" on movies to "not seen", change value on option too
  //Then do: if (rating == 'not seen') {rating = null;}
  //If in 0-100 format, do: Math.round(Rating/10)

      findNearestNeighbours(newUser);
      // k value can be adjusted according to needs
      let k = 2;
      let weightedSum = 0;
      let similaritySum = 0;
      for (let j = 0; j < k; j++) {
        let name = allData[j]["user"];
        let sim = similarityScores["user"];
        let ratings = allData[j];
        let rating = ratings["movie"];
        if (rating != null) {
          weightedSum += rating * sim;
          similaritySum += sim;
        }
      }
  
      let stars = Math.round(weightedSum / similaritySum);
      return stars;
}

// Finds the k users with the closest similarity score
controller.findNearestNeighbours = (req, res, next, user) => {
  Review.find({}, "movie user score", function(err, docs) {}).then( (allData) => {
    // console.log(allData)
      
      let similarityScores = {};
      for (let i = 0; i < allData.length; i++) {
        let current = user["_id"];
        for (let j = 0; j < allData.length; j++) {
          let other = allData[j]["user"];
          // console.log(other)
          if (other != current) {
  
            
            let similarity = euclideanDistance(current, other);
            console.log(current + " /// " + other)
            similarityScores[current] = similarity;
          } else {
            similarityScores[current] = -1;
          }
        }
      
            // Sort data
        allData.sort(compareSimilarity);
        function compareSimilarity(a, b) {
          let score1 = similarityScores[a.user];
          // console.log(score1)
          let score2 = similarityScores[b.user];
          // console.log(score2)
          return score2 - score1;
        }
        // console.log(similarityScores)
        return similarityScores;
    }
    // console.log("holi")


   
    
  });
}

// Compares two users and returns similiraty scores
function euclideanDistance(userId1, userId2) {
  let promise1 = Review.find({ user: userId1 })
    .then(review => {
      return review;
    })
    .catch(err => console.log(err));

  let promise2 = Review.find({ user: userId2 })
    .then(review => {
      return review;
    })
    .catch(err => console.log(err));

  let similarity = Promise.all([promise1, promise2]).then(data => {
    let myReviews = data[0];
    let otherReviews = data[1];
    let sumSquares = 0;
    for (let i = 0; i < myReviews.length; i++) {
      let userMovie1 = myReviews[i]["movie"];
      let rating1 = myReviews[i]["score"];
      for (let j = 0; j < otherReviews.length; j++) {
        let userMovie2 = otherReviews[j]["movie"];
        if (userMovie1.toString() === userMovie2.toString()) {
          let rating2 = otherReviews[j]["score"];
          let diff = rating1 - rating2;
          sumSquares += diff * diff;
        }
      }
    }
    let d = Math.sqrt(sumSquares);
    similarity = 1 / (1 + d);
    // return similarity;
    // console.log(similarity);
    similarityReport(similarity)
  });
}

function similarityReport(similarity){

}

euclideanDistance("5d8a0159355bce661226fea4", "5d8a0159355bce661226fea5");

module.exports = controller;