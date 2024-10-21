import editImage from './imgs/edit.svg';
import deleteImage from './imgs/delete.svg';
import expandImage from './imgs/expand.svg';
import collapseImage from './imgs/collapse.svg';
import priorityImage from './imgs/priority-high.svg';
import cancelImage from './imgs/cancel.svg';
import openImage from './imgs/open.svg';
import {Item, Project, Library} from './projects.js';
import {format} from 'date-fns';



function initDisplay(library) {
    const mainDisplay = createDivId('main-display');
    const mainHeader = createDivId('main-header');
    const mainBody = createDivId('main-body');

    const libraryDisplayer = libraryDisplay(library);
    const homeTab = createLibraryTab(library);

    mainHeader.appendChild(homeTab);
    mainBody.appendChild(libraryDisplayer);

    mainDisplay.appendChild(mainHeader);
    mainDisplay.appendChild(mainBody);

    const mainContainer = document.querySelector('#main-container');
    mainContainer.appendChild(mainDisplay);
}

function createLibraryTab(library){
    const libraryTab= createDivClass('tab');
    libraryTab.id = 'library-tab';
    libraryTab.textContent = 'Library';
    libraryTab.addEventListener('click', viewAll);
    libraryTab.library = library;
    libraryTab.classList.add('tab-on');

    function viewAll(){
        updateMainBodyDisplay(libraryDisplay(library));
        updateTabs();
    }
    
    return libraryTab;
}

function createProjectTab(project){
    const projectTab = createDivClass('tab');
    projectTab.id = 'project-tab-' + project.idNumber;
    projectTab.project = project;

    const projectTabTitle = createDivClass('tab-title');
    projectTabTitle.project = project;
    projectTabTitle.textContent = project.title;

    const removeIcon = createIconDiv(cancelImage, 'remove-tab');
    removeTabHandler(projectTab, removeIcon);
    openProjectHandler(projectTabTitle);
    projectTab.appendChild(projectTabTitle);
    projectTab.appendChild(removeIcon);
    
    return projectTab;
}

function updateTabs(){
    const tabList = document.querySelectorAll('.tab');
    const projectDisplay = document.querySelector('#project-display');

    if(projectDisplay !== null && projectDisplay !== undefined){
        document.querySelector('#library-tab').classList.remove('tab-on');
        tabList.forEach(tab => {
            if(tab.project !== undefined && tab.project !== null){
                if(tab.project.idNumber === projectDisplay.project.idNumber){
                    tab.querySelector('.remove-tab').style.display = 'flex';
                    tab.classList.add('tab-on');
                }else{
                    tab.querySelector('.remove-tab').style.display = 'none';
                    tab.classList.remove('tab-on');
                }
            }
        });
    }else{
        document.querySelector('#library-tab').classList.add('tab-on');
        tabList.forEach(tab => {
            if(tab.project !== undefined && tab.project !== null){ 
                tab.querySelector('.remove-tab').style.display = 'none'; 
                tab.classList.remove('tab-on');
            }
        });
    }
}

function updateTabNames(){
    const tabList = document.querySelectorAll('.tab');
    tabList.forEach(tab => {
        if(tab.project !== undefined && tab.project !== null){ 
            tab.querySelector('.tab-title').textContent = tab.project.title;
        }
    });
}

function addTab(tab) {
    if(!isTabOpen(tab)){
        document.querySelector('#main-header').appendChild(tab);
    }
}

function removeTabHandler(tab, icon){
    icon.addEventListener('click', removeTab);
    function removeTab(event){
        event.preventDefault();
        const tabList = document.querySelectorAll('.tab');
        tabList.forEach(div => {
            if (div.id === 'project-tab-' + tab.project.idNumber.toString()){
                div.remove();
                const library = document.querySelector('#library-tab').library;
                updateMainBodyDisplay(libraryDisplay(library))
            }
        })
    }
}

function isTabOpen(tab){
    const tabList = document.querySelectorAll('.tab');
    let open = false;
    tabList.forEach(div => {
    if(tab.id === div.id)
        open = true;
    });
    return open;
}

function libraryDisplay(library){

    const libraryDisplay = createDivId('library-display');
    libraryDisplay.library = library;

    const libraryHeader = createLibraryHeaderDisplay(library);

    const projectListDisplay = createProjectListDisplay(library);

    const projectListDisplayWrapper = createDivId('project-list-display-wrapper');

    projectListDisplayWrapper.appendChild(projectListDisplay);

    libraryDisplay.appendChild(libraryHeader);

    libraryDisplay.appendChild(projectListDisplayWrapper);


 return libraryDisplay;
}

function createLibraryHeaderDisplay(library){

    const libraryHeaderContainer = createDivId('library-header-container');

    const libraryHeaderTitleWrapper = createDivId('library-header-title-wrapper');

    const titleHeaderDiv = createDivId('library-header-title');
    titleHeaderDiv.textContent = 'Projects';

    const newProjectButton = document.createElement('button');
    newProjectButton.id = 'new-project-btn';
    newProjectButton.textContent = '+';
    newProjectButton.library = library;
    addProjectHandler(newProjectButton);

    libraryHeaderTitleWrapper.appendChild(titleHeaderDiv);
    libraryHeaderTitleWrapper.appendChild(newProjectButton);

    const dateHeaderDiv = createDivId('library-date');
    dateHeaderDiv.textContent = 'Date Created';

    libraryHeaderContainer.appendChild(libraryHeaderTitleWrapper);
    libraryHeaderContainer.appendChild(dateHeaderDiv);

    return libraryHeaderContainer;
}

function createProjectListDisplay(library){

    const projectList = library.getProjects();
    const projectListDisplay = createDivId('project-list-display');

    projectList.forEach(project => {
        projectListDisplay.appendChild(createProjectContainer(project, library))
;
    });

    return projectListDisplay;
}

function createProjectContainer(project, library) {
        const projectContainerID = 'project-container-' + project.getId();
        const projectContainer = createDivClass('project-container');
        projectContainer.id = projectContainerID;
        projectContainer.project = project;

        const titleIconWrapper = createDivClass('title-icon-wrapper');

        const titleDiv = createDivClass('project-title');
        titleDiv.textContent = project.title;
        titleDiv.project = project;

        const iconContainer = createDivClass('project-icon-container');
        const open = createIconDiv(openImage, 'open-project');
        open.project = project;
        openProjectHandler(open);

        const edit = createIconDiv(editImage, 'edit-project');
        edit.project = project;
        edit.library = library;
        editProjectHandler(edit)
        
        const remove = createIconDiv(deleteImage, 'delete-project');
        remove.project = project;
        projectRemoveHandler(remove, library);

        projectIconHandler(titleIconWrapper, iconContainer);

        iconContainer.appendChild(open);
        iconContainer.appendChild(edit);
        iconContainer.appendChild(remove);
        titleIconWrapper.appendChild(titleDiv);
        titleIconWrapper.appendChild(iconContainer);

        const dateDiv = createDivClass('project-date');
        dateDiv.textContent = project.date;
        dateDiv.project = project;

        projectContainer.appendChild(titleIconWrapper);
        projectContainer.appendChild(dateDiv);
        return projectContainer;
}

function addProjectHandler(button){
    button.addEventListener('click', addProject);
    function addProject(){
        const dialog = createProjectDialog(button.library);
        getMainBodyContainer().appendChild(dialog);
        dialog.showModal();
    }
}

function createProjectDialog(library) {
    const dialog = document.createElement('dialog');
    dialog.id = 'new-project-dialog';

    const form = createProjectForm();

    const submitButton = form.querySelector('#create-project-btn');
    submitButton.textContent = 'Create';
    submitButton.library = library;
    submitButton.addEventListener('click', createProject);

    function createProject(event){
        event.preventDefault();
        const formData = new FormData(form);
        const projectName = formData.get('project-name');
        const newProject = new Project(projectName);

        library.addProject(newProject);
        updateMainBodyDisplay(libraryDisplay(library));
        dialog.remove();
    }

    const closeButton = form.querySelector('#close-item-dialog-btn');
    closeButton.addEventListener('click', function() {
        dialog.remove(); 
    });

    dialog.appendChild(form);
    return dialog;

}

function createProjectForm(){
    const form = document.createElement('form');
    form.action = ""; 
    form.id = 'new-project-form';

    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'new-project-name');
    nameLabel.textContent = 'Project Name:';
    form.appendChild(nameLabel);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'new-project-name';
    nameInput.name = 'project-name';
    form.appendChild(nameInput);

    const formButtonWrapper = createDivClass('form-button-wrapper');

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.id = 'create-project-btn';
    submitButton.textContent = 'Submit';
    formButtonWrapper.appendChild(submitButton);

    const closeButton = document.createElement('button');
    closeButton.type = 'button'; 
    closeButton.id = 'close-item-dialog-btn';
    closeButton.textContent = 'Close';
    formButtonWrapper.appendChild(closeButton);

    form.appendChild(formButtonWrapper);
    return form;
}

function createEditProjectDialog(edit){
    const dialog = document.createElement('dialog');
    dialog.id = 'new-project-dialog';

    const form = createProjectForm();
    form.querySelector('#new-project-name').value = edit.project.title;

    const submitButton = form.querySelector('#create-project-btn');
    submitButton.textContent = 'Save';
    submitButton.addEventListener('click', editProject);

    function editProject(event){
        event.preventDefault();
        const formData = new FormData(form);
        const projectName = formData.get('project-name');
        edit.project.title = projectName;

        updateMainBodyDisplay(libraryDisplay(edit.library));
        updateTabNames();
        dialog.remove();
    }

    const closeButton = form.querySelector('#close-item-dialog-btn');
    closeButton.addEventListener('click', function() {
        dialog.remove(); 
    });

    dialog.appendChild(form);
    return dialog;

}

function editProjectHandler(editIcon){
    editIcon.addEventListener('click', clickEdit);
    function clickEdit(event){
        event.preventDefault();
        const dialog = createEditProjectDialog(editIcon);
        getMainBodyContainer().appendChild(dialog);
        dialog.showModal();
    }
}


function createProjectDisplay(project){
    const itemList = project.getItems();

    const display = createDivId('project-display');
    display.project = project;

    const projectDisplayHeader = createDivId('project-display-header');

    const titleHeaderDiv = createDivId('item-title');
    titleHeaderDiv.textContent = 'Items';

    const addItemButton = document.createElement('button');
    addItemButton.id = 'new-item-button';
    addItemButton.textContent = '+';
    addItemButton.project = project;
    addItemHandler(addItemButton);
    titleHeaderDiv.appendChild(addItemButton);
    
    const dateHeaderDiv = createDivId('item-due-date');
    dateHeaderDiv.textContent = 'Due Date';

    projectDisplayHeader.appendChild(titleHeaderDiv);
    projectDisplayHeader.appendChild(dateHeaderDiv);
    display.appendChild(projectDisplayHeader);

    const projectItemListDisplay = createDivId('project-item-list-display');

    const projectItemListDisplayWrapper = createDivId('project-item-list-display-wrapper');
    projectItemListDisplayWrapper.appendChild(projectItemListDisplay);
    display.appendChild(projectItemListDisplayWrapper);

    itemList.forEach(item => {
        const itemContainer = createDivClass('item-container');
        itemContainer.item = item;
        itemContainer.project = project;
        itemContainer.id = 'item-container-' + item.idNumber;

        updateItemContainer(itemContainer);

        projectItemListDisplay.appendChild(itemContainer);
    })
    return display;
}

function updateItemContainer(div){
    let isExpand = false;
    if(div.querySelector('.item-description-container') !== null){
        isExpand = true;
    }
    div.innerHTML = '';
    const item = div.item;
    const project = div.project;

    const itemHeader = createDivClass('item-header');

    const titleContainer = createDivClass('item-title-container');

    const checkBox = createItemStatusCheckbox(item);
    titleContainer.appendChild(checkBox);

    const titleDiv = createDivClass('item-title');
    titleDiv.textContent = item.title;
    titleContainer.appendChild(titleDiv);

    const priorityDiv = createPriorityDiv(item);
    titleContainer.appendChild(priorityDiv);

    const iconContainer = createDivClass('item-icon-container');

    const edit = createIconDiv(editImage, 'edit-item');
    edit.item = item;
    edit.project = project;
    editItemHandler(edit, div);

    const expand = createIconDiv(expandImage, 'expand-item');
    expand.item = item;
    itemExpandHandler(expand, div, iconContainer);
    

    const remove = createIconDiv(deleteImage, 'remove-item');
    remove.item = item;
    remove.project = project;
    removeItemHandler(remove);

    iconContainer.appendChild(expand);
    iconContainer.appendChild(edit);
    iconContainer.appendChild(remove);
    itemHeader.appendChild(titleContainer);
    itemHeader.appendChild(iconContainer);
    div.appendChild(itemHeader);

    projectIconHandler(itemHeader, iconContainer);

    const dateDiv = createDivClass('item-date');
    dateDiv.textContent = item.dueDate;
    dateDiv.item = item;

    div.appendChild(dateDiv);
    if(isExpand){
        expand.click();
    }
}

function removeItemHandler(icon){
    icon.addEventListener('click', clickRemoveItem);
    function clickRemoveItem(event){
        event.preventDefault();
        icon.project.removeItem(icon.item);
        removeItemFromDisplay(icon.item);
    }
}

function itemExpandHandler(icon, div, iconContainer){
    icon.addEventListener('click', clickExpand);
    function clickExpand(event){
        event.preventDefault();
        const descriptionDiv = createDivClass('item-description-container');
        descriptionDiv.textContent = div.item.description;
        div.appendChild(descriptionDiv);
        const collapse = createIcon(collapseImage);
        icon.innerHTML = '';
        icon.appendChild(collapse); 
        icon.removeEventListener('click', clickExpand);
        itemCollapseHandler(icon, div, iconContainer);
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

function createPriorityDiv(item) {
    const priorityDiv = createDivClass('priority-container');
    updatePriority(item, priorityDiv);
    return priorityDiv;
}

function updatePriority(item, div) {
    if(item.priority){
        const priority = createIcon(priorityImage);
        priority.classList.add('icon');
        div.appendChild(priority);
    }else{
        div.innerHTML = '';
    }
}

function createItemStatusCheckbox(item){
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('statusCheckbox');
    checkbox.checked = item.status;  
    checkbox.name = 'status-checkbox';

    checkbox.addEventListener('change', clickCheck);

    function clickCheck(){
        item.status = checkbox.checked;
    }

    return checkbox;
}

function editItemHandler(icon, div){
    icon.addEventListener('click', clickEdit);
    function clickEdit(event){
        event.preventDefault();
        const dialog = createEditItemDialog(icon, div);
        getMainBodyContainer().appendChild(dialog);
        dialog.showModal();
    }

}

function createEditItemDialog(icon, div){
    const item = icon.item;
    const project = icon.project;
    const dialog = document.createElement('dialog');
    dialog.id = 'edit-item-dialog';

    const form = createItemForm();
    form.querySelector('#form-item-title').value = item.title;
    form.querySelector('#item-description').value = item.description;
    form.querySelector('#due-date').value = format(item.dueDate, 'yyyy-MM-dd');
    form.querySelector('#priority').checked = item.priority;

    const submitButton = form.querySelector('#create-item-btn');
    submitButton.textContent = 'Save';
    submitButton.item = item;
    submitButton.addEventListener('click', editItem);

    function editItem(event){
        event.preventDefault();
        const formData = new FormData(form);
        item.title = formData.get('item-title');
        item.description = formData.get('item-description');
        item.setDueDate(formData.get('due-date'));
        item.priority = formData.get('priority');

        updateItemContainer(div);
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
        getMainBodyContainer().appendChild(dialog);
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
        const titleInput = formData.get('form-item-title');
        const descriptionInput = formData.get('item-description');
        const dueDateInput = formData.get('due-date');
        const priorityInput = formData.get('priority');

        const newItem = new Item(titleInput, descriptionInput, priorityInput);
        newItem.setDueDate(dueDateInput);
        project.addItem(newItem);
        updateMainBodyDisplay(createProjectDisplay(project));
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
    titleLabel.textContent = 'Item Name:';
    form.appendChild(titleLabel);

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'item-title';
    titleInput.id = 'form-item-title';
    titleInput.required = true;
    form.appendChild(titleInput);

    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'item-description');
    descriptionLabel.textContent = 'Item description:';
    form.appendChild(descriptionLabel);

    const descriptionInput = document.createElement('textarea');
    descriptionInput.name = 'item-description';
    descriptionInput.id = 'item-description';
    form.appendChild(descriptionInput);

    const dueDateWrapper = createDivClass('due-date-wrapper');
    const dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', 'due-date');
    dueDateLabel.textContent = 'Due date:';
    dueDateWrapper.appendChild(dueDateLabel);

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.name = 'due-date';
    dueDateInput.id = 'due-date';
    dueDateInput.value = format(new Date(), 'yyyy-MM-dd');
    dueDateInput.required = true; 
    dueDateWrapper.appendChild(dueDateInput);
    form.appendChild(dueDateWrapper);

    const priorityWrapper = createDivClass('form-priority-wrapper');
    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'priority');
    priorityLabel.textContent = 'High priority?';
    priorityWrapper.appendChild(priorityLabel);

    const priorityInput = document.createElement('input');
    priorityInput.type = 'checkbox';
    priorityInput.name = 'priority';
    priorityInput.id = 'priority';
    priorityWrapper.appendChild(priorityInput);
    form.appendChild(priorityWrapper);

    const formButtonWrapper = createDivClass('form-button-wrapper');

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.id = 'create-item-btn';

    formButtonWrapper.appendChild(submitButton);

    const closeButton = document.createElement('button');
    closeButton.type = 'button'; 
    closeButton.id = 'close-item-dialog-btn';
    closeButton.textContent = 'Close';

    formButtonWrapper.appendChild(closeButton);
    form.appendChild(formButtonWrapper);

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

function openProjectHandler(div){
    div.addEventListener('click', clickEdit);
    function clickEdit(){
        const display = createProjectDisplay(div.project);
        updateMainBodyDisplay(display);
        const tab = createProjectTab(div.project);
        addTab(tab);
        updateTabs();
    }
}

function projectRemoveHandler(div, library){
    div.addEventListener('click', remove);

    function remove(){
        removeProjectFromDisplay(div.project);
        library.removeProject(div.project);
    }
}

function removeProjectFromDisplay(project) {
    const projectDisplayList = document.querySelectorAll('.project-container');
    projectDisplayList.forEach(div => {
        if (div.id === 'project-container-' + project.idNumber.toString()){
            div.remove();
        }
    });
}

function removeItemFromDisplay(item) {
    const itemDisplayList = document.querySelectorAll('.item-container');
    itemDisplayList.forEach(div => {
        if (div.id === 'item-container-' + item.idNumber.toString()){
            div.remove();
        }
    });
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
    icon.classList.add('icon');
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

function getMainBodyContainer(){
    return document.querySelector('#main-body');
}

function updateMainBodyDisplay(div){
    getMainBodyContainer().innerHTML = '';
    getMainBodyContainer().appendChild(div);
}

export {initDisplay}