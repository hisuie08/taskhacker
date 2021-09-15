export const createUUID = () =>
  Number(new Date().getTime().toString() + ~~(Math.random() * 1000).toString());
export const now = () => new Date().getTime();
export class UserException extends Error {}
export class ProjectException extends Error {}
export class TaskException extends Error {}
