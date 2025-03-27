const myURL = 'https://scoreboard-api-server.onrender.com/api/teamData';

document.addEventListener('DOMContentLoaded', () => {
    // Fetching the teamData object from the db.json file: GET Request
    fetch(myURL)
    .then(res => res.json())
    .then(data => { 

    // Sorting the teams according to number of points --> Least points = Highest Position
    data.sort((a,b) => a.points - b.points);
    renderTeams(data);
    })
    .catch(error => console.error('Error fetching teams:', error));
})

function renderTeams(data){

    const teamTableBody = document.querySelector('#team-table tbody');

    data.forEach((team, index) => {

        const teamRow = document.createElement('tr');
        const teamName = document.createElement('td');
        const teamPoints = document.createElement('td');
        const addOrReduce = document.createElement('td');
        const position = document.createElement('td');
        const loseOrgain = document.createElement('td'); // New Table Data Element
        const pointsReducebtn = document.createElement('button');
        const pointsIncreasebtn = document.createElement('button');
        const pointsButton = document.createElement('button');
        const space = document.createTextNode(' ');

        teamName.textContent = team.name;    // Team name in json file
        teamPoints.textContent = team.points;  // Team points in the json file: Default - 540;
        position.textContent = index === 0 ? '🏆' : index + 1;

        pointsReducebtn.textContent = '↓';
        pointsReducebtn.id = 'minus';
        pointsReducebtn.addEventListener('click', () => {
            team.points -= 10;
            teamPoints.textContent = team.points;
            updatePoints(team);
        })
        pointsIncreasebtn.textContent = '↑';
        pointsIncreasebtn.id = 'plus';
        pointsIncreasebtn.addEventListener('click', () => {
            team.points += 10;
            teamPoints.textContent = team.points;
            updatePoints(team);
        })

        pointsButton.classList.add('points-button');
        pointsButton.textContent = '⚬';
        pointsButton.addEventListener('click', () => {
                if(index === 0){
                    team.points -= 50;
                    teamPoints.textContent = team.points;
                    updatePoints(team);
                } else if (index === 1){
                    team.points -= 40;
                    teamPoints.textContent = team.points;
                    updatePoints(team);
                } else if (index === 2){
                    team.points -= 32;
                    teamPoints.textContent = team.points;
                    updatePoints(team);
                } else if (index === 3){
                    team.points -= 24;
                    teamPoints.textContent = team.points;
                    updatePoints(team);
                } else if (index === 4){
                    team.points -= 16;
                    teamPoints.textContent = team.points;
                    updatePoints(team);
                } else if (index === 5){
                    team.points -= 8;
                    teamPoints.textContent = team.points;
                    updatePoints(team);
                } else if (index === 6){
                    team.points -= 0;
                    teamPoints.textContent = team.points;
                    updatePoints(team);
                } else if (index === 7){
                    team.points += 5;
                    teamPoints.textContent = team.points;
                    updatePoints(team);
                } else if (index === 8){
                    team.points += 9;
                    teamPoints.textContent = team.points;
                    updatePoints(team);
                } else if (index === 9){
                    team.points += 15;
                    teamPoints.textContent = team.points;
                    updatePoints(team);
                }
        })
        loseOrgain.appendChild(pointsButton);

        addOrReduce.appendChild(pointsReducebtn);
        addOrReduce.appendChild(space);
        addOrReduce.appendChild(pointsIncreasebtn);

        teamRow.appendChild(position);
        teamRow.appendChild(teamName);
        teamRow.appendChild(teamPoints);
        teamRow.appendChild(addOrReduce); 
        teamRow.appendChild(loseOrgain);

        teamTableBody.appendChild(teamRow);
    })
}

// Updating Points using PATCH requests
function updatePoints(team){
    fetch(`${myURL}/${team.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(team)
    })
    .then(res => res.json())
    .then(data => console.log(data))
}
