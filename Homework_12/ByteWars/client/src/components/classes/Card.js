class Card {
  constructor(name, side) {
    this.name = name;
    this.side = side;
    this.powerAttack = this.generatePowerAttack();
    this.speedAttack = this.generateSpeedAttack();
    this.luck = this.generateLuck();
  }

  generatePowerAttack() {
    if (this.side === 'human') {
      switch (this.name) {
        case 'Warrior': return 25;
        case 'Nerd': return 10;
        case 'Granny': return 5;
        case 'CEO': return 20;
        case 'Librarian': return 15;
        case 'Athlete': return 18;
        case 'Scientist': return 12;
        case 'Doctor': return 14;
        default: return 10;
      }
    } else if (this.side === 'robot') {
      switch (this.name) {
        case 'RoboCap': return 28;
        case 'Wally': return 15;
        case 'Fax Machine': return 12;
        case 'Tesla': return 25;
        case 'Flip Phone': return 10;
        case 'Internet Explorer': return 8;
        case 'Smartphone': return 18;
        case 'AI Assistant': return 22;
        default: return 10;
      }
    }
    return 10;
  }

  generateSpeedAttack() {
    if (this.side === 'human') {
      switch (this.name) {
        case 'Warrior': return 8;
        case 'Nerd': return 12;
        case 'Granny': return 3;
        case 'CEO': return 7;
        case 'Librarian': return 10;
        case 'Athlete': return 9;
        case 'Scientist': return 8;
        case 'Doctor': return 7;
        default: return 5;
      }
    } else if (this.side === 'robot') {
      switch (this.name) {
        case 'RoboCap': return 10;
        case 'Wally': return 12;
        case 'Fax Machine': return 5;
        case 'Tesla': return 9;
        case 'Flip Phone': return 3;
        case 'Internet Explorer': return 2;
        case 'Smartphone': return 12;
        case 'AI Assistant': return 11;
        default: return 5;
      }
    }
    return 5;
  }

  generateLuck() {
    if (this.side === 'human') {
      switch (this.name) {
        case 'Warrior': return 5;
        case 'Nerd': return 7;
        case 'Granny': return 6;
        case 'CEO': return 8;
        case 'Librarian': return 4;
        case 'Athlete': return 5;
        case 'Scientist': return 6;
        case 'Doctor': return 7;
        default: return 5;
      }
    } else if (this.side === 'robot') {
      switch (this.name) {
        case 'RoboCap': return 6;
        case 'Wally': return 8;
        case 'Fax Machine': return 4;
        case 'Tesla': return 5;
        case 'Flip Phone': return 3;
        case 'Internet Explorer': return 2;
        case 'Smartphone': return 7;
        case 'AI Assistant': return 6;
        default: return 4;
      }
    }
    return 2;
  }
}

export default Card;
