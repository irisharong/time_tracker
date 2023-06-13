import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ProjectDropdown() {
  return (
    <Autocomplete
      disablePortal
      id="project-dropdown"
      options={projects}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField variant="standard" {...params} label="Project" />}
    />
  );
}

const projects = [
  { label: 'Frontend UX', year: 1994 },
  { label: 'Backend API', year: 1972 },
  { label: 'Bug Fixes', year: 1974 },
  { label: 'Frontend UI', year: 2008 },
];
