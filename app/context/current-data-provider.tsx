"use client";

import { Organization } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

// Use this component to share global data with the child components,
// such as the current organization.

// Define an interface for context
interface CurrentData {
  currentOrganization: null | Organization;
  setCurrentOrganization: (org: null | Organization) => void;
}

// Use the interface in createContext (TS for default, which won't be used)
export const CurrentDataContext = createContext<CurrentData>({
  currentOrganization: null,
  setCurrentOrganization: () => {},
});

export function CurrentDataProvider({ children }: { children: ReactNode }) {
  const [currentOrganization, setCurrentOrganization] =
    useState<null | Organization>(null);

  return (
    <CurrentDataContext.Provider
      value={{ currentOrganization, setCurrentOrganization }}
    >
      {children}
    </CurrentDataContext.Provider>
  );
}
