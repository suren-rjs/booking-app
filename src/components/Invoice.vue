<template>
    <div class="overlay">
        <div class="overlay__content">
            <div class="popup">
                <button class="close-button" @click="close">X</button>

                <div class="form-container">
                    <h3>Receipt</h3>
                    <form @submit.prevent="newBooking">
                        <div class="form-group">
                            <label for="from">From: {{ bookingData.from }}</label>
                            <label for="to">To: {{ bookingData.to }}</label>
                            <label for="datetime">Date and Time: {{ bookingData.date }}</label>
                            <label for="datetime">Price: {{ bookingData.price }}</label>
                            <label for="datetime">Driver Id: {{ bookingData.driverId }}</label>
                        </div>
                        <button type="submit">Close</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BookingController from "../controller/BookingController"

export default {
    props: {
        bookingData: {
            type: Object
        }
    },
    data() {
        return {
            showPopup: false,
            minDate: new Date().toISOString().slice(0, 16),
            from: "",
            to: "",
            date: null,
        };

    },
    methods: {
        newBooking() {
            let booking = { userId: localStorage.getItem("userId"), from: this.from, to: this.to, date: this.date }
            BookingController.save(booking);
            this.showPopup = false;
            this.from = "";
            this.to = "";
            this.date = null;
            this.close();
        },
        close() {
            this.$emit("close");
        }
    }
};
</script>

<style>
form-container {
    display: -webkit-box;
    display: -ms-flexbox;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 2px solid #ccc;
    border-radius: 10px;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
}

button[type="submit"] {
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
}

.popup {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
}

.close-button {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 20px;
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.overlay__content {
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
}
</style>
