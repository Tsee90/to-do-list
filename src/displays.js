import { he } from "date-fns/locale";

function libraryDisplay(library){
    const libraryArr = library.getProjects();

    const display = document.createElement('div');
    display.id = 'library-display';

    const titleHeaderDiv = document.createElement('div');
    titleHeaderDiv.textContent = 'Project Title';
    titleHeaderDiv.id = 'library-title';

    const dateHeaderDiv = document.createElement('div');
    dateHeaderDiv.textContent = 'Due Date';
    dateHeaderDiv.id = 'library-date';

    display.appendChild(titleHeaderDiv);
    display.appendChild(dateHeaderDiv);

 libraryArr.forEach(project => {

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('project-title');
    titleDiv.textContent = project.title;

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('project-date');
    dateDiv.textContent = project.date;

    display.appendChild(titleDiv);
    display.appendChild(dateDiv);
 });
 return display;
}

function updateDisplay(div){
    const mainContainer = document.querySelector('#main-container');
    mainContainer.appendChild(div);
}
export {libraryDisplay, updateDisplay}