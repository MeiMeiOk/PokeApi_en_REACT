export default function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return (
    <div className="modal show" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-content">
        <span className="close" onClick={onClose} role="button" tabIndex="0">&times;</span>
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </div>
  );
}
