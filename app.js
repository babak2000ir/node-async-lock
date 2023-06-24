import AsyncLock from 'async-lock';
const lock = new AsyncLock();

let sharedData = 0;

function operation1() {
    return new Promise((resolve, reject) => {
        lock.acquire('lock1', function () {
            console.log('op1:lock');

            setTimeout(() => {
                sharedData = sharedData + 1;
            }, 1000);
        }, function (err, ret) {
            console.log('operation1-done');
            resolve();
        });
    });
}

function operation2() {
    return new Promise((resolve, reject) => {
        lock.acquire('lock1', function () { //lock1/lock2 to compare
            console.log('op2:lock');

            setTimeout(() => {
                sharedData = sharedData + 1;
            }, 2000);
        }, function (err, ret) {
            console.log('operation2-done');
            resolve();
        });
    });
}

// Usage example
async function main() {
    const start = Date.now();
    console.log('Shared data before:' + sharedData);

    await Promise.all([
        operation1(),
        operation2(),
    ]);

    setInterval(() => {
        console.log('sharedData: ' + sharedData);
    }, 1);

    console.log('Shared data after: ' + sharedData);
    console.log('Time elapsed:' + (Date.now() - start));
}

main();





