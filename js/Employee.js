class Employee {
    constructor(json) {
        this.id = Math.floor(Math.random() * 100) + json.name.first;
        this.name = `${json.name.first} ${json.name.last}`;
        this.email = json.email;
        this.city = json.location.city;
        this.state = json.location.state
        this.cell = json.cell;
        this.location = `${json.location.street}, ${this.city}, ${this.state} ${json.location.postcode}`;
        
        const birthdayRegex = /^[^T]*/;
        const originalBirthday = json.dob.date;
        this.birthday = originalBirthday.match(birthdayRegex)[0];
        this.picture = json.picture;
    }
}   