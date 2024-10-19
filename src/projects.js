import {format} from 'date-fns';

class Item {
    static idNumber = 0;
    constructor(title, description, dueDate, priority, status){
        this.title = title;
        this.description = description;
        this.dueDate = format(dueDate, 'MM/dd/yyyy');
        this.priority = priority;
        this.status = status;
        this.idNumber = ++Item.idNumber;
    }

    getItem(){
        return this;
    }

    getId(){
        return this.idNumber;
    }

    changeStatus(){
        if(!this.status){
            this.status = true;
        }else{
            this.status = false;
        }
    }
    getPriority(){
        return this.priority;
    }
}

class Project {
    static idNumber = 0;
    constructor(title){
        this.title = title;
        this.date = format(new Date(), 'MM/dd/yyyy');
        this.items = [];
        this.idNumber = ++Project.idNumber;
    }

    addItem(item){
        this.items.push(item);
    }

    removeItem(item){
        this.items = this.items.filter(i => i.getId() !== item.getId());
    }

    getItems(){
        return this.items;
    }

    getId(){
        return this.idNumber;
    }
}

class Library {
    constructor(){
        this.projects = [];
    }

    addProject(project){
        this.projects.push(project);
    }

    removeProject(project){
        this.projects = this.projects.filter(p => p.getId() !== project.getId());
    }

    getProjects(){
        return this.projects;
    }
}

export {Item, Project, Library}