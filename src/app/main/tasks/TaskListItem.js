import { useDispatch } from 'react-redux';
import ProjectDropdown from './task/ProjectDropdown';
import StopWatch from './task/Stopwatch';
import TaskInput from './task/TaskInput';

function TaskListItem(props) {
  const { data, index } = props;
  const dispatch = useDispatch();

  return (
    <div className="flex-col sm:flex-row item-center sm:items-end space-y-16 sm:space-y-0 p-24 sm:p-32 w-full border-b-1 flex justify-between">
      <TaskInput />
      <ProjectDropdown />
      <StopWatch />
    </div>
  );
}

export default TaskListItem;
