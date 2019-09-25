const controller = {}
const Review = require("../models/Review");
user = {};

// Finds users with closest movie ratings
controller.findNearestNeighbours = (res, next, cu) => {
  Review.find({}, "movie user score", function(err, docs) {}).then(
    reviewsOfAllUsers => {
  
      function compareSimilarity(a, b) {
        let score1 = similarityScores[a.user];
        let score2 = similarityScores[b.user];
        return score2 - score1;
      }
  
      let similarityScores = [];
      let totalReviewsToVisit = 0;
      let totalReviewsVisited = 0;
  
      let current = cu["_id"];

      for (let j = 0; j < reviewsOfAllUsers.length; j++) {
        let other = reviewsOfAllUsers[j]["user"];
        let currentStr = current.toString();
        let otherStr = other.toString();

        if (otherStr !== currentStr) {
          totalReviewsToVisit++;
        }
      }

      for (let j = 0; j < reviewsOfAllUsers.length; j++) {
        let other = reviewsOfAllUsers[j]["user"];
        let currentStr = current.toString();
        let otherStr = other.toString();
        
        if (otherStr != currentStr) {
          euclideanDistance(current, other, function(similarity) {
            similarityScores.push({
              similarity: similarity,
              id: other
            });
            totalReviewsVisited++;
              
            if (totalReviewsToVisit === totalReviewsVisited) {

                // Sort data
                similarityScores = similarityScores.sort((a, b) => {
                  if (a.similarity > b.similarity)  return -1
                })

                similarityScores = similarityScores.reduce((acc,cur)=>Object.assign(acc,{[cur.id]:cur}),{});

              res.render("users/index", { user, similarityScores })
            }
            
          });
          
        }
      }

    })
}
  
// Compares two users and returns similarity scores
function euclideanDistance(userId1, userId2, cb) {
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

  Promise.all([promise1, promise2]).then(data => {
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

    cb(similarity);
  });
}

function removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject  = {};
  for(var i in originalArray) {
     lookupObject[originalArray[i][prop]] = originalArray[i];
  }
  for(i in lookupObject) {
      newArray.push(lookupObject[i]);
  }
   return newArray;
}

module.exports = controller;