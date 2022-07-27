export const generateId = () => {
  return Math.random().toString(16).slice(2) + new Date().getTime().toString()
}