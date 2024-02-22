// Created class Pokemon
class Pokemon {
    constructor(name, type, description) {
      this.name = name;
      this.type = type;
      this.description = description;
    }
  
    describe() {
      return `${this.name} is a ${this.type} type. '\n' Description: ${this.description}`;
    }
  }
  
  // Created class PokemonTypes
  class PokemonTypes {
    constructor(name) {
      this.name = name;
      this.description = "";
      this.pokemons = [];
    }
  
    // Created addPokemon method
    addPokemon(pokemon) {
      if (pokemon instanceof Pokemon) {
        this.pokemons.push(pokemon);
      } else {
        throw new Error(
          `You can only add an instance of Pokemon. Argument is not a pokemon: ${pokemon}`
        );
      }
    }
  
    describe() {
      return `${this.name} has ${this.pokemons.length} Pokemon.`;
    }
  }
  
  // Created class Menu
  class Menu {
    constructor() {
      this.types = [];
      this.selectedType = null;
    }
  
    // Created start method
    start() {
      let selection = this.showMainMenuOptions();
      while (selection != 0) {
        switch (selection) {
          case "1":
            this.createType();
            break;
          case "2":
            this.viewType();
            break;
          case "3":
            this.deleteType();
            break;
          case "4":
            this.displayTypes();
            break;
          default:
            selection = 0;
        }
        selection = this.showMainMenuOptions();
      }
      alert("Thank you, Goodbye!");
    }
  
    // Created showMainMenuOptions method
    showMainMenuOptions() {
      return prompt(`
              0) exit
              1) create a new Trainer
              2) view a Trainer
              3) delete a Trainer
              4) display all Trainers
          `);
    }
  
    // Created showTypeMenuOptions method
    showTypeMenuOptions(typeInfo) {
      return prompt(`
              0) back
              1) add a new Pokemon
              2) delete a Pokemon
              -----------------
              ${typeInfo}
          `);
    }
  
    // Created displayTypes method
    displayTypes() {
      let typeString = "";
      for (let i = 0; i < this.types.length; i++) {
        typeString += i + ") " + this.types[i].name + "\n";
      }
      alert(typeString);
    }
  
    // Created createType method
    createType() {
      let name = prompt("Enter name for new Trainer: ");
      this.types.push(new PokemonTypes(name));
    }
  
    // Created viewType method
    viewType() {
      let index = prompt("Enter the index of the Trainer that you want to view:");
      if (index > -1 && index < this.types.length) {
        this.selectedType = this.types[index];
        let description = "Trainer Name: " + this.selectedType.name + "\n";
        description += " " + this.selectedType.describe() + "\n ";
        for (let i = 0; i < this.selectedType.pokemons.length; i++) {
          description +=
            i + ") " + this.selectedType.pokemons[i].describe() + "\n";
        }
        let selection = this.showTypeMenuOptions(description);
        switch (selection) {
          case "1":
            this.createPokemon();
            break;
          case "2":
            this.deletePokemon();
        }
      }
    }
  
    // Created deleteType method
    deleteType() {
      let index = prompt("Enter the index of the type that you wish to delete: ");
      if (index > -1 && index < this.types.length) {
        this.types.splice(index, 1);
      }
    }
  
    // Created createPokemon method
    createPokemon() {
      let name = prompt("Enter name for new pokemon: ");
      let type = prompt("Enter type for new pokemon: ");
      let validTypes = [
        "Fire",
        "Water",
        "Grass",
        "Electric",
        "Psychic",
        "Normal",
      ]; // Add or remove types as needed
      if (!validTypes.includes(type)) {
        alert("Invalid type");
        return;
      }
      let description = prompt("Enter description for new pokemon;");
      this.selectedType.addPokemon(new Pokemon(name, type, description));
    }
  
    // Created deletePokemon method
    deletePokemon() {
      let index = prompt(
        "Enter the index of the pokemon that you wish to delete: "
      );
      if (index > -1 && index < this.selectedType.pokemons.length) {
        this.selectedType.pokemons.splice(index, 1);
      }
    }
  }
  
  // Created instance of Menu
  let menu = new Menu();
  menu.start(); // Created start method