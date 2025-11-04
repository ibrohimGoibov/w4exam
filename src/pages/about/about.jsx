import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const AboutById = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const response = await fetch(`https://to-dos-api.softclub.tj/api/to-dos/${id}`);
        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataById();
  }, [id]);

  return (
    <div className="border-[2px] rounded-[20px] bg-black w-[550px] p-[30px] m-auto text-white flex items-center justify-center text-center ">
      <div>
        <h1 className="text-[40px] font-bold">{user?.name}</h1>
        <h2 className="text-[25px] ">ID: {user?.id}</h2>
        <h3>Status: {user?.isCompleted ? "Active" : "Inactive"}</h3>

        {user?.images?.length > 0 && (
          <div>
            <h4>Images:</h4>
            {user.images.map((img) => (
              <div key={img.id} style={{ marginBottom: "10px" }}>
                <img
                  className="mt-[20px] w-[500px] rounded-[1]"
                  src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}
                  alt={user?.name}
                />
              </div>
            ))}
          </div>
        )}
        <Link to={"/"} className="bg-white text-black text-[20px] font-bold px-[20px] py-[10px] rounded-[5px] mt-4">Go back</Link>
      </div>
    </div>
  );
};

export default AboutById;
