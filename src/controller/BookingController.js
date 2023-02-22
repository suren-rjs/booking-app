class BookingController {
    constructor() {
        if (!BookingController.instance) {
            BookingController.instance = this;
        }
        return BookingController.instance;
    }

    getBookings() {
        let bookings = JSON.parse(localStorage.getItem("bookings")) == null ? [] : JSON.parse(localStorage.getItem("bookings"));
        if (localStorage.getItem("userType") == "Passenger") {
            bookings = bookings.filter((booking) => booking.userId == localStorage.getItem("userId"));
        } else if (localStorage.getItem("dashBoard") == "true") {
            bookings = bookings.filter((booking) => booking.driverId == localStorage.getItem("userId"));
        } else if (localStorage.getItem("allBookings") == "true") {
            console.log();
            bookings = bookings.filter((booking) => booking.driverId == undefined);
        }
        return bookings;
    }

    save(booking) {
        var bookings = this.getBookings();
        bookings.push(booking);
        try {
            if (booking.id == null) booking.id = this.generateId();
        } catch (error) {
            console.log(error);
        }
        const serializedBooking = JSON.stringify(bookings);
        localStorage.setItem("bookings", serializedBooking);
    }

    findById(id) {
        let bookings = this.getBookings().filter((booking) => booking.id == id);
        try {
            return bookings[0];
        } catch (error) {
            return undefined;
        }
    }

    removeBookingById(id) {
        var bookings = this.getBookings().filter(booking => booking.id !== id);
        const serializedBooking = JSON.stringify(bookings);
        localStorage.setItem("bookings", serializedBooking);
    }

    updateById(id, price) {
        let booking = this.findById(id);
        this.removeBookingById(booking.id);
        booking.price = price;
        booking.isConfirmed = true;
        booking.driverId = localStorage.getItem("userId");
        this.save(booking);
    }


    generateId() {
        const randomNumber = Math.floor(Math.random() * 10000);
        const timestamp = new Date().getTime();
        const userId = `${timestamp}-${randomNumber}`;
        return userId;
    }

}

export default new BookingController();