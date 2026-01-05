function createSecretHolder() {
  // This variable is private
  const secretWord = "unicorn";

  // Only expose safe methods
  return {
    checkSecret(word) {
      return word === secretWord;
    }
  };
}

// Usage
const secret = createSecretHolder();

console.log(secret.checkSecret("unicorn")); // true
console.log(secret.checkSecret("dragon"));  // false

// These are impossible:
console.log(secret.secretWord); // undefined
secret.secretWord = "hacked";   // does nothing
