import { useAxiosLoader } from "../hooks/useAxiosLoader";

//export default Loader = () => {
export default function Loader() {
  const [loading] = useAxiosLoader();
  
  return (
    <div>
      { loading && (
          <div class="loading">
            <div class="loader"></div>
          </div>
        )
      }
    </div>
  );
};
