import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import { reorderList, selectTasks } from './store/tasksSlice';
import TaskListItem from './TaskListItem';
import ProjectDropdown from './task/ProjectDropdown';
import StopWatch from './task/Stopwatch';

function TasksList(props) {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  if (!tasks) {
    return null;
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    dispatch(
      reorderList({
        arr: tasks,
        startIndex: result.source.index,
        endIndex: result.destination.index,
      })
    );
  }
  return (
    <div className=" justify-between">
      <div className="flex-col sm:flex-row item-center sm:items-end space-y-16 sm:space-y-0 p-24 sm:p-32 w-full border-b-1 flex justify-between">
        <TextField
          className="mr-16"
          id="task-entry"
          label="What are you doing?"
          variant="standard"
          sx={{ width: 300 }}
        />
        <ProjectDropdown />
        <StopWatch />
      </div>
      <List className="w-full m-0 p-0">
        <div>
          {tasks.map((item, index) => {
            if (item.type === 'task') {
              return <TaskListItem data={item} index={index} key={item.id} />;
            }
            return null;
          })}
        </div>
      </List>
    </div>
  );
}

export default TasksList;
