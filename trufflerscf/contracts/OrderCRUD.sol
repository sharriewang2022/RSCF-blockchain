// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract OrderCRUD {
    enum State { Purchased, Produced, Distributed, Sold }

    struct Order {
        uint256 orderId;
        address buyer;
        string productName;
        uint256 quantity;
        uint256 price;
        State state;
    }

    mapping (uint256 => Order) public orders;

    event OrderPurchased(uint256 orderId, address buyer, string productName, uint256 quantity, uint256 price);
    event OrderProduced(uint256 orderId);
    event OrderDistributed(uint256 orderId);
    event OrderSold(uint256 orderId);

    function purchaseOrder(uint256 orderId, string memory productName, uint256 quantity, uint256 price) public {
        Order memory order = Order({
            orderId: orderId,
            buyer: msg.sender,
            productName: productName,
            quantity: quantity,
            price: price,
            state: State.Purchased
        });

        orders[orderId] = order;

        emit OrderPurchased(orderId, msg.sender, productName, quantity, price);
    }

    function produceOrder(uint256 orderId) public {
        Order storage order = orders[orderId];

        require(order.buyer == msg.sender, "Only buyer can produce order");
        require(order.state == State.Purchased, "Order must be in Purchased state");

        order.state = State.Produced;

        emit OrderProduced(orderId);
    }

    function distributeOrder(uint256 orderId) public {
        Order storage order = orders[orderId];

        require(order.buyer == msg.sender, "Only buyer can distribute order");
        require(order.state == State.Produced, "Order must be in Produced state");

        order.state = State.Distributed;

        emit OrderDistributed(orderId);
    }

    function sellOrder(uint256 orderId) public {
        Order storage order = orders[orderId];

        require(order.buyer == msg.sender, "Only buyer can sell order");
        require(order.state == State.Distributed, "Order must be in Distributed state");

        order.state = State.Sold;

        emit OrderSold(orderId);
    }
}