const Order = require('../schema/orders');

const Customer = require('../schema/customers'); // Import the Customer model
const Product = require('../schema/product'); // Import the Product model

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: 'customer',
        model: Customer,
        select: 'firstName lastName email profileImage',
      })
      .populate({
        path: 'products.product', 
        model: Product,
        select: 'name price quantity', 
      });

    res.json({ success: true, orders });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ success: false, error: 'Error fetching orders' });
  }
};
//getAllPosts
const postOrders = async (req, res) => {
    try {
      
      const orderData = req.body;
  
      
      const newOrder = await Order.create(orderData);
  
      
      res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
      
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


module.exports = {
    postOrders,
    getOrders
}