import editImage from './imgs/edit.svg';
import deleteImage from './imgs/delete.svg';
import {Item, Project, Library} from './projects.js';
function libraryDisplay(library){
    const projectList = library.getProjects();

    const display = createDivId('library-display');
    display.library = library;

    const titleHeaderDiv = createDivId('library-title');
    titleHeaderDiv.textContent = 'Project Title';
    

    const dateHeaderDiv = createDivId('library-date');
    dateHeaderDiv.textContent = 'Date Created';

    display.appendChild(titleHeaderDiv);
    display.appendChild(dateHeaderDiv);

    projectList.forEach(project => {

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

function projectDisplay(project){
    const itemList = project.getItems();

    const display = createDivId('project-display');
    display.project = project;

    const titleHeaderDiv = createDivId('item-title');
    titleHeaderDiv.textContent = 'Items';

    const addItemButton = document.createElement('button');
    addItemButton.textContent = 'Add Item';
    addItemButton.project = project;
    addItemHandler(addItemButton);
    titleHeaderDiv.appendChild(addItemButton);
    
    const dateHeaderDiv = createDivId('item-due-date');
    dateHeaderDiv.textContent = 'Due Date';

    display.appendChild(titleHeaderDiv);
    display.appendChild(dateHeaderDiv);

    itemList.forEach(item => {
        const titleDiv = createDivClass('item-title');
        titleDiv.textContent = item.title;
        titleDiv.item = item;

        const dateDiv = createDivClass('item-date');
        dateDiv.textContent = item.dueDate;
        dateDiv.item = item;

        display.appendChild(titleDiv);
        display.appendChild(dateDiv);
    })
    return display;
}

function addItemHandler(button){
    button.addEventListener('click', addItem);
    function addItem(event){
        event.preventDefault();
        const dialog = document.querySelector('#new-item-dialog')
        const form = document.querySelector('#new-item-form');

        const createItemButton = document.createElement('button');
        createItemButton.id = 'create-item-btn';
        createItemButton.textContent = 'Add Item';
        createItemButton.addEventListener('click', clickCreateItem);
        function clickCreateItem(event){
            event.preventDefault();
            const itemTitle = document.querySelector('#item-title').value;
            const itemDescription = document.querySelector('#item-description').value;
            const dueDate = document.querySelector('#due-date').value;
            console.log(dueDate)
            const priority = document.querySelector('#priority').checked;
            const newItem = new Item(itemTitle, itemDescription, dueDate, priority);
            button.project.addItem(newItem);
            updateDisplay(projectDisplay(button.project));
            dialog.close();
        }
        form.appendChild(createItemButton);
        dialog.showModal();
    }
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
        const display = projectDisplay(div.project);
        updateDisplay(display);
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
    getMainContainer().innerHTML = '';
    getMainContainer().appendChild(div);
}

export {libraryDisplay, updateDisplay, refreshLibraryDisplay}