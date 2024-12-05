import { Request, Response, RequestHandler } from "express";
import { orders, Order } from "../models/orders";

interface UpdateOrderParams {
    id: string;
  }

interface UpdateOrderBody {
    customerName: string;
    product: string;
    quantity: number;
    price: number;
  }

interface DeleteOrderParams {
    id: string;
  }
// Permet d'ajouter une commande
export const addOrder = (req: Request, res: Response) => {
  const { customerName, product, quantity, price } = req.body;
  const newOrder: Order = {
    id: Math.random().toString(36).substr(2, 9),
    customerName,
    product,
    quantity,
    price,
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
};

// Permets de lire toutes les commandes
export const getOrders = (req: Request, res: Response) => {
  res.status(200).json(orders);
};

export const getOrderById = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const order = orders.find((order) => order.id === id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return; 
    }
    res.status(200).json(order);
  };

// Permet de mettre à jour une commande
export const updateOrder = (
    req: Request<UpdateOrderParams, {}, UpdateOrderBody>,
    res: Response
  ) => {
    const { id } = req.params; // `id` est bien typé comme string
    const { customerName, product, quantity, price } = req.body; 
    const orderIndex = orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      res.status(404).json({ message: "Order not found" });
      return; // Arrêter l'exécution si l'ordre n'existe pas
    }
  
    // Permets de mettre à jour la commande
    orders[orderIndex] = { ...orders[orderIndex], customerName, product, quantity, price };
    res.status(200).json(orders[orderIndex]);
  };

// Permets de supprimer une commande
export const deleteOrder = (req: Request<DeleteOrderParams>, res: Response) => {
    const { id } = req.params; // `id` est bien typé comme string
    const orderIndex = orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      res.status(404).json({ message: "Order not found" });
      return; // Arrêter l'exécution si l'ordre n'existe pas
    }
  
    // Supprimer la commande
    orders.splice(orderIndex, 1);
    res.status(204).send(); // Répondre avec un statut 204 (pas de contenu)
  };