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
}

module.exports = Car;