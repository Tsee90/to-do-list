import editImage from './imgs/edit.svg';
import deleteImage from './imgs/delete.svg';

function libraryDisplay(library){
    const libraryArr = library.getProjects();

    const display = createDivId('library-display');
    display.library = library;

    const titleHeaderDiv = createDivId('library-title');
    titleHeaderDiv.textContent = 'Project Title';
    

    const dateHeaderDiv = createDivId('library-date');
    dateHeaderDiv.textContent = 'Date Created';

    display.appendChild(titleHeaderDiv);
    display.appendChild(dateHeaderDiv);

    libraryArr.forEach(project => {

        const titleDiv = createDivClass('project-title');
        titleDiv.textContent = project.title;
        titleDiv.project = project;

        const iconContainer = createDivClass('project-icon-container');
        const edit = createIconDiv(editImage, 'edit-project');
        edit.project = project;
        projectEditHandler(edit);
        
        const remove = createIconDiv(deleteImage, 'delete-project');
        remove.project = project;
        projectRemoveHandler(remove, library);

        projectIconHandler(titleDiv, iconContainer);

        iconContainer.appendChild(edit);
        iconContainer.appendChild(remove);
        titleDiv.appendChild(iconContainer);

        const dateDiv = createDivClass('project-date');
        dateDiv.textContent = project.date;
        dateDiv.project = project;

        display.appendChild(titleDiv);
        display.appendChild(dateDiv);
    });
 return display;
}

function projectIconHandler(div, icons){
    div.addEventListener('mouseover', toggleOn);
    div.addEventListener('mouseout', toggleOff);

    function toggleOn(){
        icons.style.opacity = 1;
    }
    function toggleOff(){
        icons.style.opacity = 0;
    }
}

function projectEditHandler(div){
    div.addEventListener('click', say);
    function say(){
        alert('hello')
    }
}

function projectRemoveHandler(div, library){
    div.addEventListener('click', remove);

    function remove(){
        library.removeProject(div.project);
        refreshLibraryDisplay();
    }
}

function createDivId(id){
    const div = document.createElement('div');
    div.id = id;
    return div;
}

function createDivClass(cls){
    const div = document.createElement('div');
    div.classList.add(cls)
    return div;
}

function createIconDiv(img, cls){
    const icon = document.createElement('img');
    icon.src = img;
    const iconDiv = document.createElement('div');
    iconDiv.classList.add(cls);
    iconDiv.appendChild(icon);
    return iconDiv;
}

function getMainContainer(){
    return document.querySelector('#main-container');
}

function refreshLibraryDisplay() {
    const display = document.querySelector('#library-display');
    getMainContainer().innerHTML = '';
    updateDisplay(libraryDisplay(display.library));

}

function updateDisplay(div){
    getMainContainer().appendChild(div);
}

export {libraryDisplay, updateDisplay, refreshLibraryDisplay}