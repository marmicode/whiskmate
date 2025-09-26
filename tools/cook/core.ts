export interface Config {
  base: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  implementationFiles?: string[];
}
