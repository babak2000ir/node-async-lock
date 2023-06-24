import AsyncLock from 'async-lock';
const lock = new AsyncLock();

const sharedData = {
    varA: 0,
    varB: 0,
    varC: 0,

    getData(key) {
        return this[key];
    },

    setData(key, value) {
        const sdThis = this;
        lock.acquire(key, function () {
            // Concurrency safe
            sdThis[key] = value;
        }, function (err, ret) {
        });
    }
}

// Helper function simulating an asynchronous operation
function someAsyncOperation() {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
}

function operation1() {
    let varA = sharedData.getData('varA');
    console.log('op1: recieved varA:', varA);
    sharedData.setData('varA', varA + 1);
    varA = sharedData.getData('varA');
    console.log('op1: set varA:', varA + 1);
}

function operation2() {
    let varA = sharedData.getData('varA');
    console.log('op2: recieved varA:', varA);
    sharedData.setData('varA', varA + 1);
    varA = sharedData.getData('varA');
    console.log('op2: set varA:', varA + 1);
}

// Usage example
async function main() {
    console.log('Shared data before:' + JSON.stringify(sharedData, null, 2));

    /* await Promise.all([
        operation1(),
        operation2(),
    ]); */

    await operation1();
    await operation2();

    console.log('Shared data after:' + JSON.stringify(sharedData, null, 2));
}

main();





