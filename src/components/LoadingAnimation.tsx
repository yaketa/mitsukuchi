import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <svg className="w-24 h-8" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="15" fill="#4B5563">
          <animate attributeName="r" from="15" to="15"
                   begin="0s" dur="0.8s"
                   values="15;9;15" calcMode="linear"
                   repeatCount="indefinite" />
          <animate attributeName="fill-opacity" from="1" to="1"
                   begin="0s" dur="0.8s"
                   values="1;.5;1" calcMode="linear"
                   repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="15" r="9" fillOpacity="0.3" fill="#4B5563">
          <animate attributeName="r" from="9" to="9"
                   begin="0s" dur="0.8s"
                   values="9;15;9" calcMode="linear"
                   repeatCount="indefinite" />
          <animate attributeName="fill-opacity" from="0.5" to="0.5"
                   begin="0s" dur="0.8s"
                   values=".5;1;.5" calcMode="linear"
                   repeatCount="indefinite" />
        </circle>
        <circle cx="105" cy="15" r="15" fill="#4B5563">
          <animate attributeName="r" from="15" to="15"
                   begin="0s" dur="0.8s"
                   values="15;9;15" calcMode="linear"
                   repeatCount="indefinite" />
          <animate attributeName="fill-opacity" from="1" to="1"
                   begin="0s" dur="0.8s"
                   values="1;.5;1" calcMode="linear"
                   repeatCount="indefinite" />
        </circle>
      </svg>
      <div className="mt-4 overflow-hidden">
        <p className="text-gray-600 font-semibold animate-reveal">
          口コミを生成中...
        </p>
      </div>
    </div>
  );
};

export default LoadingAnimation;