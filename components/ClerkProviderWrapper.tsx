"use client"
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

const ClerkProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default ClerkProviderWrapper;
