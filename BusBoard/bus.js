class Bus {
    constructor(routeName, stationName, destination, timeToStation) {
        this.routeName = routeName;
        this.stationName = stationName;
        this.destination = destination;
        this.timeToStation = timeToStation;
    }
}

module.exports = Bus;