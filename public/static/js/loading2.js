/**
 * loading
 */
(function () {
  const _root = document.querySelector("#root");
  if (_root && _root.innerHTML === "") {
    _root.innerHTML = `
      <style>
        html,
        body {
          margin: 0;
          padding: 0;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
          font-family: 'Arial', sans-serif;
        }
        #root {
          height: 100%;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        .loading-container {
          text-align: center;
        }
        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
        }
        .dot {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: inline-block;
          animation: slide 1.5s infinite;
          margin: 0 5px;
        }
        .dot:nth-child(1) {
          background: #ff6b6b;
          animation-delay: 0.1s;
        }
        .dot:nth-child(2) {
          background: #f6d365;
          animation-delay: 0.2s;
        }
        .dot:nth-child(3) {
          background: #48dbfb;
          animation-delay: 0.3s;
        }
        .dot:nth-child(4) {
          background: #ff9ff3;
          animation-delay: 0.4s;
        }
        .dot:nth-child(5) {
          background: #6c5ce7;
          animation-delay: 0.5s;
        }
        @keyframes slide {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.3;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .loading-title {
          font-size: 24px;
          color: #333;
          margin-bottom: 10px;
          font-weight: bold;
        }
        .loading-sub-title {
          font-size: 16px;
          color: #666;
        }
      </style>

      <div class="loading-container">
        <div class="loading-spinner">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <div class="loading-title">
          Loading resources...
        </div>
        <div class="loading-sub-title">
          Please be patient as it may take some time to load resources for the first time.
        </div>
      </div>
    `;
  }
})();
