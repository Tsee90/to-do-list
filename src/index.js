import './style.css';
import {Item, Project, Library} from './projects.js';
import {libraryDisplay, updateDisplay, refreshLibraryDisplay} from './displays.js'

const init = (function(){
    const library = new Library();
    const defaultProject = new Project('Default Project');
    const defaultItem = new Item('Default', 'Something to do...', new Date(2026, 9, 16), false);

    defaultProject.addItem(defaultItem);
    library.addProject(defaultProject);
    updateDisplay(libraryDisplay(library));

    const newProjectButton = document.querySelector('#new-project-btn');
    newProjectButton.addEventListener('click', clickNewProject);

    const createProjectButton = document.querySelector('#create-project-btn');
    createProjectButton.addEventListener('click', clickCreateProjectButton);

    const dialog = document.querySelector('#new-project-dialog');

    function clickNewProject(){
        
        dialog.showModal();
    }

    function clickCreateProjectButton(event){
        event.preventDefault();
        const projectName = document.querySelector('#new-project-name').value;
        library.addProject(new Project(projectName));
        refreshLibraryDisplay();
        const form = document.querySelector('#new-project-form');
        form.reset();
        dialog.close();
    }

    const viewAllButton = document.querySelector('#view-all-btn');
    viewAllButton.addEventListener('click', viewAll);

    function viewAll(){
        updateDisplay(libraryDisplay(library));
    }

})();



