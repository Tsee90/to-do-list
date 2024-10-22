import './style.css';
import {Item, Project, Library} from './projects.js';
import {initDisplay} from './displays.js'

const init = (function(){
    if(localStorage.getItem('library') === null){
        const library = new Library();
        const defaultProject = new Project('Default Project');
        const defaultItem = new Item('Default Item', 'Something to do...', false);
        defaultItem.setDueDate('2026-10-10');
        defaultProject.addItem(defaultItem);
        library.addProject(defaultProject);
        initDisplay(library);
    }else{
        const storedLibrary = JSON.parse(localStorage.getItem('library'));

        const recreatedProjects = storedLibrary.projects.map(project => {
            const recreatedItems = project.items.map(item => Object.assign(new Item(), item)); 

            return Object.assign(new Project(), project, { items: recreatedItems }); 
        });

        const recreatedLibrary = Object.assign(new Library(), storedLibrary, { projects: recreatedProjects });

        initDisplay(recreatedLibrary);
    }
    
    
    
})();



