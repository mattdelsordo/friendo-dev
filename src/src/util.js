/**
 * Saves friendo stats to local storage
 */
const STORAGE_TOKEN = "friendo";
const saveGame = function() {
    // console.log(`Saving ${friendoToJSONString()}`);
    localStorage.setItem(STORAGE_TOKEN, friendoToJSONString());
};

// const loadGame = function() {
//     const json = localStorage.getItem(STORAGE_TOKEN);
//     friendoFromJSONString(json);
//     console.log(`Loaded ${json}`);
// };