function Car() {
    this.slots = [];
    this.parking = [];
    
    this.createParkingLot = (capacity) => {
        if (typeof capacity === 'undefined') { // If capacity not provided
            return 'Capacity is required';
        }

        const cap = parseInt(capacity); // Parse to integer
        if (isNaN(cap)) {
            return 'Capacity must be in number format';
        }

        this.slots = Array.from(Array(cap), (_, i) => i + 1); // Creating slots
        return `Created parking lot with ${cap} slots`;
    }

    this.parkCar = (carNumber) => {
        if (this.slots.length === 0) { // If slots not allocated
            return 'Unable to park a car. Make sure parking is alloted?';
        }

        const parkedSlot = this.parking.filter((item) => item != null).map(i => i.slotNumber); // Get how many cars parked already in parking

        // If parking full
        if (parkedSlot.length === this.slots.length) {
            return 'Sorry, parking lot is full';
        }
        
        // Filter to check duplicate car entry
        const checkCar = this.parking.filter(item => item != null && item.carNumber == carNumber).length;
        if (checkCar) {
            return `Duplicate entry for parked car ${carNumber}.`;
        }

        const availableSlots = this.slots.filter(s => !parkedSlot.includes(s)); // Find available slots
        const slotNumber = availableSlots[0]; // Slot number

        // Park a car
        this.parking.push({carNumber, slotNumber});
        return `Allocated slot number: ${slotNumber}`;
    }

    this.leaveCar = (carNumber, totalHours) => {
        const hours = parseInt(totalHours); // Parse to integer
        if (isNaN(hours)) {
            return 'Hours must be in number format';
        }

        // Checking and fetching car details from parking allocation
        const carEntry = this.parking.filter(item => item != null && item.carNumber === carNumber);
        if (carEntry.length === 0) {
            return `Registration number ${carNumber} not found`;
        }

        // Charges
        const charges = Math.round(hours > 4 ? hours * 8.33 : hours * 7.5);
        
        this.parking = this.parking.filter(item => item != null && item.carNumber != carNumber); // Remove car
        return `Registration number ${carNumber} with Slot Number ${carEntry[0].slotNumber} is free with Charge ${charges}`;
    }

    this.status = () => {
        // Sorting cars by slot number
        this.parking.sort((a, b) => {
            return a.slotNumber > b.slotNumber ? 1 : -1;
        });

        let msg = 'Slot No.\tRegistration No.\n';

        this.parking.forEach(item => {
            msg = `${msg}${item.slotNumber}\t\t${item.carNumber}\n`;
        });

        return msg;
    }
}

module.exports = Car;