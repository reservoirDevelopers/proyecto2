document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, null);
});


document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    toolbarEnabled: true
  });
});

const review = document.querySelector('.reviewGrid')
const comment = document.querySelector('.checker').innerHTML
const title = document.querySelector('.checker2').innerHTML

if (comment === undefined || title === undefined) {
  console.log(comment)
  review.classList.add("hidden")
}

