/* decodeString(s): Given an encoded string, return its corresponding decoded string.
 *
 * The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets 
 * is repeated exactly k times. Note: k is guaranteed to be a positive integer.
 *
 * For s = "4[ab]", the output should be decodeString(s) = "abababab"
 * For s = "2[b3[a]]", the output should be decodeString(s) = "baaabaaa"
 */

/* SOLUTION: Input strings all follow the following structure:
 *      s = 'CN[CN[...[C]]]CN[CN[...[C]]]C'
 *      where C is a string (of any length) of non-numerical characters, excluding '[' and ']'
 *      and N is a string (of any length) of only integers
 *
 * Now let B represent everything contained within the outermost braces.  Then the notation 
 * above can be rewritten as:
 *      s = CN[B]CN[B]C
 *
 * Then the procedure to decode s is the following:
 *    1. Add C to the end of the output string
 *    2. Decode B
 *    2. Add the decoded version of B to the output string N times
 *    4. Repeat until the end of s is reached
 *
 * Any given B can be defined as a substring between the indices of its open and close braces
 */
function decodeString (s) {
  let braceStack = [];
  let braceMap = {};

  s.split('').forEach((ch, i) => {
    if (ch === '[') {
      braceStack.push(i);
    } else if (ch === ']') {
      braceMap[braceStack.pop()] = i;
    }
  });

  return decodeStringHelper(s, 0, s.length, braceMap, 1);
}

function decodeStringHelper (s, start, end, map, repeats) {
  let output = '';
  let num = '';

  for (let i = start; i < end; i++) {
    if (!isNaN(s[i])) {
      num += s[i];
    } else if (s[i] === '[') {
      output += decodeStringHelper(s, i + 1, map[i], map, +num);
      num = '';
      i = map[i];
    } else {
      output += s[i];
    }
  }

  return output.repeat(repeats);
}
