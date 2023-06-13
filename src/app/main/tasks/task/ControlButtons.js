import Button from '@mui/base/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';

export default function ControlButtons(props) {
  const StartButton = (
    <Button className="px-8" onClick={props.handleStart}>
      <FuseSvgIcon className="text-48" size={24} color="action">
        material-solid:play_arrow
      </FuseSvgIcon>
    </Button>
  );
  const ActiveButtons = (
    <div className="flex flex-row justify-between px-16">
      <Button className="px-4" onClick={props.handlePauseResume}>
        {props.isPaused ? (
          <FuseSvgIcon className="text-48" size={24} color="action">
            material-solid:play_arrow
          </FuseSvgIcon>
        ) : (
          <FuseSvgIcon className="text-48" size={24} color="action">
            material-solid:pause
          </FuseSvgIcon>
        )}
      </Button>
      <Button className="px-4" onClick={props.handleReset}>
        <FuseSvgIcon className="text-48" size={24} color="action">
          material-solid:stop
        </FuseSvgIcon>
      </Button>
    </div>
  );

  return (
    <div className="Control-Buttons">
      <div>{props.active ? ActiveButtons : StartButton}</div>
    </div>
  );
}
