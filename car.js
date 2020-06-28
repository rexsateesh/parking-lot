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

        this.slots = Array.from(Array(cap), (_, i) => i + 1);
        return `Created parking lot with ${cap} slots`;
    }

    this.parkCar = (carNumber) => {
        if (this.slots.length === 0) {
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
}

module.exports = Car;