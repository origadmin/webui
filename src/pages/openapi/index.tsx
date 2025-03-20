import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";

function OpenApiPage() {
  // const [spec, setSpec] = useState({ ...ScalarGalaxy });
  //
  // useEffect(() => {
  //   // Update the spec periodically to test reactivity
  //   const changeInt = setInterval(() => {
  //     setSpec({
  //       ...ScalarGalaxy,
  //       info: {
  //         ...ScalarGalaxy.info,
  //         title: "Scalar Galaxy",
  //       },
  //     });
  //   }, 2000);
  //
  //   return () => clearInterval(changeInt);
  // }, []); // Empty dependency array ensures the effect runs only once

  return (
    <ApiReferenceReact
      configuration={{
        spec: {
          // content: spec,
          url: "/docs/openapi/openapi.yaml",
        },
      }}
    />
  );
}

export default OpenApiPage;
