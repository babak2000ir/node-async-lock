const AsyncLock = require('async-lock');

// Create a lock instance
const lock = new AsyncLock();

// Shared data
let sharedData = 0;

// Function that performs an asynchronous operation with a lock
async function operationWithLock() {
  // Acquire the lock
  const release = await lock.acquire();

  try {
    // Perform operations on the shared data within the lock
    sharedData++;
    await someAsyncOperation();
    sharedData += 2;
  } finally {
    // Release the lock
    release();
  }
}

// Helper function simulating an asynchronous operation
function someAsyncOperation() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

// Usage example
async function main() {
  console.log('Shared data before:', sharedData);

  await Promise.all([
    operationWithLock(),
    operationWithLock(),
  ]);

  console.log('Shared data after:', sharedData);
}

// Call the main function
main();





