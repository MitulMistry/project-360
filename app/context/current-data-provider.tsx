"use client";

import type { OrganizationWithOwner } from "@/typings/organization.types";
import { createContext, ReactNode, useState } from "react";

// Use this component to share global data with the child components,
// such as the current organization.

// Define an interface for context
interface CurrentData {
  currentOrganization: null | OrganizationWithOwner;
  setCurrentOrganization: (org: null | OrganizationWithOwner) => void;
}

// Use the interface in createContext (TS for default, which won't be used)
export const CurrentDataContext = createContext<CurrentData>({
  currentOrganization: null,
  setCurrentOrganization: () => {},
});

export function CurrentDataProvider({ children }: { children: ReactNode }) {
  const [currentOrganization, setCurrentOrganization] =
    useState<null | OrganizationWithOwner>(null);

  return (
    <CurrentDataContext.Provider
      value={{ currentOrganization, setCurrentOrganization }}
    >
      {children}
    </CurrentDataContext.Provider>
  );
}
