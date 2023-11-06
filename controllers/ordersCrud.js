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

const getOrdersByCustomer = async (req, res) => {
  const customerId = req.params.id; // Assuming you pass the customer ID as a parameter

  try {
    const orders = await Order.find({ customer: customerId })
      .populate({
        path: 'customer',
        model: Customer,
        select: 'firstName lastName email profileImage',
      })
      .populate({
        path: 'products.product',
        model: Product,
        select: 'name price quantity image',
      });

    res.json({ success: true, orders });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ success: false, error: 'Error fetching orders' });
  }
};

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

const DeleteAllOrders = async (req, res) => {
  try {
    await Order.deleteMany({}); //
    res.status(204).json({ message: 'All orders deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting orders', error: error });
  }
};

const DeleteOrderById = async (req, res) => {
  const orderId = req.params.id; 
  try {
    const order = await Order.findByIdAndRemove(orderId);

    if (order) {
      res.json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error: error });
  }
};

const UpdateOrderById = async (req, res) => {
  const orderId = req.params.id; 


  const updatedData = {
    status: true,
  };

  try {
    
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedData, { new: true });

    if (!updatedOrder) {
 
      return res.status(404).json({ message: `Order with ID ${orderId} not found.` });
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {

    console.error('Error updating order:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
    postOrders,
    getOrders,
    getOrdersByCustomer,
    DeleteAllOrders,
    DeleteOrderById,
    UpdateOrderById
}