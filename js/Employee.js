class Employee {
    // Given employee data in json format, it create an Employee instance
    constructor(json) {
        // Asigns a unique id to each employee instance
        this.id = "#" + Math.floor(Math.random() * 100) + json.name.first;
        this.name = `${json.name.first} ${json.name.last}`;
        this.email = json.email;
        this.city = json.location.city;
        this.state = json.location.state
        this.location = `${json.location.street}, ${this.city}, ${this.state} ${json.location.postcode}`;
        this.cell = json.cell;
        
        // Cuts json's dob property to just get the date, not the time
        const birthdayRegex = /^[^T]*/;
        const originalBirthday = json.dob.date;
        this.birthday = originalBirthday.match(birthdayRegex)[0];

        this.picture = json.picture;
    }
}
