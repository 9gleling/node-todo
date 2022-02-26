import App from './app.js';
import { initializeDatabase } from './libs/database';
import UserComponent from './api/user/component';
import TodoComponent from './api/todo/component';

async function start() {
  await initializeDatabase('TODOLIST');
  const app = new App([new UserComponent(), new TodoComponent()]);
  app.listen();
}
start();
