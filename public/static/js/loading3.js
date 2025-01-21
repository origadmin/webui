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
          position: relative;
          transform: rotate(165deg);
          margin-bottom: 20px;
        }
        .loading-spinner:before, .loading-spinner:after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          display: block;
          width: 0.5em;
          height: 0.5em;
          border-radius: 0.25em;
          transform: translate(-50%, -50%);
        }
        .loading-spinner:before {
          animation: before 2s infinite;
        }
        .loading-spinner:after {
          animation: after 2s infinite;
        }
        @keyframes before {
          0% {
            width: 0.5em;
            box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
          }
          35% {
            width: 2.5em;
            box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75), 0 0.5em rgba(111, 202, 220, 0.75);
          }
          70% {
            width: 0.5em;
            box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75), 1em 0.5em rgba(111, 202, 220, 0.75);
          }
          100% {
            box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
          }
        }
        @keyframes after {
          0% {
            height: 0.5em;
            box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
          }
          35% {
            height: 2.5em;
            box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75), -0.5em 0 rgba(233, 169, 32, 0.75);
          }
          70% {
            height: 0.5em;
            box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75), -0.5em 1em rgba(233, 169, 32, 0.75);
          }
          100% {
            box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
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
