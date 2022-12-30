import React from "react";
import { useGetAllConfigurationQuery } from "../../../../services";
import OverlayLoader from "../../../../UI-KIT/components/OverlayLoader";

import { useForm } from "react-hook-form";

const ConfigProfil = () => {
  const { data: allConfiguration, isLoading } = useGetAllConfigurationQuery();
  const { register, handleSubmit, setValue } = useForm<ConfigProfilForm>({
    defaultValues: {
      configuration: [
        { name: "Mails" },
        { name: "Sécurité téléphone" },
        { name: "Application de discussion" },
        { name: "Navigateur" },
        { name: "Stockage de photo" },
        { name: "Cookies" },
        { name: "Moteur de recherche" },
        { name: "OS" },
      ],
    },
  });
  const onSubmit = (data: ConfigProfilForm) => {
    console.log({ ...data });
  };

  const generateRow = (value: string, index: number, name: string) => {
    return (
      <React.Fragment key={name + value}>
        <label htmlFor={value}>{value}</label>
        <input
          id={value}
          value={value}
          type="radio"
          onClick={() => setValue(`configuration.${index}.name`, name)}
          {...register(`configuration.${index}.value`)}
        />
      </React.Fragment>
    );
  };

  if (isLoading) return <OverlayLoader />;
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.values(allConfiguration!).map((elm: Configuration, index) => (
          <div key={index}>
            {Object.values(elm)
              .slice(1, 5)
              .map(
                (value) =>
                  value && generateRow(value.toString(), index, elm.name)
              )}
          </div>
        ))}
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default ConfigProfil;
