import React from "react";
import { useGetAllConfigurationQuery } from "../../../../services";
import OverlayLoader from "../../../../UI-KIT/components/OverlayLoader";
import Category from "./molecules/Category";

const ConfigProfil = () => {
  const { data: allConfiguration, isLoading } = useGetAllConfigurationQuery();
  console.log(allConfiguration);
  if (isLoading) return <OverlayLoader />;
  return (
    <div>
      {Object.values(allConfiguration!).map((elm, index) => (
        <Category key={elm.name + index} {...elm} />
      ))}
    </div>
  );
};

export default ConfigProfil;
