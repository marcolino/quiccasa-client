import { useAxiosLoader } from "../hooks/useAxiosLoader";

//export default Loader = () => {
export default function Loader() {
  const [loading] = useAxiosLoader();
  
  return (
    <div>
      { loading && (
          <div className={"loading"}>
            <div className={"loader"}></div>
          </div>
        )
      }
    </div>
  );
};
