// ./app/(site)/login-page/page.tsx
import React from "react";

const Login: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 items-center justify-center text-center bg-gray-200">
        <div className="text-4xl font-bold">Left</div>
      </div>
      <div className="flex-1 items-center justify-center text-center bg-gray-300">
        <div className="text-4xl font-bold">Right</div>
      </div>
    </div>
  );
};

export default Login;
