import React from "react";

export const CenteredAuthPage = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    {children}
  </div>
); 