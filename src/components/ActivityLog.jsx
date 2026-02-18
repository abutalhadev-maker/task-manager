export default function ActivityLog({ logs }) {
  return (
    <div>
      <h3>Activity</h3>
      {logs.map((l, i) => (
        <p key={i}>{l}</p>
      ))}
    </div>
  );
}
