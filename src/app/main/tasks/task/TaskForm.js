import Button from '@mui/material/Button';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import _ from '@lodash';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import Box from '@mui/system/Box';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import IconButton from '@mui/material/IconButton';
import { useDeepCompareEffect } from '@fuse/hooks';
import TaskPrioritySelector from './TaskPrioritySelector';
import FormActionsMenu from './FormActionsMenu';
import { addTask, getTask, newTask, selectTask, updateTask } from '../store/taskSlice';
import { selectTags } from '../store/tagsSlice';
import ProjectDropdown from './ProjectDropdown';
import TaskInput from './TaskInput';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  task: yup.string().required('You must enter a task'),
});

function TaskForm(props) {
  const task = useSelector(selectTask);
  const tags = useSelector(selectTags);
  const routeParams = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const form = watch();

  /**
   * Update Task
   */
  useDeepCompareEffect(() => {
    if (!isValid || _.isEmpty(form) || !task || routeParams.id === 'new') {
      return;
    }

    if (!_.isEqual(task, form)) {
      onSubmit(form);
    }
  }, [form, isValid]);

  useEffect(() => {
    if (routeParams.id === 'new') {
      dispatch(newTask(routeParams.type));
    } else {
      dispatch(getTask(routeParams.id));
    }
  }, [dispatch, routeParams]);

  useEffect(() => {
    reset({ ...task });
  }, [task, reset]);

  /**
   * Form Submit
   */
  function onSubmit(data) {
    dispatch(updateTask(data));
  }

  function onSubmitNew(data) {
    dispatch(addTask(data)).then(({ payload }) => {
      navigate(`/tasks/${payload.id}`);
    });
  }

  if (_.isEmpty(form) || !task) {
    return <FuseLoading />;
  }

  return (
    <>
      <div className="relative flex flex-col flex-auto items-center px-24 sm:px-48">
        <div className="flex items-center justify-between border-b-1 w-full py-24 mt-16 mb-32">
          <div className="flex items-center justify-end">
            {routeParams.id !== 'new' && <FormActionsMenu taskId={task.id} />}
            <IconButton className="" component={NavLinkAdapter} to="/tasks" size="large">
              <FuseSvgIcon>heroicons-outline:x</FuseSvgIcon>
            </IconButton>
          </div>
        </div>

        <Controller control={control} name="task" render={({ field }) => <TaskInput />} />

        <Controller
          control={control}
          name="tags"
          render={({ field: { onChange, value } }) => <ProjectDropdown />}
        />
        <div className="flex w-full space-x-16 mt-32 mb-16 items-center">
          <Controller
            control={control}
            name="startTime"
            render={({ field: { value, onChange } }) => (
              <DateTimePicker
                className="w-full"
                value={new Date(value)}
                onChange={onChange}
                clearable
                slotProps={{
                  textField: {
                    id: 'due-date',
                    label: 'Start date/time',
                    InputLabelProps: {
                      shrink: true,
                    },
                    fullWidth: true,
                  },
                  actionBar: {
                    actions: ['clear', 'today'],
                  },
                }}
              />
            )}
          />
        </div>
      </div>
      {routeParams.id === 'new' && (
        <Box
          className="flex items-center mt-40 py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t"
          sx={{ backgroundColor: 'background.default' }}
        >
          <Button className="ml-auto" component={NavLinkAdapter} to={-1}>
            Cancel
          </Button>
          <Button
            className="ml-8"
            variant="contained"
            color="secondary"
            disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleSubmit(onSubmitNew)}
          >
            Create
          </Button>
        </Box>
      )}
    </>
  );
}

export default TaskForm;
