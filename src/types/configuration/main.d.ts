type Configuration = {
  categoryId: number;
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  name: string;
};

type UserConfigurationForm = {
  configuration: {
    name: string;
    value: string;
  }[];
};

type UserConfiguration = {
  category: string;
  nom: string;
  value: string;
};
