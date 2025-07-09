export default function Notification({ message, type = 'error', onClose }) {
    return (
        <div className={`notification ${type}`}>
            <span>{message}</span>
            <button onClick={onClose}>✖</button>
        </div>
    );
}
