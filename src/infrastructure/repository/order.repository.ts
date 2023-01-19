import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderItemModel.destroy({
      where: {
        order_id: entity.id,
      }
    });

    entity.items.forEach(async (item) => {
      await OrderItemModel.create(
        {
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
            order_id: entity.id,
        }
      );
    });
    
    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne(
        {
          where: {
            id,
          },
          rejectOnEmpty: true,
          include: [{ model: OrderItemModel }],
        }
      );
    } catch (error) {
      throw new Error("Order not found");
    }

    const orderItem = orderModel.items.map((item) => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      )
    });

    return new Order(orderModel.id, orderModel.customer_id, orderItem);
  }

  async findAll(): Promise<Order[]> {
    let orderModel;
    try {
      orderModel = await OrderModel.findAll(
        {
          include: [{ model: OrderItemModel }],
        }
      );
    } catch (error) {
      throw new Error("Orders not found");
    }

    const orders: Order[] = orderModel.map((orderModel: OrderModel) => {
      const ordersItems = orderModel.items.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )
      });

      return new Order(orderModel.id, orderModel.customer_id, ordersItems);
    });

    return orders;
  }
}