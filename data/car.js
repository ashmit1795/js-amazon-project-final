class Car{
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;

    constructor(carDetails){
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
    }

    displayInfo(){
        console.log(`${this.#brand} ${this.#model}, Speed:  ${this.speed} km/h, Trunk: ${this.isTrunkOpen ? 'Open' : 'Closed'}`);
    }

    go(){
        if (this.speed <= 200 && this.isTrunkOpen === false) {
            this.speed += 5;
        }

        if (this.speed > 200) {
            this.speed = 200;
        }
    }

    brake(){
        if (this.speed >= 0) {
            this.speed -= 5;
        }

        if (this.speed < 0) {
            this.speed = 0;
        }
    }

    openTrunk(){
        if (this.speed === 0) {
            this.isTrunkOpen = true;
        } else {
            this.isTrunkOpen = false;
        }
    }

    closeTrunk(){
        this.isTrunkOpen = false;
    }

}

class RaceCar extends Car{
    acceleration;

    constructor(carDetails){
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

    go(){
        if (this.speed <= 300) {
            this.speed += this.acceleration;
        }

        if (this.speed > 300) {
            this.speed = 300;
        }
    }

    openTrunk() {
        console.log('Race cars do not have a trunk.');
    }
    
    closeTrunk() {
        console.log('Race cars do not have a trunk.');
    }
}

const car1 = new Car({brand : 'Toyota', model : 'Corolla'});
const car2 = new Car({brand : 'Tesla', model : 'Model 3'});
const raceCar = new RaceCar({brand: 'McLaren', model: 'F1', acceleration: 20})

car1.go();
car1.go();
car1.brake();
car1.openTrunk();
car1.brake();
car1.openTrunk();
car1.closeTrunk();
car2.openTrunk();
car2.go();
car2.closeTrunk();
car2.go();
car2.go();
car2.go();
car2.openTrunk();
car2.brake();
car2.brake();
car2.brake();
car2.openTrunk();


car1.displayInfo();
car2.displayInfo();

raceCar.openTrunk();
raceCar.go();
raceCar.go();
raceCar.brake();
raceCar.go();
raceCar.go();

raceCar.displayInfo();
