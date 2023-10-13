export const menusListData = [
    {
        "id": 1,
        "title": "Home",
        "key": "/home",
        "pagepermisson": 1,
        "grade": 1,
        "children": []
    },
    {
        "id": 2,
        "title": "User Management",
        "key": "/user-manage",
        "pagepermisson": 1,
        "grade": 1,
        "children": [
            {
                "id": 3,
                "title": "add user",
                "rightId": 2,
                "key": "/user-manage/add",
                "grade": 2
            }
        ]
    },
    {
        "id": 7,
        "title": "Trace Management",
        "key": "/trace-manage",
        "pagepermisson": 1,
        "grade": 1,
        "children": [
            {
                "id": 8,
                "title": "traceProduct",
                "rightId": 7,
                "key": "/trace-manage/trace",
                "pagepermisson": 1,
                "grade": 2
            }
        ]
    },
    {
        "id": 14,
        "title": "Product Management",
        "key": "/product-manage",
        "pagepermisson": 1,
        "grade": 1,
        "children": [
            {
                "id": 15,
                "title": "Product List",
                "rightId": 14,
                "key": "/product-manage/list",
                "grade": 2
            }
        ]
    },
    {
        "id": 21,
        "title": "Order Management",
        "key": "/order-manage",
        "pagepermisson": 1,
        "grade": 1,
        "children": [
            {
                "id": 22,
                "title": "Add order",
                "rightId": 21,
                "key": "/order-manage/addOrder",
                "pagepermisson": 1,
                "grade": 2
            }
        ]
    },
    {
        "id": 24,
        "title": "Category Management",
        "key": "/category-manage",
        "pagepermisson": 1,
        "grade": 1,
        "children": [
            {
                "id": 25,
                "title": "Add Category",
                "rightId": 24,
                "key": "/category-manage/addCategory",
                "pagepermisson": 1,
                "grade": 2
            }
        ]
    }
]