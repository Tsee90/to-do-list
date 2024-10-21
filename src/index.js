import './style.css';
import {Item, Project, Library} from './projects.js';
import {initDisplay} from './displays.js'

const init = (function(){
    const library = new Library();
    const defaultProject = new Project('Default Project');
    const defaultItem = new Item('Default', 'Something to do...', false);
    const defaultItem2 = new Item('Default2', 'Something else to do...', true, true);
    defaultItem.setDueDate('2026-10-10');
    defaultItem2.setDueDate('2028-06-26');

    defaultProject.addItem(defaultItem);
    defaultProject.addItem(defaultItem2);
    library.addProject(defaultProject);
    
    initDisplay(library);

})();



