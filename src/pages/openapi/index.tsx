import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";

function OpenApiPage() {
  return (
    <ApiReferenceReact
      configuration={{
        spec: {
          url: "/docs/openapi/openapi.yaml",
        },
      }}
    />
  );
}

export default OpenApiPage;
