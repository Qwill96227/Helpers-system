class TaskObserver {
    update(task) {
      console.log(`Task Updated: ${task.title}, Volunteers: ${task.volunteers.length}`);
    }
  }
  
  class TaskNotifier {
    constructor() {
      this.observers = [];
    }
  
    subscribe(observer) {
      this.observers.push(observer);
    }
  
    notify(task) {
      this.observers.forEach(obs => obs.update(task));
    }
  }
  
  module.exports = new TaskNotifier();
  
