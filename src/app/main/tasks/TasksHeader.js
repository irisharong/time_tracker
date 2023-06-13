import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import ProjectDropdown from './task/ProjectDropdown';
import { selectRemainingTasks } from './store/tasksSlice';
import StopWatch from './task/Stopwatch';

function TasksHeader(props) {
  const remainingTasks = useSelector(selectRemainingTasks);

  return (
    <div className="flex flex-col sm:flex-row item-center sm:items-start space-y-16 sm:space-y-0 p-24 sm:p-32 w-full border-b-1 flex items-center justify-between">
      <div className="flex flex-col sm:flex-row items-center sm:space-x-12">
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="text-24 md:text-32 font-extrabold tracking-tight leading-none"
        >
          Time Tracker
        </Typography>
      </div>

      <div className="flex items-center -mx-8">
        <Button
          className="mx-8 whitespace-nowrap"
          variant="contained"
          color="secondary"
          component={NavLinkAdapter}
          to="new/task"
        >
          <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
          <span className="mx-8">Add Task</span>
        </Button>
      </div>
    </div>
  );
}

export default TasksHeader;
