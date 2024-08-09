const BASE_URL = "https://pokeapi.co/api/v2/";

const fetchPokemon = async (pokemon) => {
  try {
    const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
    //console.log(response);
    const parsedData = await response.json();
    console.log(parsedData);
    return parsedData;
  } catch (err) {
    console.error(err);
  }
};

// Function to create a card for each pokemon.
function createPokemonCard(pokemon) {
  // Get the container of the card
  const container = document.getElementById("card-container");
  container.innerHTML = ""; // Clear previous content

  // Create the card element
  const card = document.createElement("div");
  card.classList.add("pokemon-card");

  // Create image element
  const imageElement = document.createElement("img");
  imageElement.src = pokemon.sprites.front_default;
  imageElement.alt = `${pokemon.name} Image`;
  imageElement.classList.add("pokemon-image");

  // Add the image to the card
  card.appendChild(imageElement);

  // Create pokemon id element
  const pokemonId = document.createElement("h1");
  pokemonId.textContent = `#${pokemon.id}`;
  pokemonId.classList.add("card-pokemon-id");

  // Create pokemon name element
  const pokemonName = document.createElement("h2");
  pokemonName.textContent = pokemon.name;
  pokemonName.classList.add("card-pokemon-name");

  // Create pokemon weight element
  const pokemonWeight = document.createElement("p");
  //Acording to the pokeapi, the weight of the pokemons are in hectograms.
  pokemonWeight.textContent = `Weight: ${pokemon.weight} hectograms`;
  pokemonWeight.classList.add("card-pokemon-weight");

  // Append elements to the card
  card.append(pokemonId, pokemonName, pokemonWeight);

  // Append the card to the container
  container.appendChild(card);
}

// Get Button
document.getElementById("get-btn").addEventListener("click", async () => {
  const text = document.getElementById("poke-name").value.toLowerCase();
  const pokemon = await fetchPokemon(text);
  if (pokemon) {
    localStorage.setItem("currentPokemonId", pokemon.id.toString());
    createPokemonCard(pokemon);
  }
});

/* ==== Buttons ==== 
- For the buttons first we get the current id from localStorage, we parses it as an integer and assigns it to currentPokemonId.
- Then we create a variable "newId" in which we calculate the previous id by subtracting 1 from the current pokemon id.
    -- We do the same for the next button but instead of subtracting 1 we add 1.
-The Math.max() makes sure that the new ID is never less than 1.
- Then we fetch the pokemon with the new id and we updates the "currentPokeId" in localStorage with the new id.
*/

// Prev Button
document.getElementById("previous-btn").addEventListener("click", async () => {
  let currentPokemonId =
    parseInt(localStorage.getItem("currentPokemonId"));
  const newId = Math.max(currentPokemonId - 1, 1);
  const pokemon = await fetchPokemon(newId);
  localStorage.setItem("currentPokemonId", newId);
  createPokemonCard(pokemon);
});

// Next Button
document.getElementById("next-btn").addEventListener("click", async () => {
  let currentPokemonId =
    parseInt(localStorage.getItem("currentPokemonId")) || 1;
  const newId = currentPokemonId + 1;
  const pokemon = await fetchPokemon(newId);

  localStorage.setItem("currentPokemonId", newId);
  console.log("Set new Pokemon ID:", newId);
  createPokemonCard(pokemon);
});

/* 
===== Asynchronous function to load the initial pokemon ======
 - First we get the current id from localStorage.
   --The getItem() method returns value of the specified Storage Object item.
 - Then we check if there's a saved id in local storage. If yes, we fetch the pokemon and create the card.
 - If there's no saved pokemon, it loads the first one.
 */
async function loadInitialPokemon() {
  const savedPokemonId = localStorage.getItem("currentPokemonId");
  console.log(savedPokemonId);

  if (savedPokemonId) {
    const pokemon = await fetchPokemon(savedPokemonId);
    if (pokemon) {
      createPokemonCard(pokemon);
    }
  } else {
    const pokemon = await fetchPokemon(1);
    if (pokemon) {
      localStorage.setItem("currentPokemonId", "1");
      createPokemonCard(pokemon);
    }
  }
}

// Event listener -- DOMContentLoaded is an event that allows us to know when all the DOM elements(the HTML elements of a project) are loaded.
document.addEventListener("DOMContentLoaded", loadInitialPokemon);

/*
NOTES:
getItem() method : localStorage.getItem(keyname)
The keyname is a string specifying the name of the key we want to get the value of.
*/