export const saveDataToLocalStorage = (tasks, toolBarTitles, customFields) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('toolBarTitles', JSON.stringify(toolBarTitles));
  localStorage.setItem('customFields', JSON.stringify(customFields));
};

export const loadDataFromLocalStorage = () => {
  const tasks = localStorage.getItem('tasks');
  const toolBarTitles = localStorage.getItem('toolBarTitles');
  const customFields = localStorage.getItem('customFields');
  return {
    tasks: tasks ? JSON.parse(tasks) : [],
    toolBarTitles: toolBarTitles ? JSON.parse(toolBarTitles) : ['Title', 'Priority', 'Status'],
    customFields: customFields ? JSON.parse(customFields) : []
  };
};
