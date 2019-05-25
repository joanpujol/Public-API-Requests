class Employee {
    // Takes a JSON object as an argument and instantiates an Employee using that data.
    constructor(json) {
        // Asigns a unique id to each employee instance
        this.id = "#" + Math.floor(Math.random() * 100) + json.name.first;
        this.name = `${json.name.first} ${json.name.last}`;
        this.email = json.email;
        this.city = json.location.city;
        this.state = json.location.state
        this.location = `${json.location.street}, ${this.city}, ${this.state} ${json.location.postcode}`;
        this.cell = json.cell;
        
        // This part cuts the json's object dob property (date of birth) to just get the date, not the time
        const birthdayRegex = /^[^T]*/;
        const originalBirthday = json.dob.date;
        this.birthday = originalBirthday.match(birthdayRegex)[0];

        this.picture = json.picture;
    }
}
