import https from "https";

//code to make request to render.com (keep server from spinning down)
export const makeRequest = () => {
  // ping home page
  const url = "https://careercompass-0z1a.onrender.com/";

  try {
    https
      .get(url, (response) => {
        let data = "";

        // event listener for data event. Appends each chunk of recieved data to data variable
        response.on("data", (chunk) => {
          data += chunk;
        });

        //Event listener for 'end' event, indicates entire response has been received.
        response.on("end", () => {
          console.log("Request successful!");
        });
      })
      //error event listener. msg logged if error occurs during request
      .on("error", (error) => {
        console.error("Error making request:", error.message);
      });
  } catch (error) {
    console.error("Caught an exception:", error.message);
  }
};
