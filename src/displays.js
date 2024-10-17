import editImage from './imgs/edit.svg';
import deleteImage from './imgs/delete.svg';
import expandImage from './imgs/expand.svg';
import collapseImage from './imgs/collapse.svg';
import {Item, Project, Library} from './projects.js';
import {format} from 'date-fns';

function libraryDisplay(library){
    const projectList = library.getProjects();

    const display = createDivId('library-display');
    display.library = library;

    const titleHeaderDiv = createDivId('library-title');
    titleHeaderDiv.textContent = 'Project Title';

    const newProjectButton = document.createElement('button');
    newProjectButton.textContent = '+ New Project';
    newProjectButton.library = library;
    addProjectHandler(newProjectButton);
    titleHeaderDiv.appendChild(newProjectButton);
    

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

function addProjectHandler(button){
    button.addEventListener('click', addProject);
    function addProject(){
        const dialog = createProjectDialog(button.library);
    }
}

function createProjectDialog(library) {
    const dialog = document.createElement('dialog');
    dialog.id = 'new-project-dialog';

    const form = document.createElement('form');
    form.action = ""; 
    form.id = 'new-project-form';

    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'new-project-name');
    nameLabel.textContent = 'New Project Name:';
    form.appendChild(nameLabel);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'new-project-name';
    nameInput.name = 'project-name';
    form.appendChild(nameInput);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.id = 'create-project-btn';
    submitButton.textContent = 'Create';
    submitButton.addEventListener('click', clickCreateProjectButton);
    form.appendChild(submitButton);

    function clickCreateProjectButton(event){
        event.preventDefault();
        const projectName = nameInput.value;
        library.addProject(new Project(projectName));
        refreshLibraryDisplay();
        form.reset();
        dialog.close();
    }

    const closeButton = document.createElement('button');
    closeButton.type = 'button'; 
    closeButton.id = 'close-item-dialog-btn';
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', function() {
        dialog.close(); 
    });
    form.appendChild(closeButton);

    dialog.appendChild(form);
    getMainContainer().appendChild(dialog);
    dialog.showModal();
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
        const itemContainer = createDivClass('item-container');
        itemContainer.item = item;

        const itemHeader = createDivClass('item-header');

        const titleContainer = createDivClass('item-title-container');

        const checkBox = createItemStatusCheckbox(item);
        titleContainer.appendChild(checkBox);

        const titleDiv = createDivClass('item-title');
        titleDiv.textContent = item.title;
        titleContainer.appendChild(titleDiv);

        const iconContainer = createDivClass('item-icon-container');

        const edit = createIconDiv(editImage, 'edit-item');
        edit.item = item;
        edit.project = project;
        editItemHandler(edit);

        const expand = createIconDiv(expandImage, 'expand-item');
        expand.item = item;
        itemExpandHandler(expand, itemContainer);

        const remove = createIconDiv(deleteImage, 'remove-item');
        remove.item = item;
        remove.project = project;
        removeItemHandler(remove);

        iconContainer.appendChild(expand);
        iconContainer.appendChild(edit);
        iconContainer.appendChild(remove);
        itemHeader.appendChild(titleContainer);
        itemHeader.appendChild(iconContainer);
        itemContainer.appendChild(itemHeader);

        const dateDiv = createDivClass('item-date');
        dateDiv.textContent = item.dueDate;
        dateDiv.item = item;

        display.appendChild(itemContainer);
        display.appendChild(dateDiv);
    })
    return display;
}

function removeItemHandler(icon){
    icon.addEventListener('click', clickRemoveItem);
    function clickRemoveItem(event){
        event.preventDefault();
        icon.project.removeItem(icon.item);
        updateDisplay(projectDisplay(icon.project));
    }
}

function itemExpandHandler(icon, div){
    icon.addEventListener('click', clickExpand);
    function clickExpand(event){
        event.preventDefault();
        const descriptionDiv = document.createElement('div');
        descriptionDiv.textContent = div.item.description;
        div.appendChild(descriptionDiv);
        const collapse = createIcon(collapseImage);
        icon.innerHTML = '';
        icon.appendChild(collapse);
        icon.removeEventListener('click', clickExpand);
        itemCollapseHandler(icon, div);
    }
    
}

function itemCollapseHandler(icon, div){
    icon.addEventListener('click', clickCollapse);
    function clickCollapse(event){
        event.preventDefault();
        div.lastElementChild.remove();
        const expand = createIcon(expandImage);
        icon.innerHTML = '';
        icon.appendChild(expand);
        icon.removeEventListener('click', clickCollapse);
        itemExpandHandler(icon, div);
    }
}

function createItemStatusCheckbox(item){
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'statusCheckbox';
    checkbox.checked = item.status;  

    checkbox.addEventListener('change', clickCheck);

    function clickCheck(){
        item.status = checkbox.checked;
    }

    return checkbox;
}

function editItemHandler(icon){
    icon.addEventListener('click', clickEdit);
    function clickEdit(event){
        event.preventDefault();
        const dialog = createEditItemDialog(icon);
        getMainContainer().appendChild(dialog);
        dialog.showModal();
    }

}

function createEditItemDialog(icon){
    const item = icon.item;
    const project = icon.project;
    const dialog = document.createElement('dialog');
    dialog.id = 'edit-item-dialog';

    const form = createItemForm();
    form.querySelector('#item-title').value = item.title;
    form.querySelector('#item-description').value = item.description;
    form.querySelector('#due-date').value = format(item.dueDate, 'yyyy-MM-dd');
    form.querySelector('#priority').value = item.priority;

    const submitButton = form.querySelector('#create-item-btn');
    submitButton.textContent = 'Save';
    submitButton.item = item;
    submitButton.addEventListener('click', editItem);

    function editItem(event){
        event.preventDefault();
        const formData = new FormData(form);
        item.title = formData.get('item-title');
        item.description = formData.get('item-description');
        item.dueDate = formData.get('due-date');
        item.priority = formData.get('priority');

        updateDisplay(projectDisplay(project));
        dialog.remove();
    }

    const closeButton = form.querySelector('#close-item-dialog-btn');
    closeButton.addEventListener('click', function() {
        dialog.remove(); 
    });

    dialog.appendChild(form);
    return dialog;
}

function addItemHandler(button){
    button.addEventListener('click', addItem);
    function addItem(event){
        event.preventDefault();
        const dialog = createItemDialog(button.project);
        getMainContainer().appendChild(dialog);
        dialog.showModal();
    }
}

function createItemDialog(project) {
    const dialog = document.createElement('dialog');
    dialog.id = 'new-item-dialog';

    const form = createItemForm();

    const submitButton = form.querySelector('#create-item-btn');
    submitButton.textContent = 'Add';
    submitButton.project = project;
    submitButton.addEventListener('click', createItem);

    function createItem(event){
        event.preventDefault();
        const formData = new FormData(form);
        const titleInput = formData.get('item-title');
        const descriptionInput = formData.get('item-description');
        const dueDateInput = formData.get('due-date');
        const priorityInput = formData.get('priority');

        const newItem = new Item(titleInput, descriptionInput, dueDateInput, priorityInput);
        project.addItem(newItem);
        updateDisplay(projectDisplay(project));
        dialog.remove();
    }

    const closeButton = form.querySelector('#close-item-dialog-btn');
    closeButton.addEventListener('click', function() {
        dialog.remove(); 
    });

    dialog.appendChild(form);
    return dialog;
}

function createItemForm(){

    const form = document.createElement('form');
    form.action = ""; 
    form.id = 'item-form';

    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'item-title');
    titleLabel.textContent = 'Item title:';
    form.appendChild(titleLabel);

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'item-title';
    titleInput.id = 'item-title';
    form.appendChild(titleInput);

    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'item-description');
    descriptionLabel.textContent = 'Item description:';
    form.appendChild(descriptionLabel);

    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.name = 'item-description';
    descriptionInput.id = 'item-description';
    form.appendChild(descriptionInput);

    const dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', 'due-date');
    dueDateLabel.textContent = 'Due date:';
    form.appendChild(dueDateLabel);

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.name = 'due-date';
    dueDateInput.id = 'due-date';
    dueDateInput.value = format(new Date(), 'yyyy-MM-dd');
    dueDateInput.required = true; 
    form.appendChild(dueDateInput);

    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'priority');
    priorityLabel.textContent = 'High priority?';
    form.appendChild(priorityLabel);

    const priorityInput = document.createElement('input');
    priorityInput.type = 'checkbox';
    priorityInput.name = 'priority';
    priorityInput.id = 'priority';
    form.appendChild(priorityInput);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.id = 'create-item-btn';

    form.appendChild(submitButton);

    const closeButton = document.createElement('button');
    closeButton.type = 'button'; 
    closeButton.id = 'close-item-dialog-btn';
    closeButton.textContent = 'Close';

    form.appendChild(closeButton);

    return form;

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
    div.addEventListener('click', clickEdit);
    function clickEdit(){
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
    const icon = createIcon(img);
    const iconDiv = document.createElement('div');
    iconDiv.classList.add(cls);
    iconDiv.appendChild(icon);
    return iconDiv;
}

function createIcon(img){
    const icon = document.createElement('img');
    icon.src = img;
    return icon;
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