
const layoutStyle = {
  color: 'white',
  background: 'red',
  padding: 16,
};

export default function Error(props) {
  return (
    <div style={layoutStyle}>
      <div style={{ marginBottom: 8 }}>Oopsie poopsie... :-(</div>
      <div>{props.message}</div>
    </div>
  );
}
