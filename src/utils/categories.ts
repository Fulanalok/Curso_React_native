import { MaterialIcons } from "@expo/vector-icons"; 

type Category = {
  id: string;
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

export const categories: Category[] = [
  { id: "1", name: "projetos", icon: "folder" },
  { id: "2", name: "tarefas", icon: "check-circle" },
  { id: "3", name: "ideias", icon: "lightbulb" },
];  
