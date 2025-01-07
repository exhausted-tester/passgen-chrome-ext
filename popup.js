// Function to generate the password
function generatePassword(length, options) {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  let characters = "";
  if (options.uppercase) characters += upper;
  if (options.lowercase) characters += lower;
  if (options.numbers) characters += numbers;
  if (options.symbols) characters += symbols;

  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return password;
}

function checkCheckboxes() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const isAnyChecked = Array.from(checkboxes).some(
    (checkbox) => checkbox.checked
  );
  const generateButton = document.getElementById("generate");
  const copyButton = document.getElementById("copy");
  const infoMessage = document.getElementById("info-message");

  // Enable or disable buttons based on checkbox state
  if (isAnyChecked) {
    generateButton.disabled = false;
    copyButton.disabled = false;
    infoMessage.style.display = "none"; // Hide the info message
  } else {
    generateButton.disabled = true;
    copyButton.disabled = true;
    infoMessage.style.display = "block"; // Show the info message
  }
}

// Function to update the displayed password
function updatePassword() {
  const length = parseInt(document.getElementById("length").value, 10);
  const options = {
    uppercase: document.getElementById("uppercase").checked,
    lowercase: document.getElementById("lowercase").checked,
    numbers: document.getElementById("numbers").checked,
    symbols: document.getElementById("symbols").checked,
  };
  const password = generatePassword(length, options);
  document.getElementById("password").value = password;
}

// Sync slider and input field for password length
function syncPasswordLength(event) {
  let length = parseInt(event.target.value, 10);

  // Validate the input value
  if (length < 1) {
    length = 1;
  } else if (length > 50) {
    length = 50;
  }

  // Update slider and input field with valid value
  document.getElementById("length").value = length;
  document.getElementById("password-length-input").value = length;
  document.getElementById("length-value").textContent = length;
  updatePassword(); // Update the password
}

// Event listener for the slider
document.getElementById("length").addEventListener("input", syncPasswordLength);

// Event listener for the number input
document
  .getElementById("password-length-input")
  .addEventListener("input", syncPasswordLength);

document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", checkCheckboxes);
});

// Event listeners to all checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", checkCheckboxes);
});

// Add blur event to handle validation on keyboard input
document
  .getElementById("password-length-input")
  .addEventListener("blur", function (event) {
    let length = parseInt(event.target.value, 10);

    // Validate the input value
    if (length < 1) {
      length = 1;
    } else if (length > 50) {
      length = 50;
    }

    // Update the input and slider with the valid value
    document.getElementById("length").value = length;
    document.getElementById("password-length-input").value = length;
    document.getElementById("length-value").textContent = length;
    updatePassword(); // Update the password
  });

// Event listener for the "Generate" button
document.getElementById("generate").addEventListener("click", updatePassword);

document.getElementById("copy").addEventListener("click", function () {
  const copyButton = this;
  const originalText = copyButton.textContent;

  // Copy the password to clipboard
  const password = document.getElementById("password").value;
  navigator.clipboard
    .writeText(password)
    .then(() => {
      // Change the button text to "Copied!"
      copyButton.textContent = "Copied!";
      copyButton.disabled = true; // Optionally disable the button temporarily

      // Revert to the original text after 3 seconds
      setTimeout(() => {
        copyButton.textContent = originalText;
        copyButton.disabled = false; // Re-enable the button
      }, 500);
    })
    .catch((err) => {
      console.error("Failed to copy password: ", err);
    });
});

// Automatically generate a password when the page loads
window.onload = function () {
  document.getElementById("length").value = 12;
  document.getElementById("password-length-input").value = 12;
  document.getElementById("length-value").textContent = 12;
  document.getElementById("uppercase").checked = true;
  document.getElementById("lowercase").checked = true;
  document.getElementById("numbers").checked = true;
  document.getElementById("symbols").checked = true;
  updatePassword();
  checkCheckboxes();
};
