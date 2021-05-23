import { useEffect,useState } from "react";
import axios from "axios";


const MainComponent = () => {

  let [data,setData]=useState([])

    useEffect(() => {
          axios.get("/api/values/all")
            .then(res => {
              setData(res.data)
            }).catch(err => {
              console.log(err)
            });

    }, []);

  return (
    <div>
      {JSON.stringify(data.rows)}
    </div>
  );
};

export default MainComponent;
