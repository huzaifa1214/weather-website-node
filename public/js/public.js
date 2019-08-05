const form = document.querySelector("#mainForm");
const address = document.querySelector("#inputW");
const loc = document.querySelector("#location");
const forecast = document.querySelector("#forecast");
const error = document.querySelector("#error");

form.addEventListener("submit", e => {
  e.preventDefault();
  loc.textContent="Loading..."
  forecast.textContent=""
  const value = address.value;
  fetch("/weather?address=" + value).then(response => {
    if (!response.ok) {
      console.log("Something went wrong Try Again!");
    } else {
      response.json().then(data => {
        
        if (data.error) {
            loc.textContent = data.error;
            forecast.textContent ='';
        } else {
          loc.textContent = data.location;
          forecast.textContent = data.forecast;
        }
      });
    }
  });
});
