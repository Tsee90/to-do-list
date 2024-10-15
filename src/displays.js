
function libraryDisplay(library){
 const libraryArr = library.getProjects();
 const display = document.createElement('div');
 display.id = 'library-display';
 libraryArr.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('project-title');
    titleDiv.textContent = project.title;

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('project-date');
    dateDiv.textContent = project.date;

    const itemList = project.items;
    const itemsDiv = document.createElement('div');
    itemList.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = item.title;
        itemsDiv.appendChild(itemDiv);
    });

    projectCard.appendChild(titleDiv);
    projectCard.appendChild(dateDiv);
    projectCard.appendChild(itemsDiv);
    display.appendChild(projectCard);
 });
 return display;
}

function updateDisplay(div){
    const mainContainer = document.querySelector('#main-container');
    mainContainer.appendChild(div);
}
export {libraryDisplay, updateDisplay}