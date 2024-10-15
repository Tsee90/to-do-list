import {format} from 'date-fns';

class Item {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = format(dueDate, 'MM/dd/yyyy');
        this.priority = priority;
        this.status = false;
    }

    getItem(){
        return this;
    }

    changeStatus(){
        if(!this.status){
            this.status = true;
        }else{
            this.status = false;
        }
    }
}

class Project {
    constructor(title){
        this.title = title;
        this.date = format(new Date(), 'MM/dd/yyyy');
        this.items = [];
    }

    addItem(item){
        this.items.push(item);
    }

    getList(){
        return this.items;
    }
}

class Library {
    constructor(){
        this.projects = [];
    }

    addProject(project){
        this.projects.push(project);
    }

    getProjects(){
        return this.projects;
    }
}

export {Item, Project, Library}