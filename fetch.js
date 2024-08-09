const BASE_URL = "https://pokeapi.co/api/v2/";

// Fetch no async
/*
fetch(BASE_URL + 'pokemon/ditto')
    .then(res => res.json())
    .then(data => console.log(data));
*/
// fetch async

const fetchPokemon = async (pokemon) => {
  try {
    const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
    const parsedResponse = await response.json();
    return parsedResponse;
  } catch (err) {
    console.error(err);
  }
};

// get button
document.getElementById("get-btn").addEventListener("click", async () => {
  const text = document.getElementById("poke-name").value.toLowerCase();
  const pokemon = await fetchPokemon(text);
  localStorage.setItem("currentPokeId", pokemon.id);
  console.log(pokemon.name);
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
  let currentPokemonId = parseInt(localStorage.getItem("currentPokemonId"));
  const newId = Math.max(1, currentPokemonId - 1);
  const pokemon = await fetchPokemon(newId);
  localStorage.setItem("currentPokemonId", newId);
  console.log(pokemon.id, "Prev Button");
});

// Next Button
document.getElementById("next-btn").addEventListener("click", async () => {
  let currentPokemonId = parseInt(localStorage.getItem("currentPokemonId"));
  const newId = currentPokemonId + 1;
  const pokemon = await fetchPokemon(newId);
  localStorage.setItem("currentPokemonId", newId);
  console.log(pokemon.id, "Next Button");
});
