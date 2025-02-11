import { useEffect } from "react";

const Contact = () => {
  const url: string | undefined = import.meta.env.VITE_SERVER;

  const fetchData = async () => {
    if (!url) {
      console.error("VITE_SERVER is not defined.");
      return;
    }

    try {
      // console.log("fetching from", url);
      const response = await fetch(`${url}/api`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching the data.", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return <div>Here goes the "Contáctanos" section.</div>;
};

export default Contact;
