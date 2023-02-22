<template>
    <div class="overlay">
        <div class="overlay__content">
            <div class="popup">
                <button class="close-button" @click="close">X</button>

                <div class="form-container">
                    <form @submit.prevent="newBooking">
                        <div class="form-group">
                            <label for="from">From:</label>
                            <input type="text" id="from" name="from" v-model="from" required>
                        </div>
                        <div class="form-group">
                            <label for="to">To:</label>
                            <input type="text" id="to" name="to" v-model="to" required>
                        </div>
                        <div class="form-group">
                            <label for="datetime">Date and Time:</label>
                            <input type="datetime-local" id="datetime" name="datetime" :min="minDate" v-model="date"
                                required>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BookingController from "../controller/BookingController"

export default {
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

input[type="text"],
input[type="datetime-local"] {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
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
