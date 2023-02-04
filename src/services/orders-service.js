import axios from "axios";

const getOrders = () => {
    return require("../orders.json");
}

const getOrdersToShow = (allOrders, currPage) => {
    const itemsInPage = 10;
    const start = (currPage - 1) * itemsInPage;
    const end = start + 10;
    return allOrders.slice(start, end);
}

const sortByBigToSmall = (a, b, key) => {
    if (typeof a[key] === 'number') return a[key] - b[key]
    else return (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0)
}

const sortBySmallToBig = (a, b, key) => {
    if (typeof a[key] === 'number') return b[key] - a[key]
    else return (b[key] > a[key]) ? 1 : ((a[key] > b[key]) ? -1 : 0)
}

const checkAccess = async () => {
    try {
        await axios.get('https://www.become.co/api/rest/test.php');
        return true;
    } catch (err) {
        console.log('Error: [checkAccess:orders-service.js]', err);
        return false;
    }
}

const getFilteredOrders = (orders, val) => {
    return orders.filter((order) => {
        if (JSON.stringify(order.order_ID).includes(val) || order.name.includes(val)) return order;
    });
}

const removeOrder = (orders, orderToRemove) => {
    return orders.filter((order) => order.order_ID !== orderToRemove.order_ID);
}

const ordersService = {
    getOrders,
    getOrdersToShow,
    sortByBigToSmall,
    sortBySmallToBig,
    checkAccess,
    getFilteredOrders,
    removeOrder
}

export default ordersService;