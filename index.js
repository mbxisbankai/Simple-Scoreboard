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
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check localStorage for saved theme
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    createNewTeam();
    handleReset();
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
        const deleteButton = document.createElement('td');
        const deleteTeamButton = document.createElement('button');
        const pointsReducebtn = document.createElement('button');
        const pointsIncreasebtn = document.createElement('button');
        const pointsButton = document.createElement('button');
        const space = document.createTextNode(' ');
       
        deleteTeamButton.addEventListener('click', () => handleDelete(team))
        deleteTeamButton.classList.add('delete-team-button');
        deleteTeamButton.textContent = `Delete`;

        teamName.textContent = team.name;    // Team name in json file
        teamPoints.textContent = team.points;  // Team points in the json file: Default - 540;
        position.textContent = index === 0 ? '🏆' : index + 1;

        pointsReducebtn.textContent = '↓ Reduce';
        pointsReducebtn.id = 'minus';
        pointsReducebtn.addEventListener('click', () => {
            team.points -= 10;
            teamPoints.textContent = team.points;
            updatePoints(team);
        })
        pointsIncreasebtn.textContent = '↑ Add';
        pointsIncreasebtn.id = 'plus';
        pointsIncreasebtn.addEventListener('click', () => {
            team.points += 10;
            teamPoints.textContent = team.points;
            updatePoints(team);
        })


        pointsButton.classList.add('points-button');
        pointsButton.textContent = '⚬Press for Award';
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

        deleteButton.appendChild(deleteTeamButton);
        loseOrgain.appendChild(pointsButton);

        addOrReduce.appendChild(pointsReducebtn);
        addOrReduce.appendChild(space);
        addOrReduce.appendChild(pointsIncreasebtn);

        teamRow.appendChild(position);
        teamRow.appendChild(teamName);
        teamRow.appendChild(teamPoints);
        teamRow.appendChild(addOrReduce); 
        teamRow.appendChild(loseOrgain);
        teamRow.appendChild(deleteButton)

        teamTableBody.appendChild(teamRow);
    })
}

function createNewTeam(){
    const inputField = document.querySelector('#team-name-input');
    const addTeamButton = document.querySelector('#add-team-btn');

    addTeamButton.addEventListener('click', () => {
    const newTeamName = inputField.value;
    if (newTeamName === ""){
        alert('Enter a valid team name');
        return;
    }
    const newTeam = {
        name: newTeamName,
        points: 540
    };

    handleNewTeam(newTeam);
    
    })
}


function handleReset() {
    const resetBtn = document.querySelector('#reset-button');

    resetBtn.addEventListener('click', () => {
        fetch(myURL)
            .then(res => res.json())
            .then(data => {
                const updatePromises = data.map(team => {
                    return fetch(`${myURL}/${team.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ points: 540 }) // Reset points to 540
                    });
                });

        
                Promise.all(updatePromises)
                    .then(() => location.reload())
                    .catch(error => console.error('Error resetting points:', error));
            })
            .catch(error => console.error('Error fetching teams:', error));
    });
}

// Creating new teams using POST requests
function handleNewTeam(newTeam){
    fetch(myURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTeam)
    })
    .then(res => res.json())
    .then(data => console.log(data))
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

function handleDelete(team){
    fetch(`${myURL}/${team.id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => location.reload())
    .then(res => res.json())
    .then(data => console.log(`Team Successfully Deleted`))
}