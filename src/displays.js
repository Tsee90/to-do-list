
function libraryDisplay(library){
    const libraryArr = library.getProjects();

    const display = document.createElement('div');
    display.id = 'library-display';
    display.library = library;

    const titleHeaderDiv = document.createElement('div');
    titleHeaderDiv.textContent = 'Project Title';
    titleHeaderDiv.id = 'library-title';

    const dateHeaderDiv = document.createElement('div');
    dateHeaderDiv.textContent = 'Date Created';
    dateHeaderDiv.id = 'library-date';

    display.appendChild(titleHeaderDiv);
    display.appendChild(dateHeaderDiv);

 libraryArr.forEach(project => {

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('project-title');
    titleDiv.textContent = project.title;
    titleDiv.project = project;

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('project-date');
    dateDiv.textContent = project.date;
    dateDiv.project = project;

    display.appendChild(titleDiv);
    display.appendChild(dateDiv);
 });
 return display;
}

function refreshLibraryDisplay() {
    const display = document.querySelector('#library-display');
    const mainContainer = document.querySelector('#main-container');
    mainContainer.innerHTML = '';
    updateDisplay(libraryDisplay(display.library));

}

function updateDisplay(div){
    const mainContainer = document.querySelector('#main-container');
    mainContainer.appendChild(div);
}

export {libraryDisplay, updateDisplay, refreshLibraryDisplay}