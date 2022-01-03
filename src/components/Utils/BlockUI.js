import './BlockUI.css'

function BlockUi({ message, blocking, children }) {
  return blocking ? (
    <div aria-busy="true" className="block-ui">
      <div tabIndex="0"></div>
      {children}
      <div className="block-ui-container" tabIndex="0">
        <div className="block-ui-overlay"></div>
        <div className="block-ui-message-container">
          <div className="block-ui-message">
            <div className="loading-indicator">
              <span className="loading-bullet">•</span>
              <span className="loading-bullet">•</span>
              <span className="loading-bullet">•</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    children
  )
}

export { BlockUi }

export default BlockUi
