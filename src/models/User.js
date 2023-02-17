class User {
    id;
    name;
    contact;
    address;
    password;
    businessAccount;

    constructor(id, name, contact, address, password, businessAccount) {
        this.id = id;
        this.name = name;
        this.contact = contact;
        this.address = address;
        this.password = password;
        this.businessAccount = businessAccount;
    }
}

class Name {
    firstName;
    lastName;
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

class Contact {
    email;
    phone;
    constructor(email, phone) {
        this.email = email;
        this.phone = phone;
    }
}

class Address {
    state;
    country;
    city;
    street;
    houseNumber;
    zipCode;
    constructor(state, country, city, street, houseNumber, zipCode) {
        this.state = state;
        this.country = country;
        this.city = city;
        this.street = street;
        this.houseNumber = houseNumber;
        this.zipCode = zipCode;
    }
}

export { User, Address, Contact, Name };