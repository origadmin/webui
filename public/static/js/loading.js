/**
 * loading
 */
(function () {
  const _root = document.querySelector("#root");
  if (_root && _root.innerHTML === "") {
    _root.innerHTML = `
      <style>
        html,
        body,
        #root {
          height: 100%;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: Arial, sans-serif;
        }
        .loading-container {
          text-align: center;
          position: relative;
        }
        .loading-spinner {
          position: absolute;
          top: -150%; /* 上移位置 */
          left: 50%;
          transform: translateX(-50%);
          width: 175px;
          height: 100px;
          pointer-events: none; /* 防止动画遮挡文字时影响点击事件 */
        }
        .loading-spinner span {
          display: block;
          background: #007BFF; /* 蓝色主题 */
          width: 7px;
          height: 100%;
          border-radius: 14px;
          margin-right: 5px;
          float: left;
        }
        .loading-spinner span:last-child {
          margin-right: 0px;
        }
        .loading-spinner span:nth-child(1) {
          animation: load 2.5s 1.4s infinite linear;
        }
        .loading-spinner span:nth-child(2) {
          animation: load 2.5s 1.2s infinite linear;
        }
        .loading-spinner span:nth-child(3) {
          animation: load 2.5s 1s infinite linear;
        }
        .loading-spinner span:nth-child(4) {
          animation: load 2.5s 0.8s infinite linear;
        }
        .loading-spinner span:nth-child(5) {
          animation: load 2.5s 0.6s infinite linear;
        }
        .loading-spinner span:nth-child(6) {
          animation: load 2.5s 0.4s infinite linear;
        }
        .loading-spinner span:nth-child(7) {
          animation: load 2.5s 0.2s infinite linear;
        }
        .loading-spinner span:nth-child(8) {
          animation: load 2.5s 0s infinite linear;
        }
        .loading-spinner span:nth-child(9) {
          animation: load 2.5s 0.2s infinite linear;
        }
        .loading-spinner span:nth-child(10) {
          animation: load 2.5s 0.4s infinite linear;
        }
        .loading-spinner span:nth-child(11) {
          animation: load 2.5s 0.6s infinite linear;
        }
        .loading-spinner span:nth-child(12) {
          animation: load 2.5s 0.8s infinite linear;
        }
        .loading-spinner span:nth-child(13) {
          animation: load 2.5s 1s infinite linear;
        }
        .loading-spinner span:nth-child(14) {
          animation: load 2.5s 1.2s infinite linear;
        }
        .loading-spinner span:nth-child(15) {
          animation: load 2.5s 1.4s infinite linear;
        }
        @keyframes load {
          0% {
            background: #0044FF; /* 更深的蓝色 */
            transform: scaleY(0.08);
          }
          50% {
            background: #007BFF; /* 蓝色主题 */
            transform: scaleY(1);
          }
          100% {
            background: #0044FF; /* 更深的蓝色 */
            transform: scaleY(0.08);
          }
        }
        .loading-title {
          font-size: 24px;
          color: #333;
          margin-bottom: 10px;
        }
        .loading-sub-title {
          font-size: 16px;
          color: #666;
        }
        .loading-spacing {
          height: 20px; /* 添加间距 */
        }
      </style>

      <div class="loading-container">
        <div class="loading-spinner">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="loading-spacing"></div>
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
