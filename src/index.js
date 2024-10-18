import './style.css';
import {Item, Project, Library} from './projects.js';
import {initDisplay} from './displays.js'

const init = (function(){
    const library = new Library();
    const defaultProject = new Project('Default Project');
    const defaultItem = new Item('Default', 'Something to do...', new Date(2026, 9, 16), false);
    const defaultItem2 = new Item('Default2', 'Something else to do...', new Date(2028, 11, 25), true, true);

    defaultProject.addItem(defaultItem);
    defaultProject.addItem(defaultItem2);
    library.addProject(defaultProject);
    
    initDisplay(library);

})();



