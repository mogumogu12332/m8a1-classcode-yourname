// Module 8, Activity 1 - Make the page talk
//
// Your job: announce today's special from JavaScript.
//
// 1. Store the dish name and its price in variables (const or let, never var).
// 2. Build one sentence out of them using a template literal: backticks and ${ }.
// 3. Find the element with id="special" and set its textContent to that sentence.
// 4. console.log something so you can see in DevTools that your script ran.
//
// Concepts to look up if you are stuck: const, template literals,
// document.querySelector, textContent, console.log.

const dish = "Grilled Chicken";
const price = 12.99;

const sentence = `Today's special is ${dish} for $${price}.`;

document.querySelector("#special").textContent = sentence;

console.log("JavaScript ran successfully!");
