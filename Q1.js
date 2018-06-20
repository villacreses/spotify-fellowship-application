/* sortByStrings(s,t): Sort the letters in the string s by the order they occur in the string t. 
 * You can assume t will not have repetitive characters. For s = "weather" and t = "therapyw", 
 * the output should be sortByString(s, t) = "theeraw". For s = "good" and t = "odg", the output 
 * should be sortByString(s, t) = "oodg".
 */

/* SOLUTION: Because t has no duplicate characters, there is a bijection between the characters 
 * and the indices in t.  The string s can then be sorted w.r.t. these indices.
 */
function sortByStrings(s, t) {
  // Using an object as a map  allows an O(1) alternative to the "indexOf" method
  let orderMap = {};
  t.split('').forEach((ch, i) => {
    // the "+1" is to ensure the only possible falsy value on the map is 'undefined'
    orderMap[ch] = i + 1; 
  });

  // Sort by ascending value w.r.t. the order map
  // If a character doesn't have a corresponding index in the map, place it at the end
  const sortRule = (a, b) => {
    return orderMap[a] ? orderMap[a] - orderMap[b] : 1;
  };

  return s
    .split('')
    .sort(sortRule)
    .join('');
}
