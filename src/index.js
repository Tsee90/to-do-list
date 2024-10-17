import './style.css';
import {Item, Project, Library} from './projects.js';
import {libraryDisplay, updateDisplay, refreshLibraryDisplay} from './displays.js'

const init = (function(){
    const library = new Library();
    const defaultProject = new Project('Default Project');
    const defaultItem = new Item('Default', 'Something to do...', new Date(2026, 9, 16), false);
    const defaultItem2 = new Item('Default2', 'Something else to do...', new Date(2028, 11, 25), true, true);

    defaultProject.addItem(defaultItem);
    defaultProject.addItem(defaultItem2);
    library.addProject(defaultProject);
    updateDisplay(libraryDisplay(library));

    const viewAllButton = document.querySelector('#view-all-btn');
    viewAllButton.addEventListener('click', viewAll);

    function viewAll(){
        updateDisplay(libraryDisplay(library));
    }

})();



