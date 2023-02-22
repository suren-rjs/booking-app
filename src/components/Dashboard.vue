<template>
    <div class="table-container">
        <div class="search-box" v-if="isDriver">
            <input type="text" v-model="searchQuery" placeholder="Current Location...">
            <button @click="search">Search</button>
        </div>
        <div v-else>
            <button @click="toggleNewBooking" class="table-button">New Booking</button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th class="table-header">Pickup location</th>
                    <th class="table-header">Drop Location</th>
                    <th class="table-header">Date</th>
                    <th class="table-header">Price</th>
                    <th class="table-header">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in filteredItems" :key="item.id">
                    <td class="table-cell">{{ item.from }}</td>
                    <td class="table-cell">{{ item.to }}</td>
                    <td class="table-cell">{{ item.date }} </td>
                    <td class="table-cell">
                        <input type="number" min="1" :max="item.inStock" v-model.number="item.quantity" v-model="item.price"
                            class="table-input" :disabled="!isDriver || isDashboard" />
                    </td>
                    <td v-if="isDriver" class="table-cell">
                        <button @click="updateBookingInfo(index)" :disabled="isDashboard"
                            v-bind:class="isDashboard ? 'btn-disabled' : ''" class=" table-button">Confirm</button>
                    </td>
                    <td v-else>
                        <button @click="viewInvoice(index)" class="table-button"
                            v-bind:class="typeof item.price == 'undefined' ? 'btn-disabled' : ''"
                            :disabled="typeof item.price == 'undefined'">View
                            Invoice</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <NewBooking v-if="isNewBooking" @close="toggleNewBooking" />
        <Invoice v-if="showInvoice" @close="viewInvoice" :bookingData=this.invoiceData />
    </div>
</template>

<script>
import BookingController from "../controller/BookingController";
import NewBooking from "./NewBooking.vue";
import Invoice from "./Invoice.vue";
export default {
    beforeMount() {
        if (localStorage.getItem("auth") != "true") {
            this.$router.push("/");
        }
    },
    components: { NewBooking, Invoice },
    data() {
        return {
            bookingItems: BookingController.getBookings(),
            searchQuery: '',
            isDriver: localStorage.getItem("userType") != "Passenger",
            isNewBooking: false,
            showInvoice: false,
            invoiceData: {},
            isDashboard: localStorage.getItem("dashBoard") == 'true',
        };
    },
    computed: {
        filteredItems() {
            if (this.searchQuery != "") {
                return this.bookingItems.filter(booking => booking.from.toLowerCase().includes(this.searchQuery.toLowerCase()));
            } else {
                return this.bookingItems;
            }
        }
    },
    methods: {
        updateBookingInfo(index) {
            let booking = this.bookingItems[index];
            BookingController.updateById(booking.id, booking.price);
            this.bookingItems = BookingController.getBookings();
        },
        viewInvoice(index) {
            this.showInvoice = !this.showInvoice;
            this.invoiceData = this.bookingItems[index];
        },
        toggleNewBooking() {
            this.isNewBooking = !this.isNewBooking;
            this.bookingItems = BookingController.getBookings();
        },
        search() {
            // Perform search
        },
    },
};
</script>

<style>
.table-container {
    max-width: 1200px;
    margin: 0 auto;
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    margin-bottom: 20px;
}

.table-header {
    background-color: #007bff;
    color: #fff;
    text-align: left;
    padding: 10px;
}

.table-cell {
    border: 1px solid #ddd;
    padding: 10px;
}

.table-badge {
    display: inline-block;
    padding: 5px 10px;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 20px;
    color: #fff;
    text-align: center;
}

.in-stock {
    background-color: #28a745;
}

.out-of-stock {
    background-color: #dc3545;
}

.table>:not(caption)>*>* {
    color: black;
    padding: 0.5rem 0.5rem;
    text-align: center;
    background-color: var(--bs-table-bg);
    border-bottom-width: 1px;
    box-shadow: inset 0 0 0 9999px var(--bs-table-accent-bg);
}

.table-input {
    width: 111px;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 3px;
    text-align: center;
}

.table-button {
    background-color: #007bff;
    color: #fff;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

.search-box {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.search-box__input {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    font-size: 16px;
    margin-right: 8px;
    width: 300px;
}

.search-box__button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px;
    font-size: 16px;
    cursor: pointer;
}

.search-box__button:hover {
    background-color: #0062cc;
}

.btn-disabled {
    color: #696969;
    background-color: #ccc;
}
</style>
