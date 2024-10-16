import './style.css';
import {Item, Project, Library} from './projects.js';
import {libraryDisplay, updateDisplay} from './displays.js'

const init = (function(){
    const library = new Library();
    const defaultProject = new Project('Default Project');
    const defaultItem = new Item('Default', 'Something to do...', new Date(), false);
    defaultProject.addItem(defaultItem);
    library.addProject(defaultProject);
    updateDisplay(libraryDisplay(library));
})();