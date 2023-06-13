import TextField from '@mui/material/TextField';

export default function TaskInput() {
  return (
    <TextField
      className="mr-32"
      id="task-entry"
      label="What are you doing?"
      variant="standard"
      sx={{ width: 300 }}
    />
  );
}
