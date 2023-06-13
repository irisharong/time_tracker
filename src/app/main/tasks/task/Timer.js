
export default function Timer(props) {
  return (
    <div className="px-8">
      <span className="digits">
        {`0${Math.floor(props.time / 1000 / 60 / 60) % 24}`.slice(-2)}:
      </span>
      <span className="digits">{`0${Math.floor((props.time / 60000) % 60)}`.slice(-2)}:</span>
      <span className="digits">{`0${Math.floor((props.time / 1000) % 60)}`.slice(-2)}</span>
    </div>
  );
}
