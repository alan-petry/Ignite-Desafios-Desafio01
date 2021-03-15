import { useState } from 'react';

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [id, setID] = useState(0);

  function newID(){
    return setID(id + 1);
  }
  
  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) return;
      
    newID();
    setTasks([...tasks, {id: id, 
                         title : newTaskTitle, 
                         isComplete: false}]);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    // //buscar o index do array com base no ID
    // var result = tasks.filter(function(el:Task) {
    //   return el.id == id;
    // });
    // for(var elemento of result){
    //   var index = tasks.indexOf(elemento);    
    // }
    // // com base no index altera o campo e atualiza tasks
    // const tarefas = tasks.slice();
    // tarefas[index].isComplete = !tarefas[index].isComplete;
    // setTasks(tarefas);
    const newTasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task);

    setTasks(newTasks);
  }
  
  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    // //buscar o index do array com base no ID
    // var result = tasks.filter(function(el:Task) {
    //   return el.id == id;
    // });
    // for(var elemento of result){
    //   var index = tasks.indexOf(elemento); 
    // }
    // // com base no index, splice remove o item e depois atualizamos tasks
    // const tarefas = tasks.slice();   
    // tarefas.splice(index, 1);
    // setTasks(tarefas);

    const filtro = tasks.filter(task => task.id !== id);

    setTasks(filtro);

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}