const display = document.getElementById("display");
const cashInput = document.getElementById("cash");
const lockBtn = document.getElementById("lock");
const moneyInDrawer = document.getElementById("money-in-drawer");
const numberButtons = document.querySelectorAll(".key");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueEl = document.getElementById("change-due");

let moneyInDrawerVisible = false;

const generateRandomPrice = () => {
    return (Math.random() * Math.floor(Math.random() * 100)).toFixed(2);
}

let price = generateRandomPrice();
let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

const billValues = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
};

let change = 0;
let changeDueMsg = "";

const getChange = () => {
    let cash = parseFloat(cashInput.value);
    if (price > cash) {
        window.alert("Customer does not have enough money to purchase the item");
    }
    else if (price === cash) {
        changeDueEl.textContent = "No change due - customer paid with exact cash";
    }
    else {
        change = cash - price;

        for (let i = cid.length - 1; i >= 0; i--) {
            getMoneyInBill(i);
        }

        let cashInDrawer = 0;
        cid.forEach(bill => {
            cashInDrawer += bill[1];
        })

        if (change !== 0) {
            changeDueMsg = "Status: INSUFFICIENT_FUNDS";
        }
        else if (cashInDrawer === 0) {
            changeDueMsg = "Status: CLOSED" + changeDueMsg;
        }
        else {
            changeDueMsg = "Status: OPEN" + changeDueMsg;
        }

        changeDueEl.textContent = changeDueMsg;
        changeDueMsg = "";
    }
};

const getMoneyInBill = function (i) {
    if (billValues[cid[i][0]] <= change && cid[i][1] > 0) {
        let changeInCurrentBill = Math.floor(change / billValues[cid[i][0]]) * billValues[cid[i][0]];

        if (changeInCurrentBill > cid[i][1]) {
            changeInCurrentBill = cid[i][1];
        }

        if (cid[i][1] <= change) {
            change -= cid[i][1];
            cid[i][1] = 0;
        }
        else {
            cid[i][1] -= changeInCurrentBill;
            change -= changeInCurrentBill;
        }

        change = Math.round(change * 100) / 100;
        changeDueMsg += ` ${cid[i][0]}: $${changeInCurrentBill}`;
    }
};

display.textContent = `Price: $${price}`;

lockBtn.addEventListener("click", () => {
    moneyInDrawerVisible = !moneyInDrawerVisible;
    moneyInDrawer.style.display = moneyInDrawerVisible ? "flex" : "none";

    moneyInDrawer.innerHTML = `
    <span id="change-in-drawer">Change in drawer</span>
    <span>Pennies<span class="money">$${cid[0][1]}</span></span>
    <span>Nickels<span class="money">$${cid[1][1]}</span></span>
    <span>Dimes<span class="money">$${cid[2][1]}</span></span>
    <span>Quarters<span class="money">$${cid[3][1]}</span></span>
    <span>Ones<span class="money">$${cid[4][1]}</span></span>
    <span>Fives<span class="money">$${cid[5][1]}</span></span>
    <span>Tens<span class="money">$${cid[6][1]}</span></span>
    <span>Twenties<span class="money">$${cid[7][1]}</span></span>
    <span>Hundreds<span class="money">$${cid[8][1]}</span></span>
    `;
});

[...numberButtons].forEach(button => {
    button.addEventListener("click", event => {
        cashInput.value += event.target.value;
    });
});

purchaseBtn.addEventListener("click", getChange);