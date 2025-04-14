
export interface Module {
  id: string;
  title: string;
  description: string;
  position: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  position: string
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  level: string;
  modules: Module[];
}
