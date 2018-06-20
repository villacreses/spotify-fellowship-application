/* changePossibilities(amount,amount): Your quirky boss collects rare, old coins. They found out
 * you're a programmer and asked you to solve something they've been wondering for a long time.
 *
 * Write a function that, given an amount of money and an array of coin denominations, computes
 * the number of ways to make the amount of money with coins of the available denominations.
 *
 * Example: for amount=4 (4) and denominations=[1,2,3] (1, 2 and 3), your program would output
 * 4 — the number of ways to make  with those denominations:
 *
 * 1, 1, 1, 1
 * 1, 1, 2
 * 1, 3
 * 2, 2
 */

/* SOLUTION: Using the example above: 
 */
function changePossibilities(amount, denoms, memo = {}) {
  if (memo[amount] && memo[amount][denoms.length] !== undefined) return memo[amount][denoms.length];
  if (amount === 0) return 1;
  else if (amount < 0 || denoms.length === 0) return 0;
  else {
    let lastIndex = denoms.length - 1;
    let withLastDenom = changePossibilities(amount - denoms[lastIndex], denoms, memo);
    let withoutLastDenom = changePossibilities(amount, denoms.slice(0, denoms.length - 1), memo);

    if(!memo[amount]) memo[amount] = {};
    memo[amount][denoms.length] = withLastDenom + withoutLastDenom;
    console.log(memo);
    return memo[amount][denoms.length]
  }
}

console.log(changePossibilities(10, [1,2,3,5]));
