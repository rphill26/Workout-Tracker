const displayTable = $("#displayTable");
const submit = $("#submit");
const title = $("#title");
const wBody = $("#body");

printResults();

function printResults() {
    displayTable.val("");
    fetch("/api/workouts")
     .then(function(response) {
        if (response.status !== 200) {
            console.log("Looks like there was a problem. Status Code: " + response.status);
            return;
        }
        response.json().then(function(data) {
            data.forEach(Workout => {
                displayTable.append(`
                <tr>
                <td>${Workout.title}</td>
                <td>${Workout.body}</td>
                </tr>
                `);
            });
        });
     })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
}

$(function(){
    submit.click(function(e) {
        e.preventDefault();
        const workoutTitle = title.val();
        const workoutBody = wBody.val();
        fetch("/api/workouts", {
            method: "post",
            headers: {
                Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
            },
            body: JSON.stringify({
                workoutBody,
                workoutTitle
            })
        })
        .then(function(response) {
            console.log(response)
              location.reload();
              return response.json();
          })
    });
});