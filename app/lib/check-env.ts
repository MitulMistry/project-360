export const checkIfVercelPreview = () => {
  return process.env.VERCEL_ENV === "preview";
};

export const checkIfCypress = () => {
  return process.env.CYPRESS_ENV === "true";
};
