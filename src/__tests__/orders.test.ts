import request from 'supertest';
import app from '../index'; 
import { orders } from '../models/orders'; 

describe('Order Routes', () => {
  beforeEach(() => {
    // Permets de réinitialiser les données pour chaque test
    orders.length = 0;
  });

  it('should create a new order', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send({
        customerName: 'Client de test',
        product: 'Donut au sucre',
        quantity: 1,
        price: 2,
      })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.customerName).toBe('Client de test');
  });

  it('should retrieve all orders', async () => {
    // Permets d'ajouter une commande avant de commencer à tester
    orders.push({
      id: '123',
      customerName: 'Client de test',
      product: 'Donut glacé',
      quantity: 2,
      price: 4,
    });

    const response = await request(app).get('/api/orders');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].customerName).toBe('Client de test');
  });

  it('should retrieve an order by ID', async () => {
    orders.push({
      id: '456',
      customerName: 'Client test Alice',
      product: 'Donut au chocolat',
      quantity: 1,
      price: 3,
    });

    const response = await request(app).get('/api/orders/456');

    expect(response.status).toBe(200);
    expect(response.body.customerName).toBe('Client test Alice');
  });

  it('should update an order by ID', async () => {
    orders.push({
      id: '789',
      customerName: 'Bob',
      product: 'Camera',
      quantity: 3,
      price: 1500,
    });

    const response = await request(app)
      .put('/api/orders/789')
      .send({
        customerName: 'Robert',
        product: 'Donuts au samsung galaxy',
        quantity: 1,
        price: 1800,
      })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.customerName).toBe('Robert');
    expect(response.body.product).toBe('Donuts au samsung galaxy');
  });

  it('should delete an order by ID', async () => {
    orders.push({
      id: '321',
      customerName: 'Charlie',
      product: 'Donuts sucré au sucre',
      quantity: 1,
      price: 4,
    });

    const response = await request(app).delete('/api/orders/321');

    expect(response.status).toBe(204);
    expect(orders.length).toBe(0);
  });

  it('should return 404 for non-existing order ID', async () => {
    const response = await request(app).get('/api/orders/999');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Order not found');
  });
});