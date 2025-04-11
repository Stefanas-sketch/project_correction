'use strict';

const mockData = require('./mockData.js').data;
const prompt = require('prompt-sync')();

// Code under has been changed
const mockData = [
    {
      firstName: "Tally",
      lastName: "Lillyman",
      age: 22,
      gender: "F",
      genderInterest: "X",
      location: "city",
      minimumAgeInterest: 30,
      maximumAgeInterest: 66
    },
    {
      firstName: "Ryun",
      lastName: "Cobb",
      age: 22,
      gender: "F",
      genderInterest: "M",
      location: "city",
      minimumAgeInterest: 32,
      maximumAgeInterest: 82
    },
    {
      firstName: "Sheffie",
      lastName: "Elecum",
      age: 45,
      gender: "M",
      genderInterest: "M",
      location: "rural",
      minimumAgeInterest: 29,
      maximumAgeInterest: 61
    }
    // More users will be add
  ];
  
  
  
  function getValidInput(promptText, validate) {
    let input;
    do {
      input = prompt(promptText);
    } while (!validate(input));
    return input;
  }
  
  function isGenderValid(gender) {
    return ['M', 'V', 'X'].includes(gender.toUpperCase());
  }
  
  function isLocationValid(loc) {
    return ['stad', 'platteland'].includes(loc.toLowerCase());
  }
  
  function isAgeValid(age) {
    const num = Number(age);
    return !isNaN(num) && num >= 18;
  }
  
  function startDatingApp(data) {
    // Userinvoer ophalen en valideren
    const firstName = getValidInput("Firstname:", input => input.trim() !== "");
    const lastName = getValidInput("Lastname:", input => input.trim() !== "");
    const age = Number(getValidInput("Age (18+):", isAgeValid));
    const gender = getValidInput("Gender (M/V/X):", isGenderValid).toUpperCase();
    const genderInterest = getValidInput("Interested in (M/V/X):", isGenderValid).toUpperCase();
    const location = getValidInput("Location (stad/platteland):", isLocationValid).toLowerCase();
    const minAgeInterest = Number(getValidInput("Minimum Age Interest (18+):", isAgeValid));
    const maxAgeInterest = Number(getValidInput(
      `Maximum Age Interest (> ${minAgeInterest}):`,
      input => isAgeValid(input) && Number(input) > minAgeInterest
    ));
  
    const user = {
      firstName,
      lastName,
      age,
      gender,
      genderInterest,
      location,
      minimumAgeInterest: minAgeInterest,
      maximumAgeInterest: maxAgeInterest
    };
  
    // Zoek matches
    const matches = data.filter(person => {
      return (
        person.gender === user.genderInterest &&
        person.genderInterest === user.gender &&
        person.location === user.location &&
        person.age >= user.minimumAgeInterest &&
        person.age <= user.maximumAgeInterest &&
        user.age >= person.minimumAgeInterest &&
        user.age <= person.maximumAgeInterest
      );
    });
  
    // Toon resultaten
    if (matches.length === 0) {
      console.log("Geen matches gevonden.");
    } else {
      console.log(`Je hebt ${matches.length} match(es):`);
      matches.forEach(match => {
        console.log(
          `${match.firstName} ${match.lastName}, ${match.age} jaar, Locatie: ${match.location}`
        );
      });
    }
  }
  
  // Start app met mock data
  startDatingApp(mockData);
  
  
  
  
  