# Public-API-Requests

![alt text](https://doc-0o-1g-docs.googleusercontent.com/docs/securesc/9ndn1886fq72vr8673mj9hlo34t0km3t/61gesorgobbcq9lm56cg6iaobkskbjk2/1558778400000/09065346815347908773/09065346815347908773/1SdnrRIme8h2vXxrED-1_tnL3HeW684iT?e=view&nonce=jmeohk6fesrsq&user=09065346815347908773&hash=p06v3ec02dgi2kmkcs6ep9sjnuf4fvse)

For this project I use the Random User Generator API (https://randomuser.me/) to grab information for 12 random “employees”, and use that data to build a prototype for a fictional Startup employee directory.

I request a JSON object from the API and parse the data so that 12 employees are listed in a grid with their thumbnail image, full name,email, and location.

I used OOP to model the employee information that I needed. The Employee object constructor takes a JSON object as an argument and instantiates using that data.

Clicking an employee’s card opens a modal window with more detailed information, such as the employee’s birthday and address.

For this project I decided to stick to vanilla JavaScript, which I used to work with a public API, making API requests, and asynchronously handling the data that is returned from the requests and is displayed in the app.

Additionally I've made some modifications to the styling of the page:
- The base background color is now a peaceful sky blue.
- Modal buttons have also been changed to this blue color.
- The page header is now white and bold.
- Card text is now slightly bigger.
- Hovering the previous and next buttons on the gallery modal now turns them to a darker color.
