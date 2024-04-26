'use strict';

const inputToDo = document.querySelector('.to-do-input');
const toDoContainer = document.querySelector('.to-do-list');
const btnclear = document.querySelector('.clear');

/////////////////////////////////

class App {
    // For Deleting Done Tasks & Restoring 
    #taskElements = []; // [key, value] / [taskEl, taskDesc]

    constructor(){
        inputToDo.addEventListener('keydown', this.#newToDo.bind(this));
        btnclear.addEventListener('click', this.#clearTasks.bind(this));

        this.#getLocalStorage();
    }

    #newToDo (e) {
        if (e.code === 'Enter'){
        if(!inputToDo.value) return; 

            // Create New Task
            const task = inputToDo.value;
            
            this.#renderNewTask(task);

            // Clear Input Field
            inputToDo.value = '';

            this.#setLocalStorage ();
        }
    }
    
    #renderNewTask(task) {
        // Create Element
        const li = document.createElement('li');
        li.classList.add('to-do');
        const inputCheckbox = document.createElement('input');
        inputCheckbox.type = 'checkbox';
        inputCheckbox.classList.add('to-do-done');
        const span = document.createElement('span');
        span.classList.add('to-do-text')
        span.innerHTML = task;

        li.appendChild(inputCheckbox);
        li.appendChild(span);

        // Add Element Into TaskElement Array
        this.#taskElements.push([li, task]);

        // Display Element In DOM
        toDoContainer.appendChild(li);

        // Update Local Storage 
        this.#setLocalStorage();
    }

    #clearTasks () {

        this.#taskElements.filter(([task, _]) =>  task.querySelector('input').checked)
        .forEach(([taskDone, _]) => taskDone.remove());

        // Updating TaskElement Array
        this.#taskElements = this.#taskElements.filter(([task, _]) => 
            !(task.querySelector('input').checked)
        );

        // Update Local Storage
        this.#setLocalStorage();
    }

    #setLocalStorage () {
        let data = [];
        this.#taskElements.forEach(([_, taskDesc]) => {
            data.push(taskDesc);
        });

        localStorage.setItem('tasks', JSON.stringify(data));
    }
    #getLocalStorage () {
        const data = JSON.parse(localStorage.getItem('tasks'));
        if (!data) return;

        data.forEach(taskDesc => this.#renderNewTask(taskDesc));
    }
}

const app = new App();

